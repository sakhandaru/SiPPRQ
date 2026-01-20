<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        return redirect()->route('dashboard');
    }

    public function store(Request $request)
    {
        $request->validate([
            'bill_ids' => 'required|array',
            'bill_ids.*' => 'exists:bills,id',
            'proof_image' => 'required|image|max:2048', // 2MB Max
        ]);

        $path = $request->file('proof_image')->store('payment-proofs', 'public');
        $count = 0;

        foreach ($request->bill_ids as $billId) {
            $bill = \App\Models\Bill::findOrFail($billId);

            if ($bill->user_id !== auth()->id()) {
                continue; // Skip if not owner
            }
            
            if ($bill->status === 'PAID') {
                continue; // Skip if already paid
            }

            // Check if there is already a PENDING payment? 
            // Optional but good practice. For now, we trust the UI state but backend double-check is good.
            // If already pending, we might duplicate. MVP: Allow duplicate submission just in case they re-submit?
            // Let's just create it. Admin can reject duplicate.

            auth()->user()->kasPayments()->create([
                'bill_id' => $bill->id,
                'type' => $bill->type, // Copy type from bill
                'amount' => $bill->amount, // Copy amount from bill (Read Only)
                'payment_date' => now(),
                'proof_image' => $path,
                'status' => 'PENDING',
            ]);
            
            $count++;
        }

        return redirect()->route('dashboard')->with('success', "Payment proof uploaded successfully for {$count} bills. Waiting for verification.");
    }
}
