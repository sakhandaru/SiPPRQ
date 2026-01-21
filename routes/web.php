<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // API Regions (Session Authenticated)
    Route::get('api/provinces', [\App\Http\Controllers\Api\RegionController::class, 'provinces'])->name('api.regions.provinces');
    Route::get('api/provinces/{province}/cities', [\App\Http\Controllers\Api\RegionController::class, 'cities'])->name('api.regions.cities');
    Route::get('api/cities/{city}/districts', [\App\Http\Controllers\Api\RegionController::class, 'districts'])->name('api.regions.districts');
});

Route::middleware(['auth', 'role:ADMIN'])->group(function () {
    Route::resource('admin/users', \App\Http\Controllers\AdminUserController::class)->names('admin.users');

    // Admin Payments
    Route::get('admin/payments', [\App\Http\Controllers\Admin\PaymentController::class, 'index'])->name('admin.payments.index');
    Route::post('admin/payments/{payment}/verify', [\App\Http\Controllers\Admin\PaymentController::class, 'verify'])->name('admin.payments.verify');
    Route::post('admin/payments/{payment}/reject', [\App\Http\Controllers\Admin\PaymentController::class, 'reject'])->name('admin.payments.reject');

    // Admin Cashflows
    Route::get('admin/cashflows', [\App\Http\Controllers\Admin\CashflowController::class, 'index'])->name('admin.cashflows.index');
    Route::post('admin/cashflows', [\App\Http\Controllers\Admin\CashflowController::class, 'store'])->name('admin.cashflows.store');

    // Admin Reports & Locking
    Route::get('admin/reports', [\App\Http\Controllers\Admin\ReportController::class, 'index'])->name('admin.reports.index');
    Route::get('admin/reports/cashflow', [\App\Http\Controllers\Admin\ReportController::class, 'cashflow'])->name('admin.reports.cashflow');
    Route::get('admin/reports/payments', [\App\Http\Controllers\Admin\ReportController::class, 'payments'])->name('admin.reports.payments');
    Route::post('admin/periods/lock', [\App\Http\Controllers\Admin\PeriodLockController::class, 'store'])->name('admin.periods.lock');

    // Admin Tracker
    Route::get('admin/tracker', [\App\Http\Controllers\Admin\TrackerController::class, 'index'])->name('admin.tracker.index');
    Route::post('admin/bills/generate', [\App\Http\Controllers\Admin\BillController::class, 'generate'])->name('admin.bills.generate');
    Route::post('admin/bills/store', [\App\Http\Controllers\Admin\BillController::class, 'store'])->name('admin.bills.store');
});

Route::middleware(['auth', 'role:USER'])->group(function () {
    Route::get('my-profile', [\App\Http\Controllers\UserProfileController::class, 'show'])->name('my-profile.show');
    Route::put('my-profile', [\App\Http\Controllers\UserProfileController::class, 'update'])->name('my-profile.update');

    // User Payments
    Route::get('payments', [\App\Http\Controllers\User\PaymentController::class, 'index'])->name('user.payments.index');
    Route::post('payments', [\App\Http\Controllers\User\PaymentController::class, 'store'])->name('user.payments.store');

    // User Self-Service Bill
    Route::post('bills', [\App\Http\Controllers\User\BillController::class, 'store'])->name('user.bills.store');
});

require __DIR__.'/auth.php';
