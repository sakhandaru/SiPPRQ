<!DOCTYPE html>
<html>
<head>
    <title>Cashflow Report</title>
    <style>
        body { font-family: sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .header { text-align: center; margin-bottom: 30px; }
        .success { color: green; }
        .danger { color: red; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Cashflow Report</h2>
        <p>Period: {{ $request->month ? date('F', mktime(0, 0, 0, $request->month, 1)) : 'All' }} {{ $request->year ?? '' }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Created By</th>
                <th style="text-align: right">Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach($data as $item)
            <tr>
                <td>{{ $item->created_at->format('Y-m-d H:i') }}</td>
                <td class="{{ $item->direction == 'IN' ? 'success' : 'danger' }}">{{ $item->direction }}</td>
                <td>{{ $item->category }}</td>
                <td>{{ $item->description }}</td>
                <td>{{ $item->creator ? $item->creator->name : '-' }}</td>
                <td style="text-align: right">Rp {{ number_format($item->amount, 0, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="5" style="text-align: right; font-weight: bold;">Total IN</td>
                <td style="text-align: right; font-weight: bold; color: green;">Rp {{ number_format($totalIn, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td colspan="5" style="text-align: right; font-weight: bold;">Total OUT</td>
                <td style="text-align: right; font-weight: bold; color: red;">Rp {{ number_format($totalOut, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td colspan="5" style="text-align: right; font-weight: bold;">Net Flow</td>
                <td style="text-align: right; font-weight: bold;">Rp {{ number_format($totalIn - $totalOut, 0, ',', '.') }}</td>
            </tr>
        </tfoot>
    </table>
</body>
</html>
