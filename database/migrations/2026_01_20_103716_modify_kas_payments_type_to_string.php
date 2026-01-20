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
        // Change enum to string to support INCIDENTAL and others
        DB::statement('ALTER TABLE kas_payments MODIFY COLUMN type VARCHAR(255)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert back to enum (Warning: Data loss if non-enum values exist)
        // We'll keep it as string for safety in down(), or try to revert if valid.
        // For now, let's strictly revert to original enum for correctness of "down"
        DB::statement("ALTER TABLE kas_payments MODIFY COLUMN type ENUM('KAS', 'WIFI', 'LAINNYA')");
    }
};
