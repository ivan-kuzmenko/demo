<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Answer extends Model
{
    use HasFactory;
    use Notifiable;

    protected $guarded = [];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}
