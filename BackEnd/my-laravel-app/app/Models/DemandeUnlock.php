<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['demande_id', 'user_id', 'credits_spent', 'unlocked_at'])]
class DemandeUnlock extends Model
{
    protected function casts(): array
    {
        return [
            'unlocked_at' => 'datetime',
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
