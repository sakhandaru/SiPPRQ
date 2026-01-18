<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    /**
     * Handle the incoming request.
     */

    /**
     * Handle the incoming request.
     */
    public function show(Request $request)
    {
        // Users can only view their own profile
        $user = $request->user()->load('residentProfile');
        return view('user.profile.show', compact('user'));
    }
}
