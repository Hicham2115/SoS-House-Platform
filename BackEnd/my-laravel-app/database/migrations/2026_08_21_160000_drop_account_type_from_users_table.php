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
            // Superseded by `niveau` (n0/n1/n2), which drives the real
            // demande-gating logic — see DemandeController::available().
            // raison_sociale/ice are kept; they're still used for société
            // artisans in the pro settings page.
            $table->dropColumn('account_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('account_type')->nullable();
        });
    }
};
