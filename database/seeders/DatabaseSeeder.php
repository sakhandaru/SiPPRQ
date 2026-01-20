<?php

namespace Database\Seeders;

use App\Models\ResidentProfile;
use App\Models\User;
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
        $this->call([
            RegionSeeder::class,
            DefaultFeeSeeder::class, // Added for completeness if it exists
        ]);
        // Admin
        User::create([
            'name' => 'Admin Utama',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'ADMIN',
            'status' => 'AKTIF',
        ]);

        // Fetch valid regions for seeding (assuming RegionSeeder ran first)
        // Kept here in case we uncomment the users later
        $province = \App\Models\Province::first();
        $city = \App\Models\City::where('province_id', $province?->id)->first();
        $district = \App\Models\District::where('city_id', $city?->id)->first();

        /*
        // User 1
        $user1 = User::create([
            'name' => 'Anak Asrama 1',
            'email' => 'user1@example.com',
            'password' => Hash::make('password'),
            'role' => 'USER',
            'status' => 'AKTIF',
            'phone' => '081234567890',
        ]);

        // Fetch valid regions for seeding (assuming RegionSeeder ran first)
        $province = \App\Models\Province::first();
        $city = \App\Models\City::where('province_id', $province?->id)->first();
        $district = \App\Models\District::where('city_id', $city?->id)->first();

        ResidentProfile::create([
            'user_id' => $user1->id,
            'wali_nama' => 'Bapak Budi',
            'wali_kontak' => '081298765432',
            'province_id' => $province?->id,
            'city_id' => $city?->id,
            'district_id' => $district?->id,
            'address_detail' => 'Jl. Kampung Halaman No. 1',
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
            'province_id' => $province?->id,
            'city_id' => $city?->id,
            'district_id' => $district?->id,
            'address_detail' => 'Jl. Merdeka No. 45',
            'pendidikan' => 'SMA',
            'institusi' => 'SMA Negeri 1 Jakarta',
            'tahun_masuk' => 2024,
        ]);
        */
    }
}
