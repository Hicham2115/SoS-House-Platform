<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'user_id',
    'category',
    'subcategory',
    'property_type',
    'qualification',
    'photos',
    'description',
    'ville',
    'adresse',
    'etage',
    'urgency',
    'scheduled_date',
    'scheduled_time',
    'budget_min',
    'budget_max',
    'invoice_required',
    'status',
])]
class Demande extends Model
{
    use SoftDeletes;

    protected function casts(): array
    {
        return [
            'qualification' => 'array',
            'photos' => 'array',
            'scheduled_date' => 'date',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function unlocks()
    {
        return $this->hasMany(DemandeUnlock::class);
    }

    public function offers()
    {
        return $this->hasMany(Offer::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function acceptedOffer()
    {
        return $this->hasOne(Offer::class)->where('status', 'accepted');
    }
}
