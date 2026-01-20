<?php

namespace Tests\Feature;

use App\Models\ResidentProfile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class Phase1Test extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_access_user_management()
    {
        $admin = User::factory()->create(['role' => 'ADMIN', 'status' => 'AKTIF']);

        $response = $this->actingAs($admin)->getJson('/admin/users');

        $response->assertStatus(200);
    }

    public function test_user_cannot_access_user_management()
    {
        $user = User::factory()->create(['role' => 'USER', 'status' => 'AKTIF']);

        $response = $this->actingAs($user)->getJson('/admin/users');

        $response->assertStatus(403);
    }

    public function test_user_can_view_own_profile()
    {
        $user = User::factory()->create(['role' => 'USER', 'status' => 'AKTIF']);
        ResidentProfile::create([
            'user_id' => $user->id,
            'wali_nama' => 'Test Parent',
            'wali_kontak' => '08123',
            'alamat_asal' => 'Test Address',
            'pendidikan' => 'KULIAH',
            'tahun_masuk' => 2024,
        ]);

        $response = $this->actingAs($user)->getJson('/my-profile');

        $response->assertStatus(200)
            ->assertJsonPath('id', $user->id)
            ->assertJsonPath('resident_profile.wali_nama', 'Test Parent');
    }

    public function test_admin_can_create_user_with_profile()
    {
        $admin = User::factory()->create(['role' => 'ADMIN', 'status' => 'AKTIF']);

        $userData = [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'password',
            'role' => 'USER',
            'status' => 'AKTIF',
            'phone' => '08123456789',
            'wali_nama' => 'New Parent',
            'wali_kontak' => '08987654321',
            'alamat_asal' => 'New Address',
            'pendidikan' => 'KULIAH',
            'institusi' => 'New Uni',
            'tahun_masuk' => 2025,
        ];

        $response = $this->actingAs($admin)->postJson('/admin/users', $userData);

        $response->assertStatus(201);
        $this->assertDatabaseHas('users', ['email' => 'newuser@example.com']);
        $this->assertDatabaseHas('resident_profiles', ['wali_nama' => 'New Parent']);
    }
}
