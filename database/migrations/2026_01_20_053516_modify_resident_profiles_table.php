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
        Schema::table('resident_profiles', function (Blueprint $table) {
            // Drop old column
            $table->dropColumn('alamat_asal');

            // Add new columns
            $table->foreignId('province_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('city_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('district_id')->nullable()->constrained()->nullOnDelete();
            $table->text('address_detail')->nullable(); // Jalan, RT/RW
            
            $table->date('birth_date')->nullable();
            $table->string('study_program')->nullable(); // Jurusan/Prodi
            $table->string('student_id_number')->nullable(); // NIS
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('resident_profiles', function (Blueprint $table) {
            $table->text('alamat_asal')->nullable();
            
            $table->dropForeign(['province_id']);
            $table->dropForeign(['city_id']);
            $table->dropForeign(['district_id']);
            $table->dropColumn(['province_id', 'city_id', 'district_id', 'address_detail', 'birth_date', 'study_program', 'student_id_number']);
        });
    }
};
