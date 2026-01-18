<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->role === 'ADMIN') {
            $data = [];
            $data['balance'] = \App\Models\Balance::firstOrCreate(['id' => 1], ['current_balance' => 0]);
            $data['total_in'] = \App\Models\Cashflow::where('direction', 'IN')->sum('amount');
            $data['total_out'] = \App\Models\Cashflow::where('direction', 'OUT')->sum('amount');
            
            return view('dashboard', compact('data'));
        }

        // USER LOGIC
        // 1. Current Month Bills
        $currentMonth = now()->startOfMonth()->format('Y-m-d');
        $currentBills = \App\Models\MonthlyBill::where('user_id', $user->id)
            ->where('month', $currentMonth)
            ->get();
        
        // 2. History (Bills excluding current month)
        $historyBills = \App\Models\MonthlyBill::where('user_id', $user->id)
            ->where('month', '<', $currentMonth)
            ->latest('month')
            ->get();

        return view('dashboard.user', compact('user', 'currentBills', 'historyBills'));
    }
}
