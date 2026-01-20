<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\District;
use App\Models\Province;
use Illuminate\Database\Seeder;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sample Data for Testing logic (Jawa Timur -> Surabaya/Malang)
        $eastJava = Province::create(['name' => 'Jawa Timur']);
        $centralJava = Province::create(['name' => 'Jawa Tengah']);
        $westJava = Province::create(['name' => 'Jawa Barat']);

        // East Java Cities
        $surabaya = City::create(['province_id' => $eastJava->id, 'name' => 'Surabaya']);
        $malang = City::create(['province_id' => $eastJava->id, 'name' => 'Malang']);
        $sidoarjo = City::create(['province_id' => $eastJava->id, 'name' => 'Sidoarjo']);

        // Surabaya Districts
        District::create(['city_id' => $surabaya->id, 'name' => 'Sukolilo']);
        District::create(['city_id' => $surabaya->id, 'name' => 'Gubeng']);
        District::create(['city_id' => $surabaya->id, 'name' => 'Rungkut']);

        // Malang Districts
        District::create(['city_id' => $malang->id, 'name' => 'Lowokwaru']);
        District::create(['city_id' => $malang->id, 'name' => 'Klojen']);
        District::create(['city_id' => $malang->id, 'name' => 'Blimbing']);

        // Central Java
        $semarang = City::create(['province_id' => $centralJava->id, 'name' => 'Semarang']);
        District::create(['city_id' => $semarang->id, 'name' => 'Pedurungan']);

        // West Java
        $bandung = City::create(['province_id' => $westJava->id, 'name' => 'Bandung']);
        District::create(['city_id' => $bandung->id, 'name' => 'Coblong']);
    }
}
