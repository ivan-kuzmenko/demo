<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
use NotificationChannels\Telegram\TelegramMessage;

class SiteCheckNotifyImportantTelegram extends Notification
{
    use Queueable;

    private $data;

    /**
     * Create a new notification instance.
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['telegram'];
    }

    function multi_implode($array, $glue) {
        $ret = '';

        foreach ($array as $item) {
            if (is_array($item)) {
                $ret .= $this->multi_implode($item, $glue) . $glue;
            } else {
                $ret .= $item . $glue;
            }
        }

        $ret = substr($ret, 0, 0-strlen($glue));

        return $ret;
    }


    public function toTelegram($notifiable)
    {
        $answer = $this->data;
        $site = $this->data->site()->first();

        $port = $site->port ? ":{$site->port}" : "";

        $string = "Сейчас!\n";
        $string .= "{$site->url}{$port} (id: {$site->id})\n\n";
        $string .= "Код ответа: {$answer->code} ({$answer->time} ms)\n";
        $string .= "Сертификат SSL: " . ($answer->ssl ? 'Есть' : 'Нет') . "\n\n";

        if (!is_null($answer->errors)) {
            $string .= "Ошибки:\n";
            foreach (json_decode($answer->errors, true) as $value) {
                $string .= "{$value}\n";
            }
        }

        return TelegramMessage::create()
            ->to(config('services.telegram-bot-api.chat_id'))
            ->content($string);
//            ->button('Смотреть детали', url('status', \Carbon\Carbon::now()->format('dmy')));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
