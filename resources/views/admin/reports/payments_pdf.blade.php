<!DOCTYPE html>
<html>
<head>
    <title>Payments Report</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .header { text-align: center; margin-bottom: 30px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Payments Report</h2>
        <p>
            Period: {{ $request->month ? Carbon\Carbon::create()->month($request->month)->format('F') : 'All Months' }} 
            {{ $request->year ?? 'All Years' }}
        </p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($data as $row)
            <tr>
                <td>{{ $row->created_at->format('d/m/Y') }}</td>
                <td>{{ $row->user->name ?? 'Deleted User' }}</td>
                <td>{{ $row->type }}</td>
                <td>Rp {{ number_format($row->amount, 0, ',', '.') }}</td>
                <td>{{ $row->status }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="summary" style="margin-top: 20px; text-align: right; font-weight: bold;">
        <p>Total Records: {{ $data->count() }}</p>
        <p>Total Amount: Rp {{ number_format($data->sum('amount'), 0, ',', '.') }}</p>
    </div>
</body>
</html>
