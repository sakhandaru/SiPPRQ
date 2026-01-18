<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('User Details') }}: {{ $user->name }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Account Information</h3>
                            <div class="space-y-4">
                                <div>
                                    <span class="block font-medium text-sm text-gray-500">Name</span>
                                    <span class="block text-gray-900 dark:text-gray-100">{{ $user->name }}</span>
                                </div>
                                <div>
                                    <span class="block font-medium text-sm text-gray-500">Email</span>
                                    <span class="block text-gray-900 dark:text-gray-100">{{ $user->email }}</span>
                                </div>
                                <div>
                                    <span class="block font-medium text-sm text-gray-500">Role</span>
                                    <span class="block text-gray-900 dark:text-gray-100">{{ $user->role }}</span>
                                </div>
                                <div>
                                    <span class="block font-medium text-sm text-gray-500">Status</span>
                                    <span class="block text-gray-900 dark:text-gray-100">{{ $user->status }}</span>
                                </div>
                                <div>
                                    <span class="block font-medium text-sm text-gray-500">Phone</span>
                                    <span class="block text-gray-900 dark:text-gray-100">{{ $user->phone ?? '-' }}</span>
                                </div>
                            </div>
                        </div>

                        @if($user->residentProfile)
                        <div>
                            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Resident Profile</h3>
                            <div class="space-y-4">
                                <div>
                                    <span class="block font-medium text-sm text-gray-500">Wali Nama</span>
                                    <span class="block text-gray-900 dark:text-gray-100">{{ $user->residentProfile->wali_nama }}</span>
                                </div>
                                <div>
                                    <span class="block font-medium text-sm text-gray-500">Wali Kontak</span>
                                    <span class="block text-gray-900 dark:text-gray-100">{{ $user->residentProfile->wali_kontak }}</span>
                                </div>
                                <div>
                                    <span class="block font-medium text-sm text-gray-500">Alamat Asal</span>
                                    <span class="block text-gray-900 dark:text-gray-100">{{ $user->residentProfile->alamat_asal }}</span>
                                </div>
                                <div>
                                    <span class="block font-medium text-sm text-gray-500">Pendidikan</span>
                                    <span class="block text-gray-900 dark:text-gray-100">{{ $user->residentProfile->pendidikan }}</span>
                                </div>
                                <div>
                                    <span class="block font-medium text-sm text-gray-500">Institusi</span>
                                    <span class="block text-gray-900 dark:text-gray-100">{{ $user->residentProfile->institusi ?? '-' }}</span>
                                </div>
                                <div>
                                    <span class="block font-medium text-sm text-gray-500">Tahun Masuk</span>
                                    <span class="block text-gray-900 dark:text-gray-100">{{ $user->residentProfile->tahun_masuk }}</span>
                                </div>
                                <div>
                                    <span class="block font-medium text-sm text-gray-500">Social Media</span>
                                    <div class="flex space-x-4 mt-1">
                                        @if($user->residentProfile->social_instagram)
                                            <a href="https://instagram.com/{{ $user->residentProfile->social_instagram }}" target="_blank" class="text-pink-600 hover:text-pink-800">Instagram</a>
                                        @endif
                                        @if($user->residentProfile->social_facebook)
                                            <a href="https://facebook.com/{{ $user->residentProfile->social_facebook }}" target="_blank" class="text-blue-600 hover:text-blue-800">Facebook</a>
                                        @endif
                                        @if($user->residentProfile->social_linkedin)
                                            <a href="{{ $user->residentProfile->social_linkedin }}" target="_blank" class="text-blue-700 hover:text-blue-900">LinkedIn</a>
                                        @endif
                                        @if(!$user->residentProfile->social_instagram && !$user->residentProfile->social_facebook && !$user->residentProfile->social_linkedin)
                                            <span class="text-gray-400">None</span>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                        @else
                           @if($user->role === 'USER')
                            <div class="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-md">
                                <p class="text-yellow-700 dark:text-yellow-200">Resident profile incomplete.</p>
                            </div>
                           @endif
                        @endif
                    </div>

                    <div class="mt-8 flex justify-end space-x-3">
                        <a href="{{ route('admin.users.index') }}" class="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                            Back
                        </a>
                        <a href="{{ route('admin.users.edit', $user->id) }}" class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                            Edit
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
