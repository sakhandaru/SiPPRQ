<x-app-layout>
    <div class="max-w-xl mx-auto px-4 py-8 space-y-8">
        
        <!-- 1. HEADER -->
        <div class="space-y-1">
            <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
                Hello, {{ $user->name }}
            </h1>
            <p class="text-gray-500 dark:text-gray-400">
                Here’s your current billing status
            </p>
        </div>

        @if(session('success'))
            <div class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {{ session('success') }}
            </div>
        @endif
        @if(session('error'))
            <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {{ session('error') }}
            </div>
        @endif

        <!-- 2. CURRENT MONTH STATUS -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
            <h2 class="font-semibold text-gray-900 dark:text-white">Current Month ({{ now()->format('F Y') }})</h2>
            
            <div class="space-y-4">
                @php
                    $hasUnpaid = false;
                    $billTypes = ['KAS' => 125000, 'WIFI' => 30000]; // Default fallback if no bill generated yet
                @endphp

                <!-- KAS -->
                @php 
                    $kasBill = $currentBills->where('type', 'KAS')->first();
                    if ($kasBill && $kasBill->status === 'UNPAID') $hasUnpaid = true;
                @endphp
                <div class="flex justify-between items-center">
                    <div>
                        <div class="text-sm font-medium text-gray-900 dark:text-white">KAS</div>
                        <div class="text-sm text-gray-500">Rp {{ number_format($kasBill ? $kasBill->amount : 125000, 0, ',', '.') }}</div>
                    </div>
                    @if($kasBill)
                        <x-status-badge :status="$kasBill->status" />
                    @else
                        <span class="text-xs text-gray-400">Coming Soon</span>
                    @endif
                </div>

                <div class="border-t border-gray-100 dark:border-gray-700"></div>

                <!-- WIFI -->
                @php 
                    $wifiBill = $currentBills->where('type', 'WIFI')->first();
                    if ($wifiBill && $wifiBill->status === 'UNPAID') $hasUnpaid = true;
                @endphp
                <div class="flex justify-between items-center">
                    <div>
                        <div class="text-sm font-medium text-gray-900 dark:text-white">WIFI</div>
                        <div class="text-sm text-gray-500">Rp {{ number_format($wifiBill ? $wifiBill->amount : 30000, 0, ',', '.') }}</div>
                    </div>
                    @if($wifiBill)
                        <x-status-badge :status="$wifiBill->status" />
                    @else
                         <span class="text-xs text-gray-400">Coming Soon</span>
                    @endif
                </div>
            </div>

            @if($hasUnpaid)
                <div x-data="{ open: false }">
                    <button @click="open = true" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition">
                        Pay Now
                    </button>

                    <!-- MODAL -->
                    <div x-show="open" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" style="display: none;">
                        <div @click.away="open = false" class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-sm w-full p-6 space-y-4">
                            <h3 class="font-semibold text-lg text-gray-900 dark:text-white">Upload Payment Proof</h3>
                            <p class="text-sm text-gray-500">Please upload transfer proof. Amount is fixed.</p>
                            
                            <form action="{{ route('user.payments.store') }}" method="POST" enctype="multipart/form-data" class="space-y-4">
                                @csrf
                                <!-- Select Bill to Pay -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Bill</label>
                                    <select name="bill_id" class="w-full rounded-lg border-gray-300 dark:bg-gray-700 dark:border-gray-600">
                                        @foreach($currentBills->where('status', 'UNPAID') as $bill)
                                            <option value="{{ $bill->id }}">
                                                {{ $bill->type }} (Rp {{ number_format($bill->amount, 0, ',', '.') }})
                                            </option>
                                        @endforeach
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proof Image</label>
                                    <input type="file" name="proof_image" accept="image/*" required class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                                </div>

                                <div class="flex gap-3">
                                    <button type="button" @click="open = false" class="flex-1 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                                    <button type="submit" class="flex-1 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            @else
                 <div class="flex items-center justify-center text-green-600 text-sm font-medium gap-2 bg-green-50 p-3 rounded-lg">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    All bills paid
                </div>
            @endif
        </div>

        <!-- 3. TRANSFER INFO -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Transfer Information</h3>
            <div class="space-y-1">
                <div class="font-medium text-gray-900 dark:text-white">Bank BCA</div>
                <div class="text-2xl font-semibold text-gray-900 dark:text-white tracking-widest">123 456 7890</div>
                <div class="text-gray-500">a.n. Bendahara Asrama</div>
            </div>
        </div>

        <!-- 4. HISTORY -->
        <details class="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <summary class="flex justify-between items-center p-6 cursor-pointer list-none font-semibold text-gray-900 dark:text-white">
                Payment History
                <span class="transition group-open:rotate-180">
                    <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </summary>
            <div class="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
                <div class="mt-4 space-y-4">
                    @forelse($historyBills as $bill)
                    <div class="flex justify-between items-start text-sm">
                        <div>
                            <div class="font-medium text-gray-900 dark:text-white">{{ \Carbon\Carbon::parse($bill->month)->format('M Y') }}</div>
                            <div class="text-gray-500">{{ $bill->type }}</div>
                        </div>
                        <x-status-badge :status="$bill->status" />
                    </div>
                    @empty
                    <p class="text-gray-500 text-center">No history yet.</p>
                    @endforelse
                </div>
            </div>
        </details>

        <!-- 5. PROFILE -->
        <details class="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <summary class="flex justify-between items-center p-6 cursor-pointer list-none font-semibold text-gray-900 dark:text-white">
                Profile Summary
                <span class="transition group-open:rotate-180">
                    <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </summary>
            <div class="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
                <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div class="text-gray-500">Name</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ $user->name }}</div>
                    </div>
                    <div>
                        <div class="text-gray-500">Status</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ $user->status }}</div>
                    </div>
                    <div>
                        <div class="text-gray-500">Origin</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ $user->residentProfile->origin_city ?? '-' }}</div>
                    </div>
                     <div>
                        <div class="text-gray-500">Campus</div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ $user->residentProfile->university ?? '-' }}</div>
                    </div>
                </div>
            </div>
        </details>

    </div>
</x-app-layout>
