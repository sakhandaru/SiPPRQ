import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'USER',
        status: 'AKTIF',
        phone: '',
        // Profile
        wali_nama: '',
        wali_kontak: '',
        alamat_asal: '',
        pendidikan: 'KULIAH',
        institusi: '',
        institusi: '',
        tahun_masuk: new Date().getFullYear(),
        foto_profile: null,
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.users.store'));
    }

    return (
        <AdminLayout title="Add New Resident">
            <Head title="Add Resident" />

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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    required
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Name (Wali)</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                        value={data.wali_nama}
                                        onChange={e => setData('wali_nama', e.target.value)}
                                    />
                                    {errors.wali_nama && <div className="text-red-500 text-xs mt-1">{errors.wali_nama}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Contact</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                        value={data.wali_kontak}
                                        onChange={e => setData('wali_kontak', e.target.value)}
                                    />
                                    {errors.wali_kontak && <div className="text-red-500 text-xs mt-1">{errors.wali_kontak}</div>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Origin Address</label>
                                    <textarea
                                        className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                        value={data.alamat_asal}
                                        onChange={e => setData('alamat_asal', e.target.value)}
                                        rows="2"
                                    ></textarea>
                                    {errors.alamat_asal && <div className="text-red-500 text-xs mt-1">{errors.alamat_asal}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
                                    <select
                                        className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                        value={data.pendidikan}
                                        onChange={e => setData('pendidikan', e.target.value)}
                                    >
                                        <option value="KULIAH">Kuliah (University)</option>
                                        <option value="SMA">SMA</option>
                                        <option value="SMP">SMP</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution / Campus</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                        value={data.institusi}
                                        onChange={e => setData('institusi', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Year of Entry</label>
                                    <input
                                        type="number"
                                        className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                        value={data.tahun_masuk}
                                        onChange={e => setData('tahun_masuk', e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-2 border-t border-gray-100 pt-4 mt-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Formal Photo (Max 2MB)</label>
                                    <input 
                                        type="file" 
                                        accept="image/png, image/jpeg, image/jpg"
                                        className="w-full p-2 border border-gray-200 rounded-xl"
                                        onChange={e => setData('foto_profile', e.target.files[0])}
                                    />
                                    {errors.foto_profile && <div className="text-red-500 text-xs mt-1">{errors.foto_profile}</div>}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-6 flex gap-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg disabled:opacity-50"
                        >
                            {processing ? 'Creating...' : 'Create Resident'}
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
