<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $user->load('residentProfile');

        if ($user->role === 'ADMIN') {
            $data = [];
            $balance = \App\Models\Balance::firstOrCreate(['id' => 1], ['current_balance' => 0]);
            
            // 1. Action Center Metrics
            $data['pending_payments_count'] = \App\Models\KasPayment::where('status', 'PENDING')->count();
            $data['unpaid_bills_count'] = \App\Models\Bill::whereYear('month', now()->year)
                                                ->whereMonth('month', now()->month)
                                                ->where('status', 'UNPAID')
                                                ->count();
            $data['active_residents_count'] = \App\Models\User::where('role', 'USER')->where('status', 'AKTIF')->count();

            // 2. Financial Health (This Month)
            $data['balance'] = [
                'current_balance' => $balance->current_balance,
                'current_balance_fmt' => number_format($balance->current_balance, 0, ',', '.'),
            ];
            
            $data['total_in_month'] = \App\Models\Cashflow::where('direction', 'IN')
                                        ->whereYear('created_at', now()->year)
                                        ->whereMonth('created_at', now()->month)
                                        ->sum('amount');
            $data['total_in_fmt'] = number_format($data['total_in_month'], 0, ',', '.'); // Re-using key name for frontend compatibility but content is month

            $data['total_out_month'] = \App\Models\Cashflow::where('direction', 'OUT')
                                        ->whereYear('created_at', now()->year)
                                        ->whereMonth('created_at', now()->month)
                                        ->sum('amount');
            $data['total_out_fmt'] = number_format($data['total_out_month'], 0, ',', '.');

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
        // 1. My Bills (Unpaid Past Bills + Current Month)
        $currentMonth = now()->startOfMonth()->format('Y-m-d');

        $bills = \App\Models\Bill::where('user_id', $user->id)
            ->where(function ($q) use ($currentMonth) {
                $q->where('status', '!=', 'PAID')
                    ->orWhere('month', $currentMonth);
            })
            ->with(['latestPayment'])
            ->orderBy('month', 'desc')
            ->get();

        // 2. History (Real Payment Transactions)
        $paymentHistory = \App\Models\KasPayment::whereHas('bill', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        })
            ->with(['bill'])
            ->latest('payment_date')
            ->get();

        return Inertia::render('User/Dashboard', [
            'user' => $user,
            'bills' => $bills,
            'paymentHistory' => $paymentHistory,
        ]);
    }
}
