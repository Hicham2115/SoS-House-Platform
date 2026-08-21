<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Step 1 — Zone.
            $table->unsignedInteger('radius_km')->nullable();
            $table->json('provider_categories')->nullable();

            // Step 3 — Profil.
            $table->json('disponibilite_jours')->nullable();
            $table->string('heure_debut')->nullable();
            $table->string('heure_fin')->nullable();
            $table->text('bio')->nullable();
            $table->unsignedInteger('annees_experience')->nullable();
            $table->json('specialites')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'radius_km',
                'provider_categories',
                'disponibilite_jours',
                'heure_debut',
                'heure_fin',
                'bio',
                'annees_experience',
                'specialites',
            ]);
        });
    }
};
