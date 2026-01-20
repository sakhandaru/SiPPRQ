<?php

namespace App\Console\Commands;

use App\Models\Bill;
use App\Models\FeeSetting;
use App\Models\KasPayment;
use App\Models\User;
use Illuminate\Console\Command;

class SimulateArrears extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bill:simulate-arrears';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset all bills and generate unpaid bills from Dec 2025 to Apr 2026';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (! $this->confirm('This will DELETE ALL Payment and Bill data. Are you sure?')) {
            return;
        }

        $this->info('Truncating Bills and KasPayments...');

        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        KasPayment::truncate();
        Bill::truncate();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        $users = User::where('role', 'USER')->where('status', 'AKTIF')->get();
        $fees = FeeSetting::all()->pluck('amount', 'type');

        $months = [
            '2025-12-01',
            '2026-01-01',
            '2026-02-01',
            '2026-03-01',
            '2026-04-01',
        ];

        $count = 0;

        foreach ($users as $user) {
            foreach ($months as $month) {
                // 1. KAS Bill
                if (isset($fees['KAS'])) {
                    Bill::create([
                        'user_id' => $user->id,
                        'type' => 'KAS',
                        'month' => $month,
                        'amount' => $fees['KAS'],
                        'status' => 'UNPAID',
                    ]);
                    $count++;
                }

                // 2. WIFI Bill
                if (isset($fees['WIFI'])) {
                    Bill::create([
                        'user_id' => $user->id,
                        'type' => 'WIFI',
                        'month' => $month,
                        'amount' => $fees['WIFI'],
                        'status' => 'UNPAID',
                    ]);
                    $count++;
                }
            }
        }

        $this->info("Generated {$count} unpaid bills for December 2025 and January 2026.");
    }
}
