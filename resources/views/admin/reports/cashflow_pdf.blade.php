<!DOCTYPE html>
<html>
<head>
    <title>Cashflow Report</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .header { text-align: center; margin-bottom: 30px; }
        .summary { margin-top: 20px; text-align: right; font-weight: bold; }
        .in { color: green; }
        .out { color: red; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Cashflow Report</h2>
        <p>
            Period: {{ $request->month ? Carbon\Carbon::create()->month($request->month)->format('F') : 'All Months' }} 
            {{ $request->year ?? 'All Years' }}
        </p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach($data as $row)
            <tr>
                <td>{{ $row->created_at->format('d/m/Y') }}</td>
                <td>{{ $row->category }}</td>
                <td>{{ $row->description }}</td>
                <td><span class="{{ $row->direction == 'IN' ? 'in' : 'out' }}">{{ $row->direction }}</span></td>
                <td>Rp {{ number_format($row->amount, 0, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="summary">
        <p>Total Income: <span class="in">Rp {{ number_format($totalIn, 0, ',', '.') }}</span></p>
        <p>Total Expense: <span class="out">Rp {{ number_format($totalOut, 0, ',', '.') }}</span></p>
        <p>Net Change: Rp {{ number_format($totalIn - $totalOut, 0, ',', '.') }}</p>
    </div>
</body>
</html>
