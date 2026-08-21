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
        Schema::create('provider_certifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('file');
            $table->string('organisme')->nullable();
            $table->timestamps();
        });

        Schema::create('provider_realisations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('photo_avant');
            $table->string('photo_apres');
            $table->string('description')->nullable();
            $table->string('categorie')->nullable();
            $table->timestamps();
        });

        Schema::create('provider_travaux_photos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('photo');
            $table->string('legende')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provider_travaux_photos');
        Schema::dropIfExists('provider_realisations');
        Schema::dropIfExists('provider_certifications');
    }
};
