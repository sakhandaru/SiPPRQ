import UserLayout from '@/Layouts/UserLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Profile({ user, profile, status }) {
    // Ensure profile is an object
    const userProfile = profile || {};

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        // Resident Profile
        wali_nama: userProfile.wali_nama || '',
        wali_kontak: userProfile.wali_kontak || '',
        alamat_asal: userProfile.alamat_asal || '',
        pendidikan: userProfile.pendidikan || 'KULIAH',
        institusi: userProfile.institusi || '',
        tahun_masuk: userProfile.tahun_masuk || '',
        social_instagram: userProfile.social_instagram || '',
        social_facebook: userProfile.social_facebook || '',
        social_linkedin: userProfile.social_linkedin || '',
    });

    function submit(e) {
        e.preventDefault();
        put(route('my-profile.update'));
    }

    return (
        <UserLayout title="My Profile">
            <Head title="My Profile" />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
                <div className="mb-6 bg-blue-50 text-blue-700 p-4 rounded-xl border border-blue-100 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Profile information is managed by the administrator. Please contact admin to request changes.
                </div>

                <form className="space-y-8">
                    {/* ACCOUNT INFO */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Account Information</h3>
                        <div className="flex gap-6 mb-6">
                            {userProfile.foto_profile ? (
                                <img 
                                    src={`/storage/${userProfile.foto_profile}`} 
                                    alt="Profile" 
                                    className="w-24 h-32 object-cover rounded-xl border border-gray-200 shadow-sm"
                                />
                            ) : (
                                <div className="w-24 h-32 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 border border-gray-200">
                                    No Photo
                                </div>
                            )}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                        value={data.name}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    value={data.email}
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input 
                                    type="text" 
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    value={data.phone}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    {/* PERSONAL DATA */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Personal Data</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Origin Address (Alamat Asal)</label>
                                <textarea 
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    rows="3"
                                    value={data.alamat_asal}
                                    disabled
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Name (Wali)</label>
                                <input 
                                    type="text" 
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    value={data.wali_nama}
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Contact</label>
                                <input 
                                    type="text" 
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    value={data.wali_kontak}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    {/* EDUCATION */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Education</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                                <input 
                                    type="text"
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    value={data.pendidikan}
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Institution / Campus</label>
                                <input 
                                    type="text" 
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    value={data.institusi}
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Year of Entry</label>
                                <input 
                                    type="number" 
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    value={data.tahun_masuk}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                     {/* SOCIAL MEDIA */}
                     <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Social Media</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                                <input 
                                    type="text" 
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    value={data.social_instagram}
                                    disabled
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                                <input 
                                    type="text" 
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    value={data.social_facebook}
                                    disabled
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                                <input 
                                    type="text" 
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    value={data.social_linkedin}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </UserLayout>
    );
}
