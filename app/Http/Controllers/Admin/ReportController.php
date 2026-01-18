<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index()
    {
        return view('admin.reports.index');
    }

    public function cashflow(Request $request)
    {
        $query = \App\Models\Cashflow::query();

        if ($request->month) {
            $query->whereMonth('created_at', $request->month);
        }
        if ($request->year) {
            $query->whereYear('created_at', $request->year);
        }

        $data = $query->latest()->get();
        $totalIn = $data->where('direction', 'IN')->sum('amount');
        $totalOut = $data->where('direction', 'OUT')->sum('amount');

        if ($request->export === 'pdf') {
            $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('admin.reports.cashflow_pdf', compact('data', 'totalIn', 'totalOut', 'request'));
            return $pdf->download('cashflow_report.pdf');
        }

        // Add Excel logic here if needed, for now PDF is primary request
        return view('admin.reports.cashflow_pdf', compact('data', 'totalIn', 'totalOut', 'request')); // Preview
    }

    public function payments(Request $request) 
    {
        $query = \App\Models\KasPayment::with('user');

        if ($request->month && $request->year) {
            // Filter based on Bill Month if linked, or Payment Date
            // Best to use Payment Date for actual money received report
            $query->whereMonth('payment_date', $request->month)
                  ->whereYear('payment_date', $request->year);
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }
        
        if ($request->type) {
            $query->where('type', $request->type);
        }

        $data = $query->latest()->get();

        if ($request->export === 'pdf') {
            $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('admin.reports.payments_pdf', compact('data', 'request'));
            return $pdf->download('payments_report.pdf');
        }

        return view('admin.reports.payments_pdf', compact('data', 'request')); // Preview
    }
}
