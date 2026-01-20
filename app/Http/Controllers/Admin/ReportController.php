<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Reports/Index');
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
            try {
                if (ob_get_length()) {
                    ob_end_clean();
                }
                $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('admin.reports.cashflow_pdf', compact('data', 'totalIn', 'totalOut', 'request'));

                return $pdf->download('cashflow_report.pdf');
            } catch (\Exception $e) {
                return response()->json(['error' => 'PDF Generation Failed: '.$e->getMessage()], 500);
            }
        }

        if ($request->export === 'excel') {
            if (ob_get_length()) {
                ob_end_clean();
            }

            return \Maatwebsite\Excel\Facades\Excel::download(new \App\Exports\CashflowExport($data, $totalIn, $totalOut, $request), 'cashflow_report.xlsx');
        }

        return view('admin.reports.cashflow_pdf', compact('data', 'totalIn', 'totalOut', 'request')); // Preview
    }

    public function payments(Request $request)
    {
        $query = \App\Models\KasPayment::with('user');

        if ($request->filled('month')) {
            $query->whereMonth('payment_date', $request->month);
        }
        if ($request->filled('year')) {
            $query->whereYear('payment_date', $request->year);
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->type) {
            $query->where('type', $request->type);
        }

        $data = $query->latest()->get();

        if ($request->export === 'pdf') {
            try {
                if (ob_get_length()) {
                    ob_end_clean();
                }
                $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('admin.reports.payments_pdf', compact('data', 'request'));

                return $pdf->download('payments_report.pdf');
            } catch (\Exception $e) {
                return response()->json(['error' => 'PDF Generation Failed: '.$e->getMessage()], 500);
            }
        }

        if ($request->export === 'excel') {
            if (ob_get_length()) {
                ob_end_clean();
            }

            return \Maatwebsite\Excel\Facades\Excel::download(new \App\Exports\PaymentsExport($data, $request), 'payments_report.xlsx');
        }

        return view('admin.reports.payments_pdf', compact('data', 'request')); // Preview
    }
}
