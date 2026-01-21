<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Payments Report - SiPPRQ</title>
    <style>
        /* 1. RESET & PRINT CONFIG */
        @page { margin: 1.2cm; }
        body { 
            font-family: 'Helvetica', 'Arial', sans-serif; 
            font-size: 10px; 
            color: #18181b; 
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }

        /* 2. HEADER */
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
        }
        .header-table td { vertical-align: bottom; }
        .logo { height: 32px; }
        
        .report-label {
            font-size: 8px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: #10b981; 
            margin-bottom: 6px;
            display: block;
        }
        .report-title {
            font-family: 'Georgia', serif; 
            font-size: 26px;
            font-style: italic;
            font-weight: normal;
            margin: 0;
            color: #18181b;
            letter-spacing: -1px;
        }
        .period-info {
            font-size: 10px;
            color: #71717a; 
            text-transform: uppercase;
            font-weight: bold;
            margin-top: 5px;
        }

        /* 3. DATA TABLE */
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .data-table th {
            border-bottom: 1.5px solid #18181b;
            padding: 12px 8px;
            text-align: left;
            font-size: 9px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #18181b;
        }
        .data-table td {
            padding: 12px 8px;
            border-bottom: 1px solid #f4f4f5; 
            vertical-align: middle;
        }

        /* 4. STATUS BADGES & TYPOGRAPHY */
        .status-badge {
            font-size: 8px;
            font-weight: 900;
            text-transform: uppercase;
            padding: 4px 8px;
            border-radius: 4px;
            letter-spacing: 0.5px;
        }
        .status-verified { background-color: #ecfdf5; color: #059669; }
        .status-pending { background-color: #fffbeb; color: #d97706; }
        .status-rejected { background-color: #fef2f2; color: #dc2626; }

        .font-mono { font-family: 'Courier', monospace; }
        .font-bold { font-weight: bold; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }

        /* 5. SUMMARY BOX - CLASSICAL LEDGER STYLE */
        .summary-wrapper {
            margin-top: 50px;
            width: 100%;
            page-break-inside: avoid;
        }
        .summary-table {
            width: 320px; 
            margin-left: auto;
            border-collapse: collapse;
        }
        .summary-table td {
            padding: 10px 15px;
            border: none;
        }
        .summary-label-classic {
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            color: #71717a; 
            letter-spacing: 1px;
        }
        .total-amount-label {
            font-family: 'Georgia', serif;
            font-size: 12px;
            font-style: italic;
            color: #18181b;
        }
        /* Double underline for final total */
        .border-finalize {
            border-top: 1px solid #e4e4e7;
            border-bottom: 3px double #18181b; 
            padding: 15px 15px !important;
        }
        .text-emerald-deep {
            color: #065f46; 
            font-weight: 900;
        }

        /* 6. FOOTER */
        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            padding: 20px 0;
            text-align: center;
            border-top: 1px dashed #e4e4e7;
            font-size: 8px;
            color: #a1a1aa;
        }
        .copyright {
            color: #c7c7c7;
        }
    </style>
</head>
<body>

    <table class="header-table">
        <tr>
            <td>
                <img src="{{ public_path('logoSiPPRQ.png') }}" alt="Logo" class="logo">
            </td>
            <td class="text-right">
                <span class="report-label">PPRQ Annasimiyyah</span>
                <h1 class="report-title">Laporan <span style="color: #10b981;">Pembayaran</span></h1>
                <div class="period-info">
                    {{ $request->month ? Carbon\Carbon::create()->month((int)$request->month)->format('F') : 'Global' }} 
                    {{ $request->year ?? 'Records' }}
                </div>
            </td>
        </tr>
    </table>

    <table class="data-table">
        <thead>
            <tr>
                <th style="width: 12%;">Tanggal</th>
                <th>Nama Santri / User</th>
                <th style="width: 15%;">Unit</th>
                <th style="width: 20%; text-align: right;">Jumlah (IDR)</th>
                <th style="width: 15%; text-align: center;">Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($data as $row)
            <tr>
                <td>
                    <div class="font-bold">{{ $row->created_at->format('d M Y') }}</div>
                    <div style="font-size: 8px; color: #a1a1aa; margin-top: 2px;">{{ $row->created_at->format('H:i') }}</div>
                </td>
                <td>
                    <div class="font-bold" style="color: #3f3f46; text-transform: uppercase; letter-spacing: 0.5px;">
                        {{ $row->user->name ?? 'User Tidak Ditemukan' }}
                    </div>
                </td>
                <td>
                    <span style="font-weight: bold; color: #71717a;">{{ $row->type }}</span>
                </td>
                <td class="text-right font-mono font-bold" style="font-size: 11px;">
                    {{ number_format($row->amount, 0, ',', '.') }}
                </td>
                <td class="text-center">
                    <span class="status-badge {{ 
                        $row->status === 'VERIFIED' ? 'status-verified' : 
                        ($row->status === 'PENDING' ? 'status-pending' : 'status-rejected') 
                    }}">
                        {{ $row->status }}
                    </span>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="summary-wrapper">
        <table class="summary-table">
            <tr>
                <td class="summary-label-classic text-right">Jumlah Transaksi</td>
                <td class="text-right font-bold" style="font-size: 11px;">{{ $data->count() }} Data</td>
            </tr>
            <tr>
                <td class="total-amount-label text-right border-finalize">
                    Total Dana Diterima
                </td>
                <td class="text-right font-mono border-finalize text-emerald-deep" style="font-size: 16px;">
                    Rp {{ number_format($data->sum('amount'), 0, ',', '.') }}
                </td>
            </tr>
        </table>
    </div>

    <div class="footer">
        Generated by SiPPRQ Intelligent Terminal • {{ now()->format('d/m/Y H:i:s') }} <br>
        Copyright <span class="copyright">@sakhandaru</span>
    </div>

</body>
</html>