<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\ResidentProfile;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin Utama',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'ADMIN',
            'status' => 'AKTIF',
        ]);

        // User 1
        $user1 = User::create([
            'name' => 'Anak Asrama 1',
            'email' => 'user1@example.com',
            'password' => Hash::make('password'),
            'role' => 'USER',
            'status' => 'AKTIF',
            'phone' => '081234567890',
        ]);

        ResidentProfile::create([
            'user_id' => $user1->id,
            'wali_nama' => 'Bapak Budi',
            'wali_kontak' => '081298765432',
            'alamat_asal' => 'Jl. Kampung Halaman No. 1',
            'pendidikan' => 'KULIAH',
            'institusi' => 'Universitas Indonesia',
            'tahun_masuk' => 2023,
        ]);

        // User 2
        $user2 = User::create([
            'name' => 'Anak Asrama 2',
            'email' => 'user2@example.com',
            'password' => Hash::make('password'),
            'role' => 'USER',
            'status' => 'AKTIF',
            'phone' => '089876543210',
        ]);

        ResidentProfile::create([
            'user_id' => $user2->id,
            'wali_nama' => 'Ibu Siti',
            'wali_kontak' => '081211122233',
            'alamat_asal' => 'Jl. Merdeka No. 45',
            'pendidikan' => 'SMA',
            'institusi' => 'SMA Negeri 1 Jakarta',
            'tahun_masuk' => 2024,
        ]);
    }
}
