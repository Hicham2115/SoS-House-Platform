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
        Schema::create('demandes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('category');
            $table->string('subcategory');
            $table->string('property_type')->nullable();
            $table->json('qualification')->nullable();
            $table->json('photos')->nullable();
            $table->text('description');
            $table->string('ville');
            $table->string('adresse');
            $table->string('etage')->nullable();
            $table->string('urgency');
            $table->date('scheduled_date')->nullable();
            $table->string('scheduled_time')->nullable();
            $table->unsignedInteger('budget_min')->nullable();
            $table->unsignedInteger('budget_max')->nullable();
            $table->string('invoice_required');
            $table->string('status')->default('publiee');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demandes');
    }
};
