<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Admin Reports & Locking') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            
            @if(session('success'))
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    {{ session('success') }}
                </div>
            @endif

            <!-- Close Month Section -->
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <h3 class="text-lg font-medium mb-4">Close Month (Lock Period)</h3>
                    <p class="text-sm text-gray-500 mb-4">Locked periods cannot be modified. No payments can be verified/rejected, and no manual cashflow can be added.</p>
                    
                    <form action="{{ route('admin.periods.lock') }}" method="POST" class="flex gap-4 items-end" onsubmit="return confirm('Are you sure? This action cannot be undone.');">
                        @csrf
                        <div>
                            <x-input-label for="month" :value="__('Month')" />
                            <select name="month" id="month" class="block mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
                                @foreach(range(1, 12) as $m)
                                    <option value="{{ $m }}" {{ now()->month == $m ? 'selected' : '' }}>{{ date('F', mktime(0, 0, 0, $m, 1)) }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div>
                            <x-input-label for="year" :value="__('Year')" />
                            <input type="number" name="year" value="{{ now()->year }}" class="block mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm" min="2020">
                        </div>
                        <x-danger-button>
                            {{ __('Lock Period') }}
                        </x-danger-button>
                    </form>
                </div>
            </div>

            <!-- Reports Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Cashflow Report -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <h3 class="text-lg font-medium mb-4">Cashflow Report</h3>
                        <form action="{{ route('admin.reports.cashflow') }}" method="GET" target="_blank">
                            <input type="hidden" name="export" value="pdf">
                            <div class="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <x-input-label for="cf_month" :value="__('Month')" />
                                    <select name="month" id="cf_month" class="block mt-1 w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700">
                                        <option value="">All</option>
                                        @foreach(range(1, 12) as $m)
                                            <option value="{{ $m }}">{{ date('F', mktime(0, 0, 0, $m, 1)) }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div>
                                    <x-input-label for="cf_year" :value="__('Year')" />
                                    <input type="number" name="year" value="{{ now()->year }}" class="block mt-1 w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700">
                                </div>
                            </div>
                            <x-primary-button>Download PDF</x-primary-button>
                        </form>
                    </div>
                </div>

                <!-- Payment Report -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <h3 class="text-lg font-medium mb-4">Payment Report</h3>
                        <form action="{{ route('admin.reports.payments') }}" method="GET" target="_blank">
                            <input type="hidden" name="export" value="pdf">
                            <div class="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <x-input-label for="p_month" :value="__('Month')" />
                                    <select name="month" id="p_month" class="block mt-1 w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700">
                                        <option value="">All</option>
                                        @foreach(range(1, 12) as $m)
                                            <option value="{{ $m }}">{{ date('F', mktime(0, 0, 0, $m, 1)) }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div>
                                    <x-input-label for="p_year" :value="__('Year')" />
                                    <input type="number" name="year" value="{{ now()->year }}" class="block mt-1 w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700">
                                </div>
                                <div>
                                    <x-input-label for="status" :value="__('Status')" />
                                    <select name="status" class="block mt-1 w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700">
                                        <option value="">All</option>
                                        <option value="VERIFIED">Verified</option>
                                        <option value="PENDING">Pending</option>
                                        <option value="REJECTED">Rejected</option>
                                    </select>
                                </div>
                                <div>
                                    <x-input-label for="type" :value="__('Type')" />
                                    <select name="type" class="block mt-1 w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700">
                                        <option value="">All</option>
                                        <option value="KAS">KAS</option>
                                        <option value="WIFI">WIFI</option>
                                    </select>
                                </div>
                            </div>
                            <x-primary-button>Download PDF</x-primary-button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
