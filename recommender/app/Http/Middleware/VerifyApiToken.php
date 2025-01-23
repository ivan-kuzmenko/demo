<?php

namespace App\Http\Middleware;

use App\Models\ApiToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $clientIp = $request->getClientIp();
        try {
            if (is_null($request->header('token'))) throw new \Exception();

            $apitoken = ApiToken::whereRaw('BINARY token = ?', [$request->header('token')])->where(function($query) use ($clientIp) {
            $query->where('ip_address', $clientIp)
                    ->orWhereNull('ip_address');
            })->firstOrFail();
        } catch (\Exception $e) {
            return response()->json([
                'ok' => false,
                'error' => 'Необходим валидный token.'
            ], 400);
        }

        if ($apitoken->ip_address === null) {
            $apitoken->ip_address = $clientIp;
            $apitoken->save();
        }

//        dd($request->getClientIp(), Str::random(30), $request->get('token'), $apitoken);
        return $next($request);
    }
}
