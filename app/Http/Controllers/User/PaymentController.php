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
            'bill_id' => 'required|exists:monthly_bills,id',
            'proof_image' => 'required|image|max:2048', // 2MB Max
        ]);

        $bill = \App\Models\MonthlyBill::findOrFail($request->bill_id);

        if ($bill->user_id !== auth()->id()) {
            abort(403);
        }
        
        if ($bill->status === 'PAID') {
            return back()->with('error', 'This bill is already paid.');
        }

        $path = $request->file('proof_image')->store('payment-proofs', 'public');

        auth()->user()->kasPayments()->create([
            'bill_id' => $bill->id,
            'type' => $bill->type, // Copy type from bill
            'amount' => $bill->amount, // Copy amount from bill (Read Only)
            'payment_date' => now(),
            'proof_image' => $path,
            'status' => 'PENDING',
        ]);

        return redirect()->route('dashboard')->with('success', 'Payment proof uploaded successfully. Waiting for verification.');
    }
}
