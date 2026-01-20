import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import ResidentFormFields from '@/Components/Admin/ResidentFormFields';

export default function Edit({ user }) {
    const profile = user.resident_profile || {};

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '', // Leave empty to keep change
        role: user.role,
        status: user.status,
        phone: user.phone || '',
        // Profile
        wali_nama: profile.wali_nama || '',
        wali_kontak: profile.wali_kontak || '',
        province_id: profile.province_id || '',
        city_id: profile.city_id || '',
        district_id: profile.district_id || '',
        address_detail: profile.address_detail || '',
        birth_date: profile.birth_date || '',
        study_program: profile.study_program || '',
        student_id_number: profile.student_id_number || '',
        pendidikan: profile.pendidikan || 'KULIAH',
        institusi: profile.institusi || '',
        tahun_masuk: profile.tahun_masuk || '',
        foto_profile: null,
    });

    function submit(e) {
        e.preventDefault();
        put(route('admin.users.update', user.id));
    }

    return (
        <AdminLayout title={`Edit Resident: ${user.name}`}>
            <Head title="Edit Resident" />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-3xl">
                <form onSubmit={submit} className="space-y-6">
                    
                    {/* ACCOUNT INFO */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Account Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password (Leave blank to keep)</label>
                                <input
                                    type="password"
                                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="********"
                                />
                                {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                />
                                {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    value={data.role}
                                    onChange={e => setData('role', e.target.value)}
                                >
                                    <option value="USER">Resident (User)</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                                {errors.role && <div className="text-red-500 text-xs mt-1">{errors.role}</div>}
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                >
                                    <option value="AKTIF">Active</option>
                                    <option value="NONAKTIF">Inactive</option>
                                    <option value="ALUMNI">Alumni</option>
                                </select>
                                {errors.status && <div className="text-red-500 text-xs mt-1">{errors.status}</div>}
                            </div>
                        </div>
                    </div>

                    {/* RESIDENT PROFILE */}
                    {data.role === 'USER' && (
                        <div className="animate-fade-in-up">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2 pt-4">Resident Profile</h3>
                            <ResidentFormFields 
                                data={data}
                                setData={setData}
                                errors={errors}
                            />
                        </div>
                    )}

                    <div className="pt-6 flex gap-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                        <Link
                            href={route('admin.users.index')}
                            className="px-8 py-3 rounded-xl font-bold text-gray-500 hover:text-gray-900 transition"
                        >
                            Cancel
                        </Link>
                    </div>

                </form>
            </div>
        </AdminLayout>
    );
}
