<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cashflow;
use App\Models\Balance;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;

class CashflowController extends Controller
{
    public function index()
    {
        $cashflows = Cashflow::with('creator')->latest()->paginate(20);
        $balance = Balance::firstOrCreate(['id' => 1], ['current_balance' => 0]);
        
        return Inertia::render('Admin/Cashflows/Index', [
            'cashflows' => $cashflows,
            'balance' => $balance,
            'success' => session('success'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'direction' => 'required|in:IN,OUT',
            'category' => 'required|string|max:255',
            'amount' => 'required|integer|min:1',
            'description' => 'nullable|string',
        ]);

        DB::transaction(function () use ($request) {
            // 1. Create Cashflow
            $cashflow = Cashflow::create([
                'source_type' => 'MANUAL',
                'direction' => $request->direction,
                'category' => $request->category,
                'amount' => $request->amount,
                'description' => $request->description,
                'created_by' => auth()->id(),
            ]);

            // 2. Update Balance
            $balance = Balance::firstOrCreate(['id' => 1], ['current_balance' => 0]);
            
            if ($request->direction === 'IN') {
                $balance->increment('current_balance', $request->amount);
            } else {
                $balance->decrement('current_balance', $request->amount);
            }

            // 3. Audit Log
            \App\Services\AuditService::log('CREATE_CASHFLOW', 'Cashflow', $cashflow->id, "Created manual {$request->direction} cashflow amount {$request->amount}");
        });

        return redirect()->route('admin.cashflows.index')->with('success', 'Cashflow recorded successfully.');
    }
}
