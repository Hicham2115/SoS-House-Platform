<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['demande_id', 'user_id', 'price', 'message', 'status'])]
class Offer extends Model
{
    protected function casts(): array
    {
        return [
            'price' => 'integer',
        ];
    }

    public function demande()
    {
        return $this->belongsTo(Demande::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
