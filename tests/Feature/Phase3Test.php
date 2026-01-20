<?php

use App\Models\User;
use App\Models\KasPayment;
use App\Models\Bill;
use App\Models\PeriodLock;
use Illuminate\Support\Facades\DB;

test('admin cannot verify payment in locked period', function () {
    $admin = User::factory()->create(['role' => 'ADMIN']);
    $user = User::factory()->create(['role' => 'USER']);
    
    // Create Bill for Jan 2025
    $date = \Carbon\Carbon::create(2025, 1, 1);
    $bill = Bill::create([
        'user_id' => $user->id,
        'type' => 'KAS',
        'month' => $date, // YYYY-MM-DD
        'amount' => 100000,
        'status' => 'UNPAID'
    ]);

    $payment = KasPayment::create([
        'user_id' => $user->id,
        'bill_id' => $bill->id,
        'type' => 'KAS',
        'amount' => 100000,
        'payment_date' => $date,
        'status' => 'PENDING',
    ]);

    // Lock Jan 2025
    PeriodLock::create([
        'month' => 1,
        'year' => 2025,
        'locked_at' => now(),
        'locked_by' => $admin->id,
    ]);

    // Action
    $response = $this->actingAs($admin)->post(route('admin.payments.verify', $payment->id));

    // Assert
    $response->assertSessionHas('error', 'Cannot modify payments in a locked period.');
    $this->assertDatabaseHas('kas_payments', [
        'id' => $payment->id,
        'status' => 'PENDING', // Should NOT change
    ]);
});

test('admin actions create audit logs', function () {
    $admin = User::factory()->create(['role' => 'ADMIN']);
    $user = User::factory()->create(['role' => 'USER']);
    
    $bill = Bill::create([
        'user_id' => $user->id,
        'type' => 'KAS',
        'month' => now(), 
        'amount' => 100000,
        'status' => 'UNPAID'
    ]);

    $payment = KasPayment::create([
        'user_id' => $user->id,
        'bill_id' => $bill->id,
        'type' => 'KAS',
        'amount' => 100000,
        'payment_date' => now(),
        'status' => 'PENDING',
    ]);

    // Verify (Not locked)
    $this->actingAs($admin)->post(route('admin.payments.verify', $payment->id));

    // Assert Audit Log
    $this->assertDatabaseHas('audit_logs', [
        'user_id' => $admin->id,
        'action' => 'VERIFY_PAYMENT',
        'model' => 'KasPayment',
        'model_id' => $payment->id,
    ]);
});

test('admin can access reports page', function () {
    $admin = User::factory()->create(['role' => 'ADMIN']);
    $response = $this->actingAs($admin)->get(route('admin.reports.index'));
    $response->assertStatus(200);
});
