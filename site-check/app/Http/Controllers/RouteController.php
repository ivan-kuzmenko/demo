<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function status($date = null) {
        $interval = 30;
        $now = \Carbon\Carbon::now();
        if (is_null($date)) {
            $date = $now->addMinutes($interval - ($now->minute % $interval))->setSeconds(0)->setMilliseconds(0);
        } else {
            try {
                $date = \Carbon\Carbon::createFromFormat('dmy', $date)->setTime(9, 0);
            } catch (\Exception $e) {
                $date = $now->addMinutes($interval - ($now->minute % $interval))->setSeconds(0)->setMilliseconds(0);
            }

            if ($date->isFuture()) {
                return redirect()->route('status');
            }
        }
        $subdate = $date->copy()->subDays(1);

        $sites = \App\Models\Site::whereHas('answers', function ($query) use ($date, $subdate) {
            $query->whereBetween('created_at', [$subdate, $date])
                ->where(function ($query) {
                    $query->whereNotIn('code', [200, 301, 302])
                        ->orWhere('ssl', false);
                });
        })
            ->where('important', true)
            ->with(['answers' => function ($query) use ($date, $subdate, $interval) {
            $query->whereBetween('created_at', [$subdate, $date]);
        }])->get();

        $intervals = [];

        $startTime = \Carbon\Carbon::parse($subdate);
        $endTime = \Carbon\Carbon::parse($date);

        while($startTime < $endTime) {
            $nextTime = $startTime->copy()->addMinutes($interval);
            $intervals[] = [
                'start' => $startTime,
                'end' => $nextTime//->format('d.m.Y H:i:s')
            ];
            $startTime = $nextTime;
        }

        return view('status', compact('sites', 'date', 'intervals'));
    }
}
