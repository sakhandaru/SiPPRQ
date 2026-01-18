<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    {{ __("You're logged in!") }}
                    
                    @if(auth()->user()->role === 'ADMIN' && isset($data['balance']))
                    <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                         <!-- Balance Card -->
                        <div class="bg-indigo-50 dark:bg-indigo-900 p-6 rounded-lg border border-indigo-100 dark:border-indigo-700">
                            <h3 class="text-sm font-medium text-indigo-500 dark:text-indigo-300 uppercase tracking-wider">Current Balance</h3>
                            <div class="mt-2 text-3xl font-bold text-indigo-700 dark:text-indigo-200">
                                Rp {{ number_format($data['balance']->current_balance, 0, ',', '.') }}
                            </div>
                        </div>

                        <!-- Total In Card -->
                        <div class="bg-green-50 dark:bg-green-900 p-6 rounded-lg border border-green-100 dark:border-green-700">
                            <h3 class="text-sm font-medium text-green-500 dark:text-green-300 uppercase tracking-wider">Total Income</h3>
                            <div class="mt-2 text-3xl font-bold text-green-700 dark:text-green-200">
                                + Rp {{ number_format($data['total_in'], 0, ',', '.') }}
                            </div>
                        </div>

                        <!-- Total Out Card -->
                        <div class="bg-red-50 dark:bg-red-900 p-6 rounded-lg border border-red-100 dark:border-red-700">
                            <h3 class="text-sm font-medium text-red-500 dark:text-red-300 uppercase tracking-wider">Total Expense</h3>
                            <div class="mt-2 text-3xl font-bold text-red-700 dark:text-red-200">
                                - Rp {{ number_format($data['total_out'], 0, ',', '.') }}
                            </div>
                        </div>
                    </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
