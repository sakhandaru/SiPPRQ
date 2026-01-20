<?php

namespace App\Console\Commands;

use App\Services\BillService;
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
    public function handle(BillService $billService)
    {
        $year = now()->year;
        $month = now()->month;

        $result = $billService->generateForMonth($year, $month);

        $this->info("Generated bills for {$result['users_count']} users. Total process: {$result['bills_created']} checks.");
    }
}
