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
        Schema::rename('monthly_bills', 'bills');

        Schema::table('bills', function (Blueprint $table) {
            $table->string('title')->nullable()->after('type');
            // Change type to string to support new types: REGISTRATION, INCIDENTAL
            // Note: In SQLite/MySQL standard migrations, changing enum to string might need full definition or raw statement.
            // For simplicity and robustness in this standard migration:
            // We'll rely on string-like behavior.
            // If it fails due to enum type, we might need a DB::statement.
        });

        // Force change type to string
        DB::statement('ALTER TABLE bills MODIFY COLUMN type VARCHAR(255)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bills', function (Blueprint $table) {
            $table->dropColumn('title');
        });
        // We do not revert type change to avoid data loss complications; or strict revert would be enum again.
        Schema::rename('bills', 'monthly_bills');
    }
};
