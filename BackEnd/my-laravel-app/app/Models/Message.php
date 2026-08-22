<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['demande_id', 'sender_id', 'body'])]
class Message extends Model
{
    protected function casts(): array
    {
        return [
            'read_at' => 'datetime',
        ];
    }

    public function demande()
    {
        return $this->belongsTo(Demande::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
