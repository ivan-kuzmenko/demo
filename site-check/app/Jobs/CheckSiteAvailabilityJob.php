<?php

namespace App\Jobs;

use GuzzleHttp\Exception\ConnectException;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Site;
use App\Models\Answer;
use GuzzleHttp\Client;
use Spatie\SslCertificate\SslCertificate;
use Illuminate\Support\Facades\Log;

class CheckSiteAvailabilityJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $site;
    protected $client;

    public $tries = 3;
    public $backoff = 60;

    public function __construct(Site $site)
    {
        $this->site = $site;
    }

    public function handle()
    {
        if (!$this->site->url_ascii) {
            $this->site->url_ascii = idn_to_ascii($this->site->url);
            $this->site->save();
        }

        $client = new Client();
        $port = !is_null($this->site->port) ? ':'.$this->site->port : '';
        $url = 'https://' . $this->site->url_ascii . $port;
        $errors = [];
        $startTime = microtime(true);

        // Ответ от сайта
        try {
            $response = $client->request('GET', $url, ['timeout' => 10]);
        } catch (\Exception $e) {
            if ($e->getCode() == 28 || strpos($e->getMessage(), 'cURL error 28') !== false) {
                CheckSiteAvailabilityJob::dispatch($this->site)->delay(now()->addSeconds(30));
                Log::error('/**********/');
                Log::error('Retry on ' . $url);
                Log::error($e->getMessage());
                Log::error('/**********/');
                $this->fail('Retry after 30 secs.');
                return false;
            }
            array_push($errors, $e->getMessage());
        }

        // Проверка сертификата
        try {
            $certificate = SslCertificate::createForHostName($url);
        } catch (\Exception $e) {
            array_push($errors, $e->getMessage());
        }
        $timeTaken = microtime(true) - $startTime;

        $statusCode = @$response ? $response->getStatusCode() : 504;
        $ssl = @$certificate ? $certificate->isValid() : false;
        $errors = !empty($errors) ? json_encode($errors) : null;

        if ($statusCode == 504) {
            Log::info('504 error on ' . $url);
        }

        $query = $this->site->answers()->create([
            'code' => $statusCode,
            'time' => $timeTaken,
            'ssl' => $ssl,
            'errors' => $errors
        ]);

        if ($this->site->important && ($statusCode >= 500 || !$ssl)) {
            \Illuminate\Support\Facades\Notification::route('telegram', env('TELEGRAM_CHAT_ID'))
                ->notify(new \App\Notifications\SiteCheckNotifyImportantTelegram($query));
        }
    }
}
