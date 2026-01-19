<?php

namespace App\Http\Controllers\Admin;

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

    public function generate(Request $request)
    {
        $request->validate([
            'year' => 'required|integer|min:2024|max:2030',
            'month' => 'required|integer|min:1|max:12',
        ]);

        $result = $this->billService->generateForMonth($request->year, $request->month);
        
        $monthName = \Carbon\Carbon::createFromDate($request->year, $request->month, 1)->translatedFormat('F Y');

        return back()->with('success', "Generate Bill for {$monthName} success! ({$result['users_count']} users processed)");
    }
}
