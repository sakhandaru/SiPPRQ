<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        if ($user->role === 'USER') {
            \App\Models\Bill::create([
                'user_id' => $user->id,
                'type' => 'REGISTRATION', // Needs to be consistent with what we put in DB (string/enum)
                'title' => 'Pendaftaran Pondok',
                'amount' => 600000,
                'status' => 'UNPAID',
                'month' => now(), // Just default to current month
            ]);
        }
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        //
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
