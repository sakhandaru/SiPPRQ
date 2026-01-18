<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('My Profile') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">

                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Personal Information</h3>
                        <!-- Optional: Link to edit profile if implemented later -->
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Account Details</h4>
                            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-3">
                                <div>
                                    <span class="block text-xs font-medium text-gray-400 uppercase">Name</span>
                                    <span class="block text-gray-900 dark:text-gray-100">{{ $user->name }}</span>
                                </div>
                                <div>
                                    <span class="block text-xs font-medium text-gray-400 uppercase">Email</span>
                                    <span class="block text-gray-900 dark:text-gray-100">{{ $user->email }}</span>
                                </div>
                                <div>
                                    <span class="block text-xs font-medium text-gray-400 uppercase">Phone</span>
                                    <span class="block text-gray-900 dark:text-gray-100">{{ $user->phone ?? '-' }}</span>
                                </div>
                                <div>
                                    <span class="block text-xs font-medium text-gray-400 uppercase">Status</span>
                                    <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                        {{ $user->status }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Resident Data</h4>
                            @if($user->residentProfile)
                                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-3">
                                    <div>
                                        <span class="block text-xs font-medium text-gray-400 uppercase">Wali Nama</span>
                                        <span class="block text-gray-900 dark:text-gray-100">{{ $user->residentProfile->wali_nama }}</span>
                                    </div>
                                    <div>
                                        <span class="block text-xs font-medium text-gray-400 uppercase">Wali Kontak</span>
                                        <span class="block text-gray-900 dark:text-gray-100">{{ $user->residentProfile->wali_kontak }}</span>
                                    </div>
                                    <div>
                                        <span class="block text-xs font-medium text-gray-400 uppercase">Alamat Asal</span>
                                        <span class="block text-gray-900 dark:text-gray-100">{{ $user->residentProfile->alamat_asal }}</span>
                                    </div>
                                    <div>
                                        <span class="block text-xs font-medium text-gray-400 uppercase">Pendidikan</span>
                                        <span class="block text-gray-900 dark:text-gray-100">{{ $user->residentProfile->pendidikan }}</span>
                                    </div>
                                    <div>
                                        <span class="block text-xs font-medium text-gray-400 uppercase">Institusi</span>
                                        <span class="block text-gray-900 dark:text-gray-100">{{ $user->residentProfile->institusi ?? '-' }}</span>
                                    </div>
                                    <div>
                                        <span class="block text-xs font-medium text-gray-400 uppercase">Tahun Masuk</span>
                                        <span class="block text-gray-900 dark:text-gray-100">{{ $user->residentProfile->tahun_masuk }}</span>
                                    </div>
                                    
                                    @if($user->residentProfile->social_instagram || $user->residentProfile->social_facebook || $user->residentProfile->social_linkedin)
                                    <div>
                                        <span class="block text-xs font-medium text-gray-400 uppercase">Social Media</span>
                                        <div class="flex space-x-3 mt-1">
                                            @if($user->residentProfile->social_instagram)
                                                <a href="https://instagram.com/{{ $user->residentProfile->social_instagram }}" target="_blank" class="text-pink-600 hover:text-pink-500">
                                                    <span class="sr-only">Instagram</span>
                                                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                                </a>
                                            @endif
                                            <!-- Icons for others simplified for brevity -->
                                            @if($user->residentProfile->social_facebook)
                                                 <a href="#" class="text-blue-600 font-bold">FB</a>
                                            @endif
                                            @if($user->residentProfile->social_linkedin)
                                                 <a href="#" class="text-blue-700 font-bold">LI</a>
                                            @endif
                                        </div>
                                    </div>
                                    @endif

                                </div>
                            @else
                                <div class="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
                                    <p class="text-yellow-700 dark:text-yellow-200">This profile is not yet completed. Please contact admin to update.</p>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
