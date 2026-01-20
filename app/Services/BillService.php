<?php

namespace App\Services;

use App\Models\Bill;
use App\Models\FeeSetting;
use App\Models\User;
use Carbon\Carbon;

class BillService
{
    public function generateForMonth($year, $month)
    {
        $targetDate = Carbon::createFromDate($year, $month, 1)->format('Y-m-d');

        $users = User::where('role', 'USER')->where('status', 'AKTIF')->get();
        // Pre-fetch fees to avoid query in loop?
        // Actually generateForUser will fetch fees? Or pass fees?
        // Let's optimize: fetch fees once and pass to generateForUser?
        // For simplicity now, let's keep it simple.

        $count = 0;

        foreach ($users as $user) {
            if ($this->generateForUser($user, $year, $month)) {
                $count++;
            }
        }

        return [
            'users_count' => $users->count(),
            'bills_created' => $count,
        ];
    }

    public function generateForUser(User $user, $year, $month)
    {
        $targetDate = Carbon::createFromDate($year, $month, 1)->format('Y-m-d');
        $fees = FeeSetting::all()->pluck('amount', 'type');
        $created = false;

        // 1. KAS Bill
        if (isset($fees['KAS'])) {
            $bill = Bill::firstOrCreate(
                [
                    'user_id' => $user->id,
                    'type' => 'KAS',
                    'month' => $targetDate,
                ],
                [
                    'amount' => $fees['KAS'],
                    'status' => 'UNPAID',
                ]
            );
            if ($bill->wasRecentlyCreated) {
                $created = true;
            }
        }

        // 2. WIFI Bill
        if (isset($fees['WIFI'])) {
            $bill = Bill::firstOrCreate(
                [
                    'user_id' => $user->id,
                    'type' => 'WIFI',
                    'month' => $targetDate,
                ],
                [
                    'amount' => $fees['WIFI'],
                    'status' => 'UNPAID',
                ]
            );
            if ($bill->wasRecentlyCreated) {
                $created = true;
            }
        }

        return $created;
    }
}
