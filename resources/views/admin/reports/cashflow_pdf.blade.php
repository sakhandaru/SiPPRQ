<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Cashflow Report</title>
    <style>
        body { 
            font-family: 'Helvetica', 'Arial', sans-serif; 
            font-size: 12px; 
            color: #333;
            line-height: 1.4;
        }

        /* 1. Header Layout Menggunakan Tabel (Paling Stabil untuk PDF) */
        .header-table {
            width: 100%;
            border-collapse: collapse;
            border-bottom: 2px solid #444; /* Garis bawah header */
            margin-bottom: 20px;
        }
        .header-table td {
            border: none;
            vertical-align: middle; /* Kunci agar logo tidak terlalu ke atas */
            padding-bottom: 15px;
        }
        .logo-cell {
            width: 30%;
        }
        .title-cell {
            width: 70%;
            text-align: right;
        }
        .logo {
            height: 40px; /* Atur tinggi logo di sini */
            display: block;
        }
        .header-title {
            margin: 0;
            font-size: 20px;
            color: #000;
        }
        .header-subtitle {
            margin: 5px 0 0 0;
            font-size: 12px;
            color: #666;
        }

        /* 2. Styling Tabel Data */
        table.data-table {
            width: 100%;
            border-collapse: collapse;
        }
        table.data-table th {
            background-color: #f2f2f2;
            border: 1px solid #ddd;
            padding: 10px 8px;
            text-align: left;
            font-size: 11px;
            text-transform: uppercase;
        }
        table.data-table td {
            border: 1px solid #ddd;
            padding: 8px;
            vertical-align: top;
        }

        /* 3. Warna Indikator */
        .in { color: #28a745; font-weight: bold; }
        .out { color: #dc3545; font-weight: bold; }

        /* 4. Bagian Summary */
        .summary-container {
            margin-top: 30px;
            width: 100%;
        }
        .summary-table {
            width: 250px; /* Lebar box ringkasan */
            margin-left: auto; /* Paksa ke kanan */
            border-collapse: collapse;
        }
        .summary-table td {
            padding: 5px 0;
            border: none;
        }
        .text-right { text-align: right; }
        .border-top { border-top: 1px solid #333 !important; font-weight: bold; padding-top: 8px !important; }
    </style>
</head>
<body>

    <table class="header-table">
        <tr>
            <td class="logo-cell">
                <img src="{{ public_path('logoSiPPRQ.png') }}" alt="Logo" class="logo">
            </td>
            <td class="title-cell">
                <h2 class="header-title">Cashflow Report</h2>
                <p class="header-subtitle">
                    Period: {{ $request->month ? Carbon\Carbon::create()->month((int)$request->month)->format('F') : 'All Months' }} 
                    {{ $request->year ?? 'All Years' }}
                </p>
            </td>
        </tr>
    </table>

    <table class="data-table">
        <thead>
            <tr>
                <th style="width: 12%;">Date</th>
                <th style="width: 15%;">Category</th>
                <th>Description</th>
                <th style="width: 8%;">Type</th>
                <th style="width: 18%;">Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach($data as $row)
            <tr>
                <td>{{ $row->created_at->format('d/m/Y') }}</td>
                <td>{{ $row->category }}</td>
                <td>{{ $row->description }}</td>
                <td class="text-center">
                    <span class="{{ $row->direction == 'IN' ? 'in' : 'out' }}">
                        {{ $row->direction }}
                    </span>
                </td>
                <td class="text-right">Rp {{ number_format($row->amount, 0, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="summary-container">
        <table class="summary-table">
            <tr>
                <td>Total Income</td>
                <td class="text-right"><span class="in">Rp {{ number_format($totalIn, 0, ',', '.') }}</span></td>
            </tr>
            <tr>
                <td>Total Expense</td>
                <td class="text-right"><span class="out">Rp {{ number_format($totalOut, 0, ',', '.') }}</span></td>
            </tr>
            <tr>
                <td class="border-top">Net Change</td>
                <td class="text-right border-top">
                    Rp {{ number_format($totalIn - $totalOut, 0, ',', '.') }}
                </td>
            </tr>
        </table>
    </div>

</body>
</html>