<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use NotificationChannels\Telegram\TelegramMessage;

class SiteCheckNotifyTelegram extends Notification
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

    /**
     * Get the mail representation of the notification.
     */
    public function toTelegram($notifiable)
    {
        if ($this->data->count() <= 0) return false;
        $now = \Carbon\Carbon::now();

        $string = "{$now}\nЗа последние сутки обнаружена проблема с:\n\n";
        $tab = "➖";

        foreach ($this->data as $item) {
            $codes = array_count_values($item->answers->pluck('code')->toArray());
            arsort($codes);
            $ssls = array_count_values($item->answers->pluck('ssl')->toArray());
            arsort($ssls);

            if (!empty(array_diff(array_keys($codes), [200, 301, 302]))) { // Если есть коды ошибок
                $status = '🟥';
            } else if(isset($ssls[0])) { // Если есть ошибки ssl
                $status = '🟧';
            } else {
                $status = '🟩';
            }
            $string .= "{$status} {$item->url} (id: {$item->id})\n";

            $string .= "{$tab}Коды ответов:\n";
            foreach ($codes as $key => $code) {
                if ($key == 0) {
                    $string .= "{$tab}{$tab}({$code})\n";
                } else {
                    $string .= "{$tab}{$tab}{$key} ({$code})\n";
                }
            }

            foreach ($ssls as $key => $ssl) {
                $string .= "{$tab}Ошибка ssl ({$ssl})\n";
            }
        }

        return TelegramMessage::create()
            ->to(config('services.telegram-bot-api.chat_id'))
            ->content($string)
            ->button('Смотреть детали', url('status', \Carbon\Carbon::now()->format('dmy')));
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
