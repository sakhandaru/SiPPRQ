<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PeriodLockController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:2020',
        ]);

        \App\Models\PeriodLock::create([
            'month' => $request->month,
            'year' => $request->year,
            'locked_at' => now(),
            'locked_by' => auth()->id(),
        ]);

        \App\Services\AuditService::log('LOCK_PERIOD', 'PeriodLock', null, "Locked period {$request->month}/{$request->year}");

        return back()->with('success', 'Period locked successfully.');
    }
}
