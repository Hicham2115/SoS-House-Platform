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

#[Fillable(['name', 'email', 'password', 'role', 'profession', 'phone', 'avatar', 'raison_sociale', 'ice', 'ville', 'nom_du_referant', 'quartier', 'adresse', 'etage', 'notification_Channel', 'niveau', 'rc', 'secteur_activite', 'nom_commercial', 'carte_auto_entrepreneur', 'cin_recto', 'cin_verso', 'selfie', 'radius_km', 'provider_categories', 'disponibilite_jours', 'heure_debut', 'heure_fin', 'bio', 'annees_experience', 'specialites', 'credits', 'verification_status', 'verification_rejection_reason'])]

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
            "radius_km" => 'integer',
            "provider_categories" => 'array',
            "disponibilite_jours" => 'array',
            "heure_debut" => 'string',
            "heure_fin" => 'string',
            "bio" => 'string',
            "annees_experience" => 'integer',
            "specialites" => 'array',
            "credits" => 'integer',
            "verification_status" => 'string',
            "verification_rejection_reason" => 'string',
        ];
    }

    public function demandes()
    {
        return $this->hasMany(Demande::class);
    }

    public function demandeUnlocks()
    {
        return $this->hasMany(DemandeUnlock::class);
    }

    public function offers()
    {
        return $this->hasMany(Offer::class);
    }

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    public function certifications()
    {
        return $this->hasMany(ProviderCertification::class);
    }

    public function realisations()
    {
        return $this->hasMany(ProviderRealisation::class);
    }

    public function travauxPhotos()
    {
        return $this->hasMany(ProviderTravauxPhoto::class);
    }
}
