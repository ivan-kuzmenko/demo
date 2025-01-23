<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Site extends Model
{
    use HasFactory;
    use Notifiable;

    protected $guarded = [];

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
//    public function getUrlAsciiAttribute($value)
//    {
//        // Если атрибут NULL, то обновим его на дефолтное значение
//        return $value ?? idn_to_ascii($this->url);  // Возвращаем значение, если оно null
//    }

    protected static function booted()
    {
        // Событие, которое срабатывает перед созданием записи
        static::creating(function ($model) {
            if (empty($model->url_ascii) && !empty($model->url)) {
                // Если url_ascii еще не задан, установим его значение на основе url
                $model->url_ascii = idn_to_ascii($model->url);
            }
        });
    }
}
