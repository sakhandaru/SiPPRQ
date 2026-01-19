<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackerController extends Controller
{
    public function index(Request $request)
    {
        $year = $request->input('year', now()->year);
        $month = $request->input('month', now()->month);
        $filterStatus = $request->input('status', 'ALL');
        
        // Format to YYYY-MM-01 for database comparison
        $targetMonth = \Carbon\Carbon::createFromDate($year, $month, 1)->format('Y-m-d');

        $users = User::where('role', 'USER')
            ->where('status', 'AKTIF')
            ->orderBy('name')
            ->with(['monthlyBills' => function ($query) use ($targetMonth) {
                $query->where('month', $targetMonth); 
            }, 'monthlyBills.latestPayment'])
            ->get()
            ->map(function ($user) use ($targetMonth) {
                // Determine KAS Bill Status
                $kasBill = $user->monthlyBills->firstWhere('type', 'KAS');
                
                $status = 'NO_BILL';
                $paymentId = null;

                if ($kasBill) {
                    if ($kasBill->status === 'PAID') {
                        $status = 'PAID';
                    } elseif ($kasBill->latestPayment && $kasBill->latestPayment->status === 'PENDING') {
                        $status = 'WAITING';
                        $paymentId = $kasBill->latestPayment->id;
                    } else {
                        $status = 'UNPAID';
                    }
                }

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'status' => $status,
                    'payment_id' => $paymentId,
                    'bill_amount' => $kasBill ? $kasBill->amount : 0,
                    'bill_month_name' => \Carbon\Carbon::parse($targetMonth)->translatedFormat('F Y'),
                ];
            });

        // Calculate Stats
        $stats = [
            'total_users' => $users->count(),
            'paid' => $users->where('status', 'PAID')->count(),
            'waiting' => $users->where('status', 'WAITING')->count(),
            'unpaid' => $users->where('status', 'UNPAID')->count(),
        ];

        // Apply Filter
        if ($filterStatus !== 'ALL') {
            $users = $users->where('status', $filterStatus)->values();
        }

        return Inertia::render('Admin/Tracker/Index', [
            'users' => $users,
            'stats' => $stats,
            'filters' => [
                'year' => (int)$year,
                'month' => (int)$month,
                'status' => $filterStatus,
            ]
        ]);
    }
}
