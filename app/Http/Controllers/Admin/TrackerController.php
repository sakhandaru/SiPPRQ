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
        $month = $request->input('month'); // Allow null for all months
        $status = $request->input('status', 'ALL'); // UNPAID, PAID, WAITING
        $type = $request->input('type', 'ALL'); // KAS, WIFI, INCIDENTAL

        // 1. Build Base Query (Filters: Year, Month, Type)
        $baseQuery = Bill::with(['user', 'latestPayment'])
            ->latest('month');

        // Filter by Year
        if ($year) {
            $baseQuery->whereYear('month', $year);
        }

        // Filter by Month
        if ($month) {
            $baseQuery->whereMonth('month', $month);
        }

        // Filter by Type
        if ($type !== 'ALL') {
            $baseQuery->where('type', $type);
        }

        // 2. Calculate Stats based on Base Query (Dynamic but ignoring Status filter)
        $stats = [
            'total_paid' => (clone $baseQuery)->where('status', 'PAID')->count(),
            'total_unpaid' => (clone $baseQuery)->where('status', 'UNPAID')->count(), // Total Unpaid (including waiting)
            'total_waiting' => (clone $baseQuery)->where('status', 'UNPAID')->whereHas('latestPayment', function($q) {
                $q->where('status', 'PENDING');
            })->count(),
        ];

        // 3. Apply Status Filter for the Table View
        $tableQuery = clone $baseQuery;

        if ($status === 'PAID') {
            $tableQuery->where('status', 'PAID');
        } elseif ($status === 'UNPAID') {
            $tableQuery->where('status', 'UNPAID');
        } elseif ($status === 'WAITING') {
            $tableQuery->where('status', 'UNPAID')->whereHas('latestPayment', function($q) {
                $q->where('status', 'PENDING');
            });
        }

        // 4. Pagination
        $bills = $tableQuery->paginate(20)->through(function ($bill) {
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
        })->appends($request->only(['year', 'month', 'status', 'type'])); // Append filters to pagination links

        return Inertia::render('Admin/Tracker/Index', [
            'bills' => $bills,
            'stats' => $stats,
            'filters' => [
                'year' => $year,
                'month' => $month,
                'status' => $status,
                'type' => $type,
            ],
            'users' => \App\Models\User::where('role', 'USER')->where('status', 'AKTIF')->select('id', 'name')->orderBy('name')->get(),
        ]);
    }
}

