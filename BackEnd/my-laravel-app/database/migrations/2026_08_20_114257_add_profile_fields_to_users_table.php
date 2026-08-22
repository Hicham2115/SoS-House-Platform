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
        // No-op: these columns were later added directly to
        // 0001_01_01_000000_create_users_table.php, so a fresh database
        // already has them by the time this migration runs. Kept as a
        // no-op (rather than deleted) so environments where this migration
        // already ran keep a consistent migrations history.
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // See up() — nothing to reverse here.
    }
};
