<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Bill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackerController extends Controller
{
    public function index(Request $request)
    {
        $year = $request->input('year', now()->year);
        $month = $request->input('month', now()->month);
        $status = $request->input('status', 'ALL'); // UNPAID, PAID, WAITING
        $type = $request->input('type', 'ALL'); // KAS, WIFI, INCIDENTAL

        $query = Bill::with(['user', 'latestPayment'])
            ->latest('month');

        // Filter by Year (Optional: if empty, show all)
        if ($year) {
            $query->whereYear('month', $year);
        }

        // Filter by Month (Optional: if empty, show all)
        if ($month) {
            $query->whereMonth('month', $month);
        }

        // Filter by Type
        if ($type !== 'ALL') {
            $query->where('type', $type);
        }

        // Filter by Status
        // Note: Status in DB is 'UNPAID' or 'PAID'. 
        // 'WAITING' is a derived state (UNPAID + has PENDING payment).
        // Since we can't easily query derived state without complex subqueries, 
        // we'll filter 'PAID' and 'UNPAID' at DB level, 
        // but 'WAITING' might need post-filtering or a whereHas check.
        
        if ($status === 'PAID') {
            $query->where('status', 'PAID');
        } elseif ($status === 'UNPAID') {
            $query->where('status', 'UNPAID');
        } elseif ($status === 'WAITING') {
            $query->where('status', 'UNPAID')->whereHas('latestPayment', function($q) {
                $q->where('status', 'PENDING');
            });
        }

        // Pagination
        $bills = $query->paginate(20)->through(function ($bill) {
            // Determine display status
            $displayStatus = $bill->status; // PAID or UNPAID
            if ($bill->status === 'UNPAID' && $bill->latestPayment && $bill->latestPayment->status === 'PENDING') {
                $displayStatus = 'WAITING';
            }

            return [
                'id' => $bill->id,
                'resident_name' => $bill->user ? $bill->user->name : 'Unknown User',
                'resident_phone' => $bill->user ? $bill->user->phone : null,
                'type' => $bill->type,
                'title' => $bill->title ?? $bill->type,
                'amount' => $bill->amount,
                'month_name' => \Carbon\Carbon::parse($bill->month)->translatedFormat('F Y'),
                'status' => $displayStatus,
                'payment_id' => $bill->latestPayment ? $bill->latestPayment->id : null,
            ];
        });

        // Stats (Global or Filtered? Let's do Global for current view context)
        // Actually, stats should reflect the current filter context to be useful
        // But for "Dashboard" like stats, maybe global UNPAID count is more useful?
        // Let's keep it simple: Stats for *current filtered view* might be confusing if paginated.
        // Let's show Global Stats for Current Month by default? Or just totals from the query?
        // Let's return totals for the current filter scope (ignoring pagination).
        
        // Re-instantiate query for stats to avoid messing up pagination
        // Optimization: This might be heavy if many records. Let's do simple global stats for now.
        $stats = [
            'total_unpaid' => Bill::where('status', 'UNPAID')->count(),
            'total_waiting' => Bill::where('status', 'UNPAID')->whereHas('latestPayment', function($q){ $q->where('status', 'PENDING'); })->count(),
        ];

        return Inertia::render('Admin/Tracker/Index', [
            'bills' => $bills,
            'stats' => $stats,
            'filters' => [
                'year' => $year,
                'month' => $month,
                'status' => $status,
                'type' => $type,
            ],
            'users' => \App\Models\User::where('role', 'USER')->where('status', 'AKTIF')->select('id', 'name')->orderBy('name')->get(), // For Manual Bill Creation
        ]);
    }
}
