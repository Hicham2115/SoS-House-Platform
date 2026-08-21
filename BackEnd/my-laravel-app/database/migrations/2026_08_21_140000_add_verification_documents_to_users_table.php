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
            // N2 (société) profile fields.
            $table->string('rc')->nullable();
            $table->string('secteur_activite')->nullable();
            $table->string('nom_commercial')->nullable();

            // N1 (auto-entrepreneur) document.
            $table->string('carte_auto_entrepreneur')->nullable();

            // Shared identity documents (N1 and N2).
            $table->string('cin_recto')->nullable();
            $table->string('cin_verso')->nullable();
            $table->string('selfie')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'rc',
                'secteur_activite',
                'nom_commercial',
                'carte_auto_entrepreneur',
                'cin_recto',
                'cin_verso',
                'selfie',
            ]);
        });
    }
};
