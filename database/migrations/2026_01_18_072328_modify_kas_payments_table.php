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
        Schema::table('kas_payments', function (Blueprint $table) {
            $table->foreignId('bill_id')->nullable()->after('user_id')->constrained('monthly_bills')->onDelete('cascade');
            $table->integer('amount')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kas_payments', function (Blueprint $table) {
            $table->dropForeign(['bill_id']);
            $table->dropColumn('bill_id');
            $table->integer('amount')->change();
        });
    }
};
