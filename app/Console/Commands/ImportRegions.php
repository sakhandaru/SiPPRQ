<?php

namespace App\Console\Commands;

use App\Models\City;
use App\Models\District;
use App\Models\Province;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Schema;

class ImportRegions extends Command
{
    protected $signature = 'region:import';

    protected $description = 'Import full Indonesian regions (Provinces, Cities, Districts) from emsifa API';

    public function handle()
    {
        $this->info('Starting Indonesian Region Import...');

        if (! $this->confirm('This will TRUNCATE (delete) all existing provinces, cities, and districts. Continue?', true)) {
            return;
        }

        $startTime = microtime(true);

        // 1. Fetch Provinces
        $this->info('Fetching Provinces...');
        $provinces = Http::get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')->json();

        if (! $provinces) {
            $this->error('Failed to fetch provinces.');

            return;
        }

        // 2. Fetch Regencies (Parallel)
        $this->info('Fetching Regencies (Cities) for '.count($provinces).' provinces...');
        $regencyResponses = Http::pool(function ($pool) use ($provinces) {
            foreach ($provinces as $province) {
                $pool->as($province['id'])->get("https://www.emsifa.com/api-wilayah-indonesia/api/regencies/{$province['id']}.json");
            }
        });

        $allRegencies = [];
        foreach ($regencyResponses as $pid => $response) {
            if ($response->ok()) {
                $allRegencies = array_merge($allRegencies, $response->json());
            } else {
                $this->error("Failed to fetch regencies for province ID: $pid");
            }
        }

        // 3. Fetch Districts (Parallel - Batched to avoid too many open connections)
        $this->info('Fetching Districts for '.count($allRegencies).' cities...');
        $allDistricts = [];

        $chunks = array_chunk($allRegencies, 50); // Batch of 50 concurrent requests
        $bar = $this->output->createProgressBar(count($allRegencies));
        $bar->start();

        foreach ($chunks as $chunk) {
            $responses = Http::pool(function ($pool) use ($chunk) {
                foreach ($chunk as $regency) {
                    $pool->as($regency['id'])->get("https://www.emsifa.com/api-wilayah-indonesia/api/districts/{$regency['id']}.json");
                }
            });

            foreach ($responses as $rid => $response) {
                if ($response->ok()) {
                    $allDistricts = array_merge($allDistricts, $response->json());
                }
            }
            $bar->advance(count($chunk));
        }
        $bar->finish();
        $this->newLine();

        // 4. Save to Database
        $this->info('Saving to database...');

        Schema::disableForeignKeyConstraints();
        District::truncate();
        City::truncate();
        Province::truncate();

        Model::unguard(); // Allow inserting explicit IDs

        // Bulk Insert Provinces
        $this->info('Inserting '.count($provinces).' Provinces...');
        $provinceData = collect($provinces)->map(fn ($p) => [
            'id' => $p['id'],
            'name' => $p['name'],
            'created_at' => now(), 'updated_at' => now(),
        ])->toArray();
        Province::insert($provinceData);

        // Bulk Insert Cities
        $this->info('Inserting '.count($allRegencies).' Cities...');
        $cityData = collect($allRegencies)->map(fn ($c) => [
            'id' => $c['id'],
            'province_id' => $c['province_id'],
            'name' => $c['name'],
            'created_at' => now(), 'updated_at' => now(),
        ])->toArray();
        foreach (array_chunk($cityData, 500) as $chunk) {
            City::insert($chunk);
        }

        // Bulk Insert Districts
        $this->info('Inserting '.count($allDistricts).' Districts...');
        $districtData = collect($allDistricts)->map(fn ($d) => [
            'id' => $d['id'],
            'city_id' => $d['regency_id'], // API uses 'regency_id', our DB uses 'city_id'? Need to verify model
            'name' => $d['name'],
            'created_at' => now(), 'updated_at' => now(),
        ])->toArray();

        foreach (array_chunk($districtData, 500) as $chunk) {
            District::insert($chunk);
        }

        Model::reguard();
        Schema::enableForeignKeyConstraints();

        $duration = round(microtime(true) - $startTime, 2);
        $this->info("Done! Imported full regions in {$duration} seconds.");
    }
}
