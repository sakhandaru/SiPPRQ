<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PrunePaymentProofs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'payment:prune-proofs';

    protected $description = 'Delete payment proof images for VERIFIED payments older than 3 months';

    public function handle()
    {
        $cutoffDate = now()->subMonths(3);
        $this->info("Scanning for verified payments older than: " . $cutoffDate->toDateString());

        $payments = \App\Models\KasPayment::where('status', 'VERIFIED')
            ->where('created_at', '<', $cutoffDate)
            ->whereNotNull('proof_image')
            ->get();

        if ($payments->isEmpty()) {
            $this->info("No payments found eligible for pruning.");
            return;
        }

        $bar = $this->output->createProgressBar($payments->count());
        $deletedCount = 0;

        foreach ($payments as $payment) {
            if (\Illuminate\Support\Facades\Storage::disk('public')->exists($payment->proof_image)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($payment->proof_image);
                $payment->update(['proof_image' => null]);
                $deletedCount++;
            }
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info("Pruned {$deletedCount} images successfully.");
    }
}
