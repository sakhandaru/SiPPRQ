<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user()->load('residentProfile');

        return Inertia::render('User/Profile', [
            'user' => $user,
            'profile' => $user->residentProfile,
            'status' => session('status'),
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'occupation' => ['nullable', 'string', 'max:100'],
            'is_married' => ['required', 'boolean'],
        ]);

        $user->update(['name' => $validated['name']]);

        $user->residentProfile()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'phone' => $validated['phone'],
                'occupation' => $validated['occupation'],
                'is_married' => $validated['is_married'],
            ]
        );

        return back()->with('status', 'Profile updated successfully!');
    }
}
