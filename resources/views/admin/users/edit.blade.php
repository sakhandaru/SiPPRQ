<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Edit User') }}: {{ $user->name }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <form method="POST" action="{{ route('admin.users.update', $user->id) }}" x-data="{ role: '{{ old('role', $user->role) }}', pendidikan: '{{ old('pendidikan', $user->residentProfile?->pendidikan) }}' }">
                        @csrf
                        @method('PUT')

                        <!-- Name -->
                        <div>
                            <x-input-label for="name" :value="__('Name')" />
                            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name', $user->name)" required autofocus />
                            <x-input-error :messages="$errors->get('name')" class="mt-2" />
                        </div>

                        <!-- Email Address -->
                        <div class="mt-4">
                            <x-input-label for="email" :value="__('Email')" />
                            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email', $user->email)" required />
                            <x-input-error :messages="$errors->get('email')" class="mt-2" />
                        </div>

                        <!-- Password -->
                        <div class="mt-4">
                            <x-input-label for="password" :value="__('Password (Leave blank to keep current)')" />
                            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" autocomplete="new-password" />
                            <x-input-error :messages="$errors->get('password')" class="mt-2" />
                        </div>

                        <!-- Phone -->
                        <div class="mt-4">
                            <x-input-label for="phone" :value="__('Phone Number')" />
                            <x-text-input id="phone" class="block mt-1 w-full" type="text" name="phone" :value="old('phone', $user->phone)" />
                            <x-input-error :messages="$errors->get('phone')" class="mt-2" />
                        </div>

                        <!-- Role -->
                        <div class="mt-4">
                            <x-input-label for="role" :value="__('Role')" />
                            <select id="role" name="role" x-model="role" class="block mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
                                <option value="USER">User (Resident)</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                            <x-input-error :messages="$errors->get('role')" class="mt-2" />
                        </div>

                        <!-- Status -->
                        <div class="mt-4">
                            <x-input-label for="status" :value="__('Status')" />
                            <select id="status" name="status" class="block mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
                                <option value="AKTIF" {{ old('status', $user->status) === 'AKTIF' ? 'selected' : '' }}>Aktif</option>
                                <option value="NONAKTIF" {{ old('status', $user->status) === 'NONAKTIF' ? 'selected' : '' }}>Non-Aktif</option>
                                <option value="ALUMNI" {{ old('status', $user->status) === 'ALUMNI' ? 'selected' : '' }}>Alumni</option>
                            </select>
                            <x-input-error :messages="$errors->get('status')" class="mt-2" />
                        </div>

                        <!-- Resident Profile Fields -->
                        <div x-show="role === 'USER'" class="mt-6 border-t pt-4">
                            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Resident Profile Data</h3>

                            <!-- Wali Nama -->
                            <div class="mt-4">
                                <x-input-label for="wali_nama" :value="__('Wali Nama')" />
                                <x-text-input id="wali_nama" class="block mt-1 w-full" type="text" name="wali_nama" :value="old('wali_nama', $user->residentProfile?->wali_nama)" />
                                <x-input-error :messages="$errors->get('wali_nama')" class="mt-2" />
                            </div>

                            <!-- Wali Kontak -->
                            <div class="mt-4">
                                <x-input-label for="wali_kontak" :value="__('Wali Kontak')" />
                                <x-text-input id="wali_kontak" class="block mt-1 w-full" type="text" name="wali_kontak" :value="old('wali_kontak', $user->residentProfile?->wali_kontak)" />
                                <x-input-error :messages="$errors->get('wali_kontak')" class="mt-2" />
                            </div>

                            <!-- Alamat Asal -->
                            <div class="mt-4">
                                <x-input-label for="alamat_asal" :value="__('Alamat Asal')" />
                                <textarea id="alamat_asal" name="alamat_asal" class="block mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">{{ old('alamat_asal', $user->residentProfile?->alamat_asal) }}</textarea>
                                <x-input-error :messages="$errors->get('alamat_asal')" class="mt-2" />
                            </div>

                            <!-- Pendidikan -->
                            <div class="mt-4">
                                <x-input-label for="pendidikan" :value="__('Pendidikan')" />
                                <select id="pendidikan" name="pendidikan" x-model="pendidikan" class="block mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm">
                                    <option value="">Select Education</option>
                                    <option value="SMP">SMP</option>
                                    <option value="SMA">SMA</option>
                                    <option value="KULIAH">Kuliah</option>
                                </select>
                                <x-input-error :messages="$errors->get('pendidikan')" class="mt-2" />
                            </div>

                            <!-- Institusi -->
                            <div class="mt-4">
                                <x-input-label for="institusi" :value="__('Institusi (School/University)')" />
                                <x-text-input id="institusi" class="block mt-1 w-full" type="text" name="institusi" :value="old('institusi', $user->residentProfile?->institusi)" />
                                <x-input-error :messages="$errors->get('institusi')" class="mt-2" />
                            </div>

                            <!-- Tahun Masuk -->
                            <div class="mt-4">
                                <x-input-label for="tahun_masuk" :value="__('Tahun Masuk')" />
                                <x-text-input id="tahun_masuk" class="block mt-1 w-full" type="number" name="tahun_masuk" :value="old('tahun_masuk', $user->residentProfile?->tahun_masuk)" />
                                <x-input-error :messages="$errors->get('tahun_masuk')" class="mt-2" />
                            </div>

                            <div class="mt-4">
                                <h4 class="font-medium text-gray-700 dark:text-gray-300">Social Media</h4>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                    <div>
                                        <x-input-label for="social_instagram" :value="__('Instagram')" />
                                        <x-text-input id="social_instagram" class="block mt-1 w-full" type="text" name="social_instagram" :value="old('social_instagram', $user->residentProfile?->social_instagram)" placeholder="@username" />
                                    </div>
                                    <div>
                                        <x-input-label for="social_facebook" :value="__('Facebook')" />
                                        <x-text-input id="social_facebook" class="block mt-1 w-full" type="text" name="social_facebook" :value="old('social_facebook', $user->residentProfile?->social_facebook)" placeholder="username/id" />
                                    </div>
                                    <div>
                                        <x-input-label for="social_linkedin" :value="__('LinkedIn')" />
                                        <x-text-input id="social_linkedin" class="block mt-1 w-full" type="text" name="social_linkedin" :value="old('social_linkedin', $user->residentProfile?->social_linkedin)" placeholder="profile-url" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="flex items-center justify-end mt-4">
                            <a href="{{ route('admin.users.index') }}" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 mr-4">
                                {{ __('Cancel') }}
                            </a>
                            <x-primary-button class="ml-4">
                                {{ __('Update User') }}
                            </x-primary-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
