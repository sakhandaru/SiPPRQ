<?php

use App\Models\User;
use App\Models\KasPayment;
use App\Models\Balance;
use App\Models\Cashflow;
use App\Models\Bill;
use App\Models\FeeSetting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Artisan;

test('system can generate monthly bills', function () {
    // 1. Setup Data
    $user = User::factory()->create(['role' => 'USER']);
    FeeSetting::create(['type' => 'KAS', 'amount' => 125000]);
    FeeSetting::create(['type' => 'WIFI', 'amount' => 30000]);

    // 2. Run Command
    Artisan::call('bill:generate');

    // 3. Assert Bills Created
    $this->assertDatabaseHas('bills', [
        'user_id' => $user->id,
        'type' => 'KAS',
        'amount' => 125000,
        'status' => 'UNPAID',
    ]);
    
    $this->assertDatabaseHas('bills', [
        'user_id' => $user->id,
        'type' => 'WIFI',
        'amount' => 30000,
        'status' => 'UNPAID',
    ]);
});

test('user can upload payment proof for a bill', function () {
    Storage::fake('public');
    $user = User::factory()->create(['role' => 'USER']);
    $bill = Bill::create([
        'user_id' => $user->id,
        'type' => 'KAS',
        'month' => now()->startOfMonth(),
        'amount' => 125000,
        'status' => 'UNPAID'
    ]);
    
    $file = UploadedFile::fake()->image('proof.jpg');

    $response = $this->actingAs($user)->post(route('user.payments.store'), [
        'bill_id' => $bill->id,
        'proof_image' => $file,
    ]);

    $response->assertRedirect(route('user.payments.index'));
    
    $this->assertDatabaseHas('kas_payments', [
        'user_id' => $user->id,
        'bill_id' => $bill->id,
        'amount' => 125000, // Should be copied from bill
        'status' => 'PENDING',
    ]);
});

test('admin can verify payment and it updates bill and balance', function () {
    $admin = User::factory()->create(['role' => 'ADMIN']);
    $user = User::factory()->create(['role' => 'USER']);
    
    $bill = Bill::create([
        'user_id' => $user->id,
        'type' => 'KAS',
        'month' => now()->startOfMonth(),
        'amount' => 125000,
        'status' => 'UNPAID'
    ]);

    $payment = KasPayment::create([
        'user_id' => $user->id,
        'bill_id' => $bill->id,
        'type' => 'KAS',
        'amount' => 125000,
        'payment_date' => now(),
        'status' => 'PENDING',
    ]);

    $response = $this->actingAs($admin)->post(route('admin.payments.verify', $payment->id));

    $response->assertSessionHas('success');
    
    // Check Payment Status
    $this->assertDatabaseHas('kas_payments', [
        'id' => $payment->id,
        'status' => 'VERIFIED',
    ]);

    // Check Bill Updated
    $this->assertDatabaseHas('bills', [
        'id' => $bill->id,
        'status' => 'PAID',
    ]);

    // Check Balance Updated
    $this->assertDatabaseHas('balances', [
        'id' => 1,
        'current_balance' => 125000,
    ]);
});

test('admin can create manual expense and it decreases balance', function () {
    $admin = User::factory()->create(['role' => 'ADMIN']);
    
    Balance::create(['id' => 1, 'current_balance' => 500000]);

    $response = $this->actingAs($admin)->post(route('admin.cashflows.store'), [
        'direction' => 'OUT',
        'category' => 'Repair',
        'amount' => 50000,
        'description' => 'Fix door',
    ]);

    $this->assertDatabaseHas('balances', [
        'id' => 1,
        'current_balance' => 450000,
    ]);
});

test('user cannot access admin payment verification', function () {
    $user = User::factory()->create(['role' => 'USER']);
    // Setup dummy bill/payment to try
    $bill = Bill::create(['user_id'=>$user->id, 'type'=>'KAS', 'month'=>now(), 'amount'=>1, 'status'=>'UNPAID']);
    $payment = KasPayment::create([
        'user_id' => $user->id,
        'bill_id' => $bill->id,
        'type' => 'KAS',
        'amount' => 1,
        'payment_date' => now(),
        'status' => 'PENDING',
    ]);

    $response = $this->actingAs($user)->post(route('admin.payments.verify', $payment->id));
    $response->assertForbidden();
});
