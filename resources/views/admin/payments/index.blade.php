<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Admin Payment Verification') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    
                    @if(session('success'))
                        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                            {{ session('success') }}
                        </div>
                    @endif
                    
                    @if(session('error'))
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            {{ session('error') }}
                        </div>
                    @endif

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Bill Month</th>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Proof</th>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                @foreach($payments as $payment)
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ $payment->payment_date }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ $payment->user->name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        @if($payment->bill)
                                            {{ \Carbon\Carbon::parse($payment->bill->month)->format('F Y') }}
                                        @else
                                            -
                                        @endif
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ $payment->type }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap font-mono">Rp {{ number_format($payment->amount, 0, ',', '.') }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            {{ $payment->status === 'VERIFIED' ? 'bg-green-100 text-green-800' : 
                                               ($payment->status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800') }}">
                                            {{ $payment->status }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        @if($payment->proof_image)
                                            <a href="{{ asset('storage/' . $payment->proof_image) }}" target="_blank" class="text-indigo-600 hover:text-indigo-900 underline">Check</a>
                                        @else
                                            <span class="text-gray-400 italic text-xs">File Deleted (Pruned)</span>
                                        @endif
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        @if($payment->status === 'PENDING')
                                            <div class="flex justify-end space-x-2">
                                                <form action="{{ route('admin.payments.verify', $payment->id) }}" method="POST" onsubmit="return confirm('Verify this payment?');">
                                                    @csrf
                                                    <button type="submit" class="text-green-600 hover:text-green-900 font-bold">VERIFY</button>
                                                </form>
                                                <form action="{{ route('admin.payments.reject', $payment->id) }}" method="POST" onsubmit="return confirm('Reject this payment?');">
                                                    @csrf
                                                    <button type="submit" class="text-red-600 hover:text-red-900 font-bold">REJECT</button>
                                                </form>
                                            </div>
                                        @else
                                            <span class="text-gray-400">Processed</span>
                                        @endif
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4">
                        {{ $payments->links() }}
                    </div>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
