<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SiteNotify extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:site-notify';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sites = \App\Models\Site::with(['answers' => function ($query) {
            $query->where('created_at', '>=', \Carbon\Carbon::now()->subDay())
                ->where(function ($query) {
                    $query->whereNotIn('code', [200, 301, 302])
                        ->orWhere('ssl', false);
                })->orderBy('created_at', 'desc');
        }])
            ->whereHas('answers', function ($query) {
                $query->where('created_at', '>=', \Carbon\Carbon::now()->subDay())
                ->where(function ($query) {
                    $query->whereNotIn('code', [200, 301, 302])
                        ->orWhere('ssl', false);
                });
            })
            ->withCount(['answers as answers_count' => function ($query) {
                $query->where('created_at', '>=', \Carbon\Carbon::now()->subDay())
                    ->where(function ($query) {
                        $query->whereNotIn('code', [200, 301, 302])
                            ->orWhere('ssl', false);
                    });
            }])
            ->where('important', true)
            ->orderBy('answers_count', 'desc')
//        ->orderBy('created_at', 'desc') // Обратный порядок
            ->get();

        if (!$sites->isEmpty()) {
            \Illuminate\Support\Facades\Notification::route('telegram', env('TELEGRAM_CHAT_ID'))
                ->notify(new \App\Notifications\SiteCheckNotifyTelegram($sites));
        }
    }
}
