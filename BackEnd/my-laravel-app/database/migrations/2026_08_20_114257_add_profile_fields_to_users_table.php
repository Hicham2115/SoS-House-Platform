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
            $table->string('avatar')->nullable();
            $table->string('account_type')->nullable();
            $table->string('raison_sociale')->nullable();
            $table->string('ice')->nullable();
            $table->string('nom_du_referant')->nullable();
            $table->string('ville')->nullable();
            $table->string('quartier')->nullable();
            $table->string('adresse')->nullable();
            $table->string('etage')->nullable();
            $table->string('notification_Channel')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'avatar',
                'account_type',
                'raison_sociale',
                'ice',
                'nom_du_referant',
                'ville',
                'quartier',
                'adresse',
                'etage',
                'notification_Channel',
            ]);
        });
    }
};
