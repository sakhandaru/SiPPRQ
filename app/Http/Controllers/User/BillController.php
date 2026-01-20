<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\BillService;
use Illuminate\Http\Request;

class BillController extends Controller
{
    protected $billService;

    public function __construct(BillService $billService)
    {
        $this->billService = $billService;
    }

    public function store(Request $request)
    {
        $request->validate([
            'year' => 'required|integer|min:2025|max:2030',
            'month' => 'required|integer|min:1|max:12',
        ]);

        // Prevent generating bills for past months?
        // Logic: if requested date < current month, maybe allow for filling gaps?
        // But the feature is "Future Bill". Let's leniently allow any date,
        // as the service uses firstOrCreate, so it won't duplicate.

        $this->billService->generateForUser(auth()->user(), $request->year, $request->month);

        return back()->with('success', 'Bill generated successfully. You can now proceed to payment.');
    }
}
