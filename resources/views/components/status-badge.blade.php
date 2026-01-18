@props(['status'])

@php
    $classes = match($status) {
        'PAID', 'VERIFIED' => 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700',
        'UNPAID', 'REJECTED' => 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700',
        'WAITING VERIFICATION', 'PENDING' => 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700',
        default => 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600',
    };
@endphp

<span {{ $attributes->merge(['class' => 'px-2.5 py-0.5 rounded-full text-xs font-medium border ' . $classes]) }}>
    {{ $status }}
</span>
