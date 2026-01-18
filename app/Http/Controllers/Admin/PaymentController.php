<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\KasPayment;
use App\Models\Cashflow;
use App\Models\Balance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = KasPayment::with('user')->latest()->paginate(15);
        return Inertia::render('Admin/Payments/Index', [
            'payments' => $payments,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    public function verify(Request $request, KasPayment $payment)
    {
        if ($payment->status !== 'PENDING') {
            return back()->with('error', 'Payment already processed.');
        }

        // Check if period is locked
        if ($payment->bill_id) {
            $billDate = \Carbon\Carbon::parse($payment->bill->month);
            $isLocked = \App\Models\PeriodLock::where('month', $billDate->month)
                ->where('year', $billDate->year)
                ->exists();
            
            if ($isLocked) {
                return back()->with('error', 'Cannot modify payments in a locked period.');
            }
        }

        DB::transaction(function () use ($payment) {
            // 1. Update Payment Status
            $payment->update([
                'status' => 'VERIFIED',
                'verified_by' => auth()->id(),
                'verified_at' => now(),
            ]);

            // 2. Update Bill Status (if linked)
            if ($payment->bill_id) {
                // Assuming MonthlyBill model exists and linked
                $payment->bill()->update([
                    'status' => 'PAID',
                    'paid_at' => now(),
                ]);
            }

            // 3. Create Cashflow (IN)
            Cashflow::create([
                'source_type' => 'USER_PAYMENT',
                'source_id' => $payment->id,
                'direction' => 'IN',
                'category' => $payment->type, // KAS, WIFI, etc
                'amount' => $payment->amount,
                'description' => "Verified payment from {$payment->user->name}",
                'created_by' => auth()->id(),
            ]);

            // 4. Update Balance (Singleton logic: ID 1)
            $balance = Balance::firstOrCreate(['id' => 1], ['current_balance' => 0]);
            $balance->increment('current_balance', $payment->amount);
            
            // 5. Audit Log
            \App\Services\AuditService::log('VERIFY_PAYMENT', 'KasPayment', $payment->id, "Verified payment ID {$payment->id} amount {$payment->amount}");
        });

        return back()->with('success', 'Payment verified, bill marked as paid, and balance updated.');
    }

    public function reject(Request $request, KasPayment $payment)
    {
        if ($payment->status !== 'PENDING') {
            return back()->with('error', 'Payment already processed.');
        }

        // Check if period is locked
        if ($payment->bill_id) {
            $billDate = \Carbon\Carbon::parse($payment->bill->month);
            $isLocked = \App\Models\PeriodLock::where('month', $billDate->month)
                ->where('year', $billDate->year)
                ->exists();
            
            if ($isLocked) {
                return back()->with('error', 'Cannot modify payments in a locked period.');
            }
        }

        $payment->update([
            'status' => 'REJECTED',
            'verified_by' => auth()->id(),
            'verified_at' => now(),
        ]);

        // Audit Log
        \App\Services\AuditService::log('REJECT_PAYMENT', 'KasPayment', $payment->id, "Rejected payment ID {$payment->id}");

        return back()->with('success', 'Payment rejected.');
    }
}
