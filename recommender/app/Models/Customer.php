<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];
    protected $hidden = ['deleted_at'];

    public function getScore($date, $appId)
    {
        return $this->attempts->whereBetween('created_at', [$date->start, $date->end])
            ->where('app_id', $appId)
            ->sortByDesc('score')
            ->first()?->score;
    }
    public function getPayload($date, $appId)
    {
        return $this->attempts->whereBetween('created_at', [$date->start, $date->end])
            ->where('app_id', $appId)
            ->sortByDesc('score')
            ->first()?->payload;
    }
    public function attempts()
    {
        return $this->hasMany(Attempt::class);
    }
}
