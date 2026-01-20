<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('residentProfile')->paginate(10);
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:ADMIN,USER',
            'status' => 'required|in:AKTIF,NONAKTIF,ALUMNI',
            'phone' => 'nullable|string',
            // Profile fields
            // Profile fields
            'wali_nama' => 'required_if:role,USER|string|nullable',
            'wali_kontak' => 'required_if:role,USER|string|nullable',
            'province_id' => 'required_if:role,USER|exists:provinces,id|nullable',
            'city_id' => 'required_if:role,USER|exists:cities,id|nullable',
            'district_id' => 'required_if:role,USER|exists:districts,id|nullable',
            'address_detail' => 'required_if:role,USER|string|nullable',
            'birth_date' => 'required_if:role,USER|date|nullable',
            'study_program' => 'required_if:role,USER|string|nullable',
            'student_id_number' => 'required_if:role,USER|string|nullable',
            'pendidikan' => 'required_if:role,USER|in:SMP,SMA,KULIAH|nullable',
            'institusi' => 'nullable|string',
            'tahun_masuk' => 'required_if:role,USER|integer|nullable',
            'foto_profile' => 'nullable|image|max:2048',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'status' => $validated['status'],
            'phone' => $validated['phone'] ?? null,
        ]);

        if ($user->role === 'USER') {
            $user->residentProfile()->create([
                'wali_nama' => $validated['wali_nama'],
                'wali_kontak' => $validated['wali_kontak'],
                'province_id' => $validated['province_id'] ?? null,
                'city_id' => $validated['city_id'] ?? null,
                'district_id' => $validated['district_id'] ?? null,
                'address_detail' => $validated['address_detail'] ?? null,
                'birth_date' => $validated['birth_date'] ?? null,
                'study_program' => $validated['study_program'] ?? null,
                'student_id_number' => $validated['student_id_number'] ?? null,
                'pendidikan' => $validated['pendidikan'],
                'institusi' => $validated['institusi'] ?? null,
                'tahun_masuk' => $validated['tahun_masuk'],
                'foto_profile' => $request->file('foto_profile') ? $request->file('foto_profile')->store('resident-photos', 'public') : null,
            ]);
        }

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

    public function edit(string $id)
    {
        $user = User::with('residentProfile')->findOrFail($id);
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'role' => 'required|in:ADMIN,USER',
            'status' => 'required|in:AKTIF,NONAKTIF,ALUMNI',
            'phone' => 'nullable|string',
             // Profile fields
            'wali_nama' => 'nullable|required_if:role,USER|string',
            'wali_kontak' => 'nullable|required_if:role,USER|string',
            'province_id' => 'exists:provinces,id|nullable',
            'city_id' => 'exists:cities,id|nullable',
            'district_id' => 'exists:districts,id|nullable',
            'address_detail' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'study_program' => 'nullable|string',
            'student_id_number' => 'nullable|string',
            'pendidikan' => 'nullable|required_if:role,USER|in:SMP,SMA,KULIAH',
            'institusi' => 'nullable|string',
            'tahun_masuk' => 'nullable|required_if:role,USER|integer',
            'foto_profile' => 'nullable|image|max:2048',
        ]);

        $user->update($request->only(['name', 'email', 'role', 'status', 'phone']));

        if ($request->filled('password')) {
            $request->validate(['password' => 'string|min:8']);
            $user->update(['password' => Hash::make($request->password)]);
        }

        if ($user->role === 'USER') {
            $user->residentProfile()->updateOrCreate(
                ['user_id' => $user->id],
                $request->only([
                    'wali_nama', 'wali_kontak', 'province_id', 'city_id', 'district_id', 'address_detail',
                     'birth_date', 'study_program', 'student_id_number',
                     'pendidikan', 'institusi', 'tahun_masuk', 'tahun_keluar', 
                    'social_instagram', 'social_facebook', 'social_linkedin'
                ])
            );

            if ($request->hasFile('foto_profile')) {
                // Delete old photo if exists
                if ($user->residentProfile->foto_profile) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete($user->residentProfile->foto_profile);
                }
                $path = $request->file('foto_profile')->store('resident-photos', 'public');
                $user->residentProfile()->update(['foto_profile' => $path]);
            }
        }

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::with('residentProfile')->findOrFail($id);
        if ($user->residentProfile && $user->residentProfile->foto_profile) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($user->residentProfile->foto_profile);
        }
        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }
}
