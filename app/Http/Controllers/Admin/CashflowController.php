<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Balance;
use App\Models\Cashflow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CashflowController extends Controller
{
    public function index(Request $request)
    {
        $query = Cashflow::with('creator')->latest();

        // Filter by Month
        if ($request->filled('month')) {
            $query->whereMonth('created_at', $request->month);
        }

        // Filter by Year
        if ($request->filled('year')) {
            $query->whereYear('created_at', $request->year);
        }

        // Filter by Direction
        if ($request->filled('direction') && $request->direction !== 'ALL') {
            $query->where('direction', $request->direction);
        }
        
        // Filter by Category
        if ($request->filled('category') && $request->category !== 'ALL') {
             $query->where('category', $request->category);
        }

        // Clone query for stats
        $statsQuery = clone $query;
        $totalIn = $statsQuery->clone()->where('direction', 'IN')->sum('amount');
        $totalOut = $statsQuery->clone()->where('direction', 'OUT')->sum('amount');

        $cashflows = $query->paginate(20)->appends($request->only(['month', 'year', 'direction', 'category']));
        $balance = Balance::firstOrCreate(['id' => 1], ['current_balance' => 0]);

        return Inertia::render('Admin/Cashflows/Index', [
            'cashflows' => $cashflows,
            'balance' => $balance,
            'stats' => [
                'total_in' => $totalIn,
                'total_out' => $totalOut,
            ],
            'success' => session('success'),
            'filters' => $request->only(['month', 'year', 'direction', 'category']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'direction' => 'required|in:IN,OUT',
            'category' => 'required|string|max:255',
            'amount' => 'required|integer|min:1',
            'description' => 'nullable|string',
            'proof_file' => 'required|image|max:2048', // Enforce proof for manual transactions
        ]);

        DB::transaction(function () use ($request) {
            // Handle File Upload
            $path = null;
            if ($request->hasFile('proof_file')) {
                $path = $request->file('proof_file')->store('cashflow-proofs', 'public');
            }

            // 1. Create Cashflow
            $cashflow = Cashflow::create([
                'source_type' => 'MANUAL',
                'direction' => $request->direction,
                'category' => $request->category,
                'amount' => $request->amount,
                'description' => $request->description,
                'created_by' => auth()->id(),
                'proof_file_path' => $path,
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
