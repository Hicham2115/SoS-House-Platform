<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'email', 'password', 'role', 'profession', 'phone', 'avatar', 'account_type', 'raison_sociale', 'ice', 'ville', 'nom_du_referant', 'quartier', 'adresse', 'etage', 'notification_Channel', 'niveau', 'rc', 'secteur_activite', 'nom_commercial', 'carte_auto_entrepreneur', 'cin_recto', 'cin_verso', 'selfie'])]

#[Hidden(['password', 'remember_token'])]

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            "role" => 'string',
            "profession" => 'string',
            "phone" => 'string',
            "avatar" => 'string',
            "account_type" => 'string',
            "raison_sociale" => 'string',
            "ice" => 'string',
            "ville" => 'string',
            "quartier" => 'string',
            "adresse" => 'string',
            "etage" => 'string',
            "nom_du_referant" => 'string',
            "notification_Channel" => 'string',
            "niveau" => 'string',
            "rc" => 'string',
            "secteur_activite" => 'string',
            "nom_commercial" => 'string',
            "carte_auto_entrepreneur" => 'string',
            "cin_recto" => 'string',
            "cin_verso" => 'string',
            "selfie" => 'string',
        ];
    }

    public function demandes()
    {
        return $this->hasMany(Demande::class);
    }

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }
}
