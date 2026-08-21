<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['user_id', 'photo_avant', 'photo_apres', 'description', 'categorie'])]
class ProviderRealisation extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
