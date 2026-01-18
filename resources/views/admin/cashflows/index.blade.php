<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Cashflow Management') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            
            <!-- Global Balance Card -->
             <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
                <div class="p-6 text-gray-900 dark:text-gray-100 flex items-center justify-between">
                    <div>
                        <h3 class="text-xl font-bold">Current Global Balance</h3>
                        <p class="text-sm text-gray-500">Real-time accumulated balance from all transactions.</p>
                    </div>
                    <div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        Rp {{ number_format($balance->current_balance ?? 0, 0, ',', '.') }}
                    </div>
                </div>
            </div>

            <!-- Manual Entry Form -->
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <h3 class="text-lg font-medium mb-4">Record Manual Transaction</h3>
                    
                    @if(session('success'))
                        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                            {{ session('success') }}
                        </div>
                    @endif

                    <form action="{{ route('admin.cashflows.store') }}" method="POST">
                        @csrf
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <x-input-label for="direction" :value="__('Direction')" />
                                <select id="direction" name="direction" class="block mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
                                    <option value="OUT">Pengeluaran (OUT)</option>
                                    <option value="IN">Pemasukan (IN)</option>
                                </select>
                            </div>
                            
                            <div>
                                <x-input-label for="amount" :value="__('Amount (Rp)')" />
                                <x-text-input id="amount" class="block mt-1 w-full" type="number" name="amount" required min="1" />
                            </div>

                            <div>
                                <x-input-label for="category" :value="__('Category')" />
                                <x-text-input id="category" class="block mt-1 w-full" type="text" name="category" required placeholder="e.g. Listrik, Air, Kebersihan" />
                            </div>

                            <div>
                                <x-input-label for="description" :value="__('Description')" />
                                <x-text-input id="description" class="block mt-1 w-full" type="text" name="description" placeholder="Optional details" />
                            </div>
                        </div>

                        <div class="mt-4 flex justify-end">
                            <x-primary-button>
                                {{ __('Record Transaction') }}
                            </x-primary-button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Cashflow History -->
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <h3 class="text-lg font-medium mb-4">Transaction History</h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">By</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                @foreach($cashflows as $flow)
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ $flow->created_at->format('Y-m-d H:i') }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            {{ $flow->direction === 'IN' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                            {{ $flow->direction }}
                                        </span>
                                        <span class="ml-2 text-xs text-gray-500">({{ $flow->source_type }})</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ $flow->category }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap font-mono">Rp {{ number_format($flow->amount, 0, ',', '.') }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $flow->creator->name }}</td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4">
                        {{ $cashflows->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
