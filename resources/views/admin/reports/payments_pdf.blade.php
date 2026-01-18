<!DOCTYPE html>
<html>
<head>
    <title>Payment Report</title>
    <style>
        body { font-family: sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .header { text-align: center; margin-bottom: 30px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Payment Report</h2>
        <p>Period: {{ $request->month ? date('F', mktime(0, 0, 0, $request->month, 1)) : 'All' }} {{ $request->year ?? '' }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>User</th>
                <th>Type</th>
                <th>Status</th>
                <th>Verified By</th>
                <th style="text-align: right">Amount</th>
            </tr>
        </thead>
        <tbody>
            @php $total = 0; @endphp
            @foreach($data as $item)
            <tr>
                <td>{{ $item->payment_date }}</td>
                <td>{{ $item->user->name }}</td>
                <td>{{ $item->type }}</td>
                <td>{{ $item->status }}</td>
                <td>{{ $item->verified_at ? $item->verifier->name . ' (' . \Carbon\Carbon::parse($item->verified_at)->format('Y-m-d') . ')' : '-' }}</td>
                <td style="text-align: right">Rp {{ number_format($item->amount, 0, ',', '.') }}</td>
            </tr>
            @php 
                if($item->status == 'VERIFIED') $total += $item->amount; 
            @endphp
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="5" style="text-align: right; font-weight: bold;">Total Verified Amount</td>
                <td style="text-align: right; font-weight: bold;">Rp {{ number_format($total, 0, ',', '.') }}</td>
            </tr>
        </tfoot>
    </table>
</body>
</html>
