<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class CashflowExport implements FromView, ShouldAutoSize
{
    protected $data;

    protected $totalIn;

    protected $totalOut;

    protected $request;

    public function __construct($data, $totalIn, $totalOut, $request)
    {
        $this->data = $data;
        $this->totalIn = $totalIn;
        $this->totalOut = $totalOut;
        $this->request = $request;
    }

    public function view(): View
    {
        return view('admin.reports.cashflow_pdf', [
            'data' => $this->data,
            'totalIn' => $this->totalIn,
            'totalOut' => $this->totalOut,
            'request' => $this->request,
        ]);
    }
}
