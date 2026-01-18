<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('residentProfile')->paginate(10);
        return view('admin.users.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.users.create');
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
            'wali_nama' => 'required_if:role,USER|string|nullable',
            'wali_kontak' => 'required_if:role,USER|string|nullable',
            'alamat_asal' => 'required_if:role,USER|string|nullable',
            'pendidikan' => 'required_if:role,USER|in:SMP,SMA,KULIAH|nullable',
            'institusi' => 'nullable|string',
            'tahun_masuk' => 'required_if:role,USER|integer|nullable',
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
                'alamat_asal' => $validated['alamat_asal'],
                'pendidikan' => $validated['pendidikan'],
                'institusi' => $validated['institusi'] ?? null,
                'tahun_masuk' => $validated['tahun_masuk'],
            ]);
        }

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::with('residentProfile')->findOrFail($id);
        return view('admin.users.show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::with('residentProfile')->findOrFail($id);
        return view('admin.users.edit', compact('user'));
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
            'alamat_asal' => 'nullable|required_if:role,USER|string',
            'pendidikan' => 'nullable|required_if:role,USER|in:SMP,SMA,KULIAH',
            'institusi' => 'nullable|string',
            'tahun_masuk' => 'nullable|required_if:role,USER|integer',
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
                    'wali_nama', 'wali_kontak', 'alamat_asal', 'pendidikan', 
                    'institusi', 'tahun_masuk', 'tahun_keluar', 
                    'social_instagram', 'social_facebook', 'social_linkedin'
                ])
            );
        }

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }
}
