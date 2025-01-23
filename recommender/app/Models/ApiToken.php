<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class ApiToken extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];
    protected $hidden = ['deleted_at'];

    protected static function booted() {
        static::creating(function ($model) {
            $model->token = Str::random(30);
        });
    }
}
