<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Cashflow Report - SiPPRQ</title>
    <style>
        /* 1. BASE CONFIG & FONTS */
        @page { margin: 1.2cm; }
        body { 
            font-family: 'Helvetica', 'Arial', sans-serif; 
            font-size: 10px; 
            color: #18181b; /* Zinc 900 */
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }

        /* 2. SOPHISTICATED HEADER */
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 45px;
        }
        .header-table td { vertical-align: bottom; }
        .logo { height: 32px; }
        
        .report-title {
            font-family: 'Georgia', serif; 
            font-size: 26px;
            font-style: italic;
            font-weight: normal;
            margin: 0;
            color: #18181b;
            letter-spacing: -1px;
        }
        .report-label {
            font-size: 8px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: #10b981; /* Emerald 500 */
            margin-bottom: 6px;
            display: block;
        }
        .period-info {
            font-size: 10px;
            color: #71717a; /* Zinc 400 */
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 0.5px;
        }

        /* 3. CLEAN DATA TABLE */
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .data-table th {
            border-bottom: 1.5px solid #18181b; /* Thicker hairline for header */
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
            border-bottom: 1px solid #f4f4f5; /* Zinc 100 */
            vertical-align: top;
        }

        /* 4. TYPOGRAPHY & UTILITIES */
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-mono { font-family: 'Courier', monospace; } /* Better for numbers */
        
        .badge-in { color: #059669; font-weight: bold; }
        .badge-out { color: #e11d48; font-weight: bold; }
        
        .desc-text {
            color: #52525b;
            font-size: 9px;
            line-height: 1.4;
            display: block;
            margin-top: 4px;
        }

        /* 5. BENTO SUMMARY BOX */
        .summary-container {
            width: 100%;
            margin-top: 20px;
        }
        .summary-table {
            width: 260px;
            margin-left: auto;
            border-collapse: collapse;
        }
        .summary-table td {
            padding: 8px 0;
        }
        .summary-label {
            font-size: 8px;
            font-weight: 900;
            text-transform: uppercase;
            color: #a1a1aa;
            letter-spacing: 1px;
        }
        .net-row td {
            border-top: 1.5px solid #18181b;
            padding-top: 12px;
            font-weight: 900;
            font-size: 12px;
        }

        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            font-size: 8px;
            color: #d4d4d8;
            text-align: center;
            padding: 20px 0;
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
                <h1 class="report-title">Cashflow <span style="color: #10b981;">Intelligence</span></h1>
                <div class="period-info" style="margin-top: 5px;">
                    {{ $request->month ? Carbon\Carbon::create()->month((int)$request->month)->format('F') : 'Annual' }} 
                    {{ $request->year ?? 'Records' }}
                </div>
            </td>
        </tr>
    </table>

    <table class="data-table">
        <thead>
            <tr>
                <th style="width: 15%;">Date / Time</th>
                <th style="width: 18%;">Category</th>
                <th>Objective Details</th>
                <th style="width: 8%; text-align: center;">Flow</th>
                <th style="width: 20%; text-align: right;">Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach($data as $row)
            <tr>
                <td>
                    <div style="font-weight: bold;">{{ $row->created_at->format('d M Y') }}</div>
                    <div style="font-size: 8px; color: #a1a1aa;">{{ $row->created_at->format('H:i') }}</div>
                </td>
                <td style="font-weight: bold;">{{ $row->category }}</td>
                <td>
                    <div style="color: #18181b; font-weight: bold;">{{ $row->category }} Transaction</div>
                    <span class="desc-text italic">
                        {{ $row->description ?? 'No additional description provided.' }}
                    </span>
                </td>
                <td class="text-center">
                    <span class="{{ $row->direction == 'IN' ? 'badge-in' : 'badge-out' }}">
                        {{ $row->direction }}
                    </span>
                </td>
                <td class="text-right font-mono" style="font-size: 11px; font-weight: bold;">
                    {{ $row->direction == 'IN' ? '+' : '-' }} {{ number_format($row->amount, 0, ',', '.') }}
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="summary-container">
        <table class="summary-table">
            <tr>
                <td class="summary-label">Total Inflow</td>
                <td class="text-right font-mono badge-in" style="font-size: 11px;">+ {{ number_format($totalIn, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="summary-label">Total Outflow</td>
                <td class="text-right font-mono badge-out" style="font-size: 11px;">- {{ number_format($totalOut, 0, ',', '.') }}</td>
            </tr>
            <tr class="net-row">
                <td style="text-transform: uppercase; letter-spacing: 1px;">Net Change</td>
                <td class="text-right font-mono">
                    Rp {{ number_format($totalIn - $totalOut, 0, ',', '.') }}
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