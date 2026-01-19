<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->role === 'ADMIN') {
            $data = [];
            $balance = \App\Models\Balance::firstOrCreate(['id' => 1], ['current_balance' => 0]);
            $data['balance'] = [
                'current_balance' => $balance->current_balance,
                'current_balance_fmt' => number_format($balance->current_balance, 0, ',', '.'),
            ];
            $data['total_in'] = \App\Models\Cashflow::where('direction', 'IN')->sum('amount');
            $data['total_in_fmt'] = number_format($data['total_in'], 0, ',', '.');
            $data['total_out'] = \App\Models\Cashflow::where('direction', 'OUT')->sum('amount');
            $data['total_out_fmt'] = number_format($data['total_out'], 0, ',', '.');
            
            // LATEST DATA PREVIEWS
            $latestResidents = \App\Models\User::where('role', 'USER')->latest()->take(5)->get();
            $latestPayments = \App\Models\KasPayment::with('user')->where('status', 'VERIFIED')->latest('payment_date')->take(5)->get();
            $latestCashflows = \App\Models\Cashflow::latest()->take(5)->get();

            return Inertia::render('Dashboard', [
                'data' => $data,
                'user' => $user,
                'latestResidents' => $latestResidents,
                'latestPayments' => $latestPayments,
                'latestCashflows' => $latestCashflows,
            ]);
        }

        // USER LOGIC
        // 1. Current Month Bills
        $currentMonth = now()->startOfMonth()->format('Y-m-d');
        $currentBills = \App\Models\MonthlyBill::where('user_id', $user->id)
            ->where('month', $currentMonth)
            ->with(['latestPayment'])
            ->get();
        
        // 2. History (Real Payment Transactions)
        $paymentHistory = \App\Models\KasPayment::whereHas('bill', function($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->with(['bill'])
            ->latest('payment_date')
            ->get();

        return Inertia::render('User/Dashboard', [
            'user' => $user,
            'currentBills' => $currentBills,
            'paymentHistory' => $paymentHistory
        ]);
    }
}
