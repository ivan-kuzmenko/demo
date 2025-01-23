<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\App;
use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Wkhooy\ObsceneCensorRus;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    private $date;
    private $app;

    public function __construct(Request $request)
    {
//        dd($request->ip());
        $dateInput = $request->get('date');
        $this->date = new \stdClass();

        if (!is_null($dateInput)) {
            try {
                $this->date->start = Carbon::createFromFormat('dmy', $dateInput)->startOfDay();
                $this->date->end = Carbon::createFromFormat('dmy', $dateInput)->endOfDay();
            } catch (\Exception $e) {
                $this->date = null;
//                return response()->json([
//                    'ok' => false,
//                    'error' => 'Неверный формат даты. Ожидается формат dmy (например, 221124).'
//                ], 400);
            }
        } else {
//            $this->date->start = \Carbon\Carbon::minValue();
//            $this->date->end = \Carbon\Carbon::now()->endOfDay();
            $this->date->start = \Carbon\Carbon::now()->startOfDay();
            $this->date->end = \Carbon\Carbon::now()->endOfDay();
        }
    }

    public function index(Request $request): JsonResponse
    {
        $rules = [
            'app' => [
                'required',
                'string'
            ],
            'limit' => [
                'numeric',
            ],
            'date' => [
                'numeric',
                'digits:6'
            ],
        ];

        $messages = [
            'app.required' => 'app должен быть указан.',
            'app.string' => 'app должен быть строкой.',
            'limit.numeric' => 'limit должен быть числом.',
            'date.numeric' => 'date должен быть числом.',
            'date.digits' => 'date должен содержать 6 чисел.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->errors()->first()
            ], 400);
        }

        $limit = filter_var($request->get('limit') ?? null, FILTER_VALIDATE_INT) ?: 10;

        if ($this->date === null) {
            return response()->json([
                'ok' => false,
                'error' => 'Неверный формат даты.'// Ожидается формат dmy (например, 021124).'
            ], 400);
        }

        try {
            $this->app = App::where('name', $request->get('app'))->firstOrFail();
        } catch (\Exception $e) {
            return response()->json([
                'ok' => false,
                'error' => 'Неверное имя приложения.'
            ], 400);
        }

        try {
            $users = Customer:://whereBetween('updated_at', [$this->date->start, $this->date->end])
                whereHas('attempts', function ($query) {
                    $query->whereBetween('created_at', [$this->date->start, $this->date->end])
                        ->where('app_id', $this->app->id);
                })
                ->withCount(['attempts' => function ($query) {
                    $query->whereBetween('created_at', [$this->date->start, $this->date->end])
                        ->where('app_id', $this->app->id);
                }])
                ->where('active', true)
                ->take($limit)
                ->get()
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'profile_id' => $user->profile_id,
                        'name' => $user->name,
                        'score' => $user->getScore($this->date, $this->app->id),
//                        'payload' => $user->getPayload($this->date, $this->app->id),
                        'attempts_count' => $user->attempts_count,
                        'created_at' => $user->created_at,
                        'updated_at' => $user->updated_at
                    ];
                })
                ->sortByDesc('score');
        } catch (\Exception $e) {
            return response()->json([
                'ok' => false,
                'error' => $e->getMessage()
            ], 500);
        }

        if ($users->isEmpty()) {
            return response()->json([
                'ok' => false,
                'error' => 'Пользователи не найдены.'
            ], 404);
        }

        return response()->json([
            'ok' => true,
            'data' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $customerFieldList = ['profile_id', 'name', 'abuser', 'active'];

        $rules = [
            'profile_id' => [
                'required',
                'max:255'
            ],
            'name' => [
                'required',
                'string',
                'min:2',
                'max:255',
            ]
        ];

        $messages = [
            'profile_id.required' => 'profile_id должен быть указан.',
            'profile_id.max' => 'profile_id не должно превышать 255 символов.',
            'name.required' => 'name обязательно для заполнения.',
            'name.string' => 'name должно быть строкой.',
            'name.min' => 'name должно быть не менее 2 символов.',
            'name.max' => 'name не должно превышать 255 символов.',
            'score.integer' => 'score должен быть целым числом.',
            'app.required' => 'app должен быть указан.',
            'app.string' => 'app должно быть строкой.',
            'app.max' => 'app не должно превышать 255 символов.',
            'payload.json' => 'payload должен быть в json формате.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->errors()->first()
            ], 400);
        }

        $data = $validator->validated();

        if (!ObsceneCensorRus::isAllowed($data['name'])) {
            $data['abuser'] = true;
            $data['active'] = false;
        } else {
            $data['abuser'] = false;
            $data['active'] = true;
        }

        $dataUser = array_intersect_key($data, array_flip($customerFieldList));

        $user = Customer::firstOrCreate([
            'profile_id' => $dataUser['profile_id']
        ], $dataUser);

        return response()->json([
            'ok' => true,
            'data' => $user
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
//        dd($this->date);
        if ($this->date === null) {
            return response()->json([
                'ok' => false,
                'error' => 'Неверный формат даты.'// Ожидается формат dmy (например, 221124).'
            ], 400);
        }

        try {
            $user = Customer::where('profile_id', $id)
                ->withCount(['attempts' => function ($query) {
                    $query->whereBetween('created_at', [$this->date->start, $this->date->end]);
                }])->firstOrFail();
        } catch (\Exception $e) {
            return response()->json([
                'ok' => false,
                'error' => 'Пользователь не найден.'
            ], 404);
        }

        $user['score'] = $user->attempts()->whereBetween('created_at', [$this->date->start, $this->date->end])->max('score') ?? 0;
        $user['payload'] = $user->attempts()->whereBetween('created_at', [$this->date->start, $this->date->end])->where('score', $user['score'])->orderByDesc('created_at')->first()?->payload;

        return response()->json([
            'ok' => true,
            'data' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $customerFieldList = ['name', 'abuser', 'active'];
        $attemptFieldList = ['score', 'app_id', 'payload'];

        $rules = [
            'app' => [
                'required',
                'string',
                'max:255',
            ],
            'name' => [
                'string',
                'min:2',
                'max:255',
            ],
            'score' => [
                'required',
                'integer',
                'min:0'
            ],
            'payload' => [
                'json'
            ]
        ];

        $messages = [
            'name.required' => 'name обязательно для заполнения.',
            'name.string' => 'name должно быть строкой.',
            'name.min' => 'name должно быть не менее 2 символов.',
            'name.max' => 'name не должно превышать 255 символов.',
            'score.required' => 'score должен быть указан.',
            'score.integer' => 'score должен быть целым числом.',
            'score.min' => 'score должен быть положительным числом.',
            'app.required' => 'app должен быть указан.',
            'app.string' => 'app должно быть строкой.',
            'app.max' => 'app не должно превышать 255 символов.',
//            'payload.required' => 'payload должен быть указан.',
            'payload.json' => 'payload должен быть в json формате.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->errors()->first()
            ], 400);
        }

        $data = $validator->validated();

        try {
            $app = App::where(['name' => $data['app']])->first();
            $data['app_id'] = $app->id;
        } catch (\Exception $e) {
            return response()->json([
                'ok' => false,
                'error' => 'Приложение не существует.'
            ], 404);
        }

        $dataUser = array_intersect_key($data, array_flip($customerFieldList));
        $dataAttempt = array_intersect_key($data, array_flip($attemptFieldList));

        try {
            $user = Customer::where('profile_id', $id)->firstOrFail();
        } catch (\Exception $e) {
            return response()->json([
                'ok' => false,
                'error' => 'Пользователь не найден.'
            ], 404);
        }

        if (!empty($dataUser)) {
            $user->update($dataUser);
        }

        $attempt = $user->attempts()->create($dataAttempt);

        $returnData = [
            'id' => $user->id,
            'profile_id' => $user->profile_id,
            'name' => $user->name,
            'score' => (int) $attempt->score,
            'payload' => $attempt->payload,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at
        ];

        return response()->json([
            'ok' => true,
            'data' => $returnData
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $user = Customer::where('profile_id', $id)->firstOrFail();
            $user->update(['active' => false]);
        } catch (\Exception $e) {
            return response()->json([
                'ok' => false,
                'error' => 'Пользователь не найден.'
            ], 404);
        }
        return response()->json([
            'ok' => true,
            'message' => 'Пользователь деактивирован.',
            'data' => $user
        ]);
    }
}
