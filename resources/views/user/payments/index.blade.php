<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('My Payments & Bills') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            
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

            <!-- Bills List -->
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <h3 class="text-lg font-medium mb-4">Monthly Bills</h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Month</th>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                @forelse($bills as $bill)
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ \Carbon\Carbon::parse($bill->month)->format('F Y') }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ $bill->type }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap font-mono">Rp {{ number_format($bill->amount, 0, ',', '.') }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            {{ $bill->status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                            {{ $bill->status }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right">
                                        @if($bill->status === 'UNPAID')
                                            @php
                                                // Check if there is a pending payment for this bill
                                                $pendingPayment = $bill->payments->where('status', 'PENDING')->first();
                                            @endphp
                                            
                                            @if($pendingPayment)
                                                <span class="text-yellow-600 font-medium text-sm">Waiting Verification</span>
                                            @else
                                                <button onclick="openPaymentModal({{ $bill->id }}, '{{ $bill->type }}', {{ $bill->amount }})" class="text-indigo-600 hover:text-indigo-900 font-bold">
                                                    Pay Now
                                                </button>
                                            @endif
                                        @else
                                            <span class="text-gray-400 text-sm">Paid</span>
                                        @endif
                                    </td>
                                </tr>
                                @empty
                                <tr>
                                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">No bills generated yet.</td>
                                </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Payment Modal -->
            <div id="paymentModal" class="fixed inset-0 z-50 hidden overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onclick="closePaymentModal()"></div>
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="modal-title">Upload Payment Proof</h3>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500 mb-4" id="modal-desc"></p>
                                <form id="paymentForm" action="{{ route('user.payments.store') }}" method="POST" enctype="multipart/form-data">
                                    @csrf
                                    <input type="hidden" name="bill_id" id="bill_id">
                                    
                                    <div>
                                        <x-input-label for="proof_image" :value="__('Proof (Image)')" />
                                        <input id="proof_image" type="file" name="proof_image" class="block mt-1 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" required accept="image/*">
                                    </div>

                                    <div class="mt-4 flex justify-end">
                                        <button type="button" onclick="closePaymentModal()" class="mr-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                                        <x-primary-button>
                                            {{ __('Submit') }}
                                        </x-primary-button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                function openPaymentModal(id, type, amount) {
                    document.getElementById('paymentModal').classList.remove('hidden');
                    document.getElementById('bill_id').value = id;
                    document.getElementById('modal-desc').innerText = `Paying for ${type} - Rp ${amount.toLocaleString('id-ID')}`;
                }

                function closePaymentModal() {
                    document.getElementById('paymentModal').classList.add('hidden');
                }
            </script>

        </div>
    </div>
</x-app-layout>
