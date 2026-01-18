<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakeMonthlyBills extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bill:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate monthly KAS and WIFI bills for all active users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $users = \App\Models\User::where('role', 'USER')->where('status', 'AKTIF')->get();
        $fees = \App\Models\FeeSetting::all()->pluck('amount', 'type');
        
        $month = now()->startOfMonth()->format('Y-m-d');
        $count = 0;

        foreach ($users as $user) {
            // 1. KAS Bill
            if (isset($fees['KAS'])) {
                \App\Models\MonthlyBill::firstOrCreate(
                    [
                        'user_id' => $user->id,
                        'type' => 'KAS',
                        'month' => $month,
                    ],
                    [
                        'amount' => $fees['KAS'],
                        'status' => 'UNPAID',
                    ]
                );
                $count++;
            }

            // 2. WIFI Bill
            if (isset($fees['WIFI'])) {
                \App\Models\MonthlyBill::firstOrCreate(
                    [
                        'user_id' => $user->id,
                        'type' => 'WIFI',
                        'month' => $month,
                    ],
                    [
                        'amount' => $fees['WIFI'],
                        'status' => 'UNPAID',
                    ]
                );
                $count++;
            }
        }

        $this->info("Generated bills for {$users->count()} users. Total process: {$count} checks.");
    }
}
