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
        Schema::create('resident_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('wali_nama');
            $table->string('wali_kontak');
            $table->text('alamat_asal');
            $table->enum('pendidikan', ['SMP', 'SMA', 'KULIAH']);
            $table->string('institusi')->nullable();
            $table->year('tahun_masuk');
            $table->year('tahun_keluar')->nullable();
            $table->string('social_instagram')->nullable();
            $table->string('social_facebook')->nullable();
            $table->string('social_linkedin')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resident_profiles');
    }
};
