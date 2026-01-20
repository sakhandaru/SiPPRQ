<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DefaultFeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\FeeSetting::firstOrCreate(
            ['type' => 'KAS'],
            ['amount' => 125000]
        );

        \App\Models\FeeSetting::firstOrCreate(
            ['type' => 'WIFI'],
            ['amount' => 30000]
        );
    }
}
