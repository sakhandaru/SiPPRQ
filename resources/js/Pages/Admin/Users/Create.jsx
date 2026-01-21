import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import ResidentFormFields from '@/Components/Admin/ResidentFormFields';

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
        province_id: '',
        city_id: '',
        district_id: '',
        address_detail: '',
        birth_date: '',
        study_program: '',
        student_id_number: '',
        pendidikan: 'KULIAH',
        institusi: '',
        tahun_masuk: new Date().getFullYear(),
        foto_profile: null,
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.users.store'));
    }

    // Helper Component for Bento Consistency
    const BentoCard = ({ children, className = "", noPadding = false }) => (
        <div className={`bg-white rounded-[2.5rem] border border-zinc-200/60 shadow-sm transition-all duration-300 hover:shadow-md ${noPadding ? '' : 'p-8'} ${className}`}>
            {children}
        </div>
    );

    return (
        <AdminLayout title="Add New Resident">
            <Head title="Add Resident" />

            <div className="max-w-4xl mx-auto space-y-6 pb-12 px-2">
                
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <Link href={route('admin.users.index')} className="text-zinc-400 text-xs font-bold uppercase tracking-[0.2em] mb-1 hover:text-emerald-500 transition-colors">
                            ← Back to Directory
                        </Link>
                        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight italic">
                            Onboard <span className="text-emerald-600 not-italic uppercase text-2xl font-black tracking-tighter">New Resident</span>
                        </h1>
                    </div>
                </div>

                <BentoCard className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <form onSubmit={submit} className="space-y-8">
                        
                        {/* ACCOUNT INFO */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-zinc-900 uppercase tracking-[0.3em] flex items-center gap-3">
                                <span className="w-8 h-px bg-zinc-900"></span> Account Credentials
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-sm font-bold text-zinc-700 bg-white"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="e.g. Ahmad Fauzi"
                                        required
                                    />
                                    {errors.name && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.name}</div>}
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-sm font-bold text-zinc-700 bg-white"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="resident@example.com"
                                        required
                                    />
                                    {errors.email && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.email}</div>}
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Initial Password</label>
                                    <input
                                        type="password"
                                        className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-sm font-bold text-zinc-700 bg-white"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                    {errors.password && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.password}</div>}
                                </div>
                                 <div>
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-sm font-bold text-zinc-700 bg-white"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        placeholder="0812..."
                                    />
                                    {errors.phone && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.phone}</div>}
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Role</label>
                                     <div className='relative'>
                                        <select
                                            className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-xs font-bold text-zinc-700 bg-white appearance-none"
                                            value={data.role}
                                            onChange={e => setData('role', e.target.value)}
                                        >
                                            <option value="USER">Resident (User)</option>
                                            <option value="ADMIN">Administrator</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                    {errors.role && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.role}</div>}
                                </div>
                                 <div>
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Status</label>
                                    <div className='relative'>
                                        <select
                                            className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-xs font-bold text-zinc-700 bg-white appearance-none"
                                            value={data.status}
                                            onChange={e => setData('status', e.target.value)}
                                        >
                                            <option value="AKTIF">Active</option>
                                            <option value="NONAKTIF">Inactive</option>
                                            <option value="ALUMNI">Alumni</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                    {errors.status && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.status}</div>}
                                </div>
                            </div>
                        </div>

                        {/* RESIDENT PROFILE */}
                        {data.role === 'USER' && (
                            <div className="space-y-6 pt-4 border-t border-zinc-100">
                                <h3 className="text-xs font-black text-zinc-900 uppercase tracking-[0.3em] flex items-center gap-3">
                                    <span className="w-8 h-px bg-zinc-900"></span> Extended Profile
                                </h3>
                                <ResidentFormFields 
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            </div>
                        )}

                        <div className="pt-8 flex gap-4 border-t border-zinc-100">
                             <Link
                                href={route('admin.users.index')}
                                className="flex-1 py-4 bg-zinc-100 rounded-2xl font-black text-[10px] text-zinc-400 uppercase tracking-widest hover:bg-zinc-200 transition-all text-center"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-[2] py-4 bg-emerald-500 text-emerald-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 active:scale-95"
                            >
                                {processing ? 'Onboarding...' : 'Confirm Registration'}
                            </button>
                        </div>

                    </form>
                </BentoCard>
            </div>
        </AdminLayout>
    );
}
