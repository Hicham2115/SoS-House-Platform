<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

// Note: this is a plain app-level notification, unrelated to Laravel's
// built-in Illuminate\Notifications system (User keeps its Notifiable
// trait for other purposes, but has no relation named "notifications").
#[Fillable(['user_id', 'type', 'title', 'body', 'data'])]
class Notification extends Model
{
    protected function casts(): array
    {
        return [
            'data' => 'array',
            'read_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
