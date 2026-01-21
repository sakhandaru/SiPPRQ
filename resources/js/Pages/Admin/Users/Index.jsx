import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function Index({ users }) {
    const { success } = usePage().props;

    // Helper Component for Bento Consistency
    const BentoCard = ({ children, className = "", noPadding = false }) => (
        <div className={`bg-white rounded-[2.5rem] border border-zinc-200/60 shadow-sm transition-all duration-300 hover:shadow-md ${noPadding ? '' : 'p-8'} ${className}`}>
            {children}
        </div>
    );

    return (
        <AdminLayout title="Residents Management">
            <Head title="Residents" />

            <div className="space-y-6 pb-12 px-2">
                
                {/* 1. SOPHISTICATED HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <p className="text-zinc-400 text-xs font-semibold uppercase tracking-[0.2em] mb-1">Human Resources</p>
                        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight italic">
                            Core <span className="text-emerald-600 not-italic uppercase text-2xl font-black tracking-tighter">Directory</span>
                        </h1>
                    </div>
                    <Link
                        href={route('admin.users.create')}
                        className="bg-zinc-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-zinc-800 transition shadow-lg flex items-center gap-2 group active:scale-95"
                    >
                        <div className="bg-emerald-500 rounded-lg p-1 group-hover:rotate-90 transition-transform">
                            <svg className="w-4 h-4 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                        </div>
                        Add Resident
                    </Link>
                </div>

                {/* 2. SUCCESS FEEDBACK */}
                {success && (
                    <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-100 flex items-center animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
                        <div className="bg-emerald-500 p-1 rounded-full mr-3 text-white shadow-inner">
                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <span className="font-bold text-sm tracking-tight">{success}</span>
                    </div>
                )}

                {/* 3. RESIDENTS DATA TABLE */}
                <BentoCard noPadding className="overflow-hidden border-zinc-200/80">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-50 text-[10px] uppercase text-zinc-400 font-bold tracking-[0.2em] border-b border-zinc-100">
                                <tr>
                                    <th className="px-8 py-5">Resident Identity</th>
                                    <th className="px-6 py-5">Role</th>
                                    <th className="px-6 py-5">Current Status</th>
                                    <th className="px-6 py-5">Contact</th>
                                    <th className="px-8 py-5 text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                {user.resident_profile?.foto_profile ? (
                                                    <div className="relative shrink-0">
                                                         <img 
                                                            src={`/storage/${user.resident_profile.foto_profile}`} 
                                                            alt={user.name}
                                                            className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md group-hover:rotate-3 transition-transform"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400 font-black text-lg border-2 border-white shadow-md group-hover:rotate-3 transition-transform shrink-0">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="font-bold text-zinc-900 tracking-tight text-base leading-none mb-1.5 truncate uppercase">{user.name}</p>
                                                    <p className="text-[10px] font-medium text-zinc-400 truncate">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                                user.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-zinc-50 text-zinc-500 border-zinc-200'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                                user.status === 'AKTIF' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                                user.status === 'ALUMNI' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                            }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 font-bold text-zinc-700 tracking-tight text-xs">
                                            {user.phone || '—'}
                                        </td>
                                        <td className="px-8 py-6 text-right space-x-1">
                                            <Link
                                                href={route('admin.users.edit', user.id)}
                                                className="inline-flex items-center justify-center bg-zinc-100 text-zinc-600 hover:bg-zinc-900 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this resident? This action cannot be undone.')) {
                                                        router.delete(route('admin.users.destroy', user.id));
                                                    }
                                                }}
                                                className="inline-flex items-center justify-center bg-zinc-50 text-rose-600 hover:bg-rose-600 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* PAGINATION - Minimalist Style */}
                    {users.links.length > 3 && (
                        <div className="p-6 bg-zinc-50/50 border-t border-zinc-100 flex justify-center gap-1.5">
                            {users.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black transition-all shadow-sm ${
                                        link.active ? 'bg-zinc-900 text-white shadow-zinc-200' : 'text-zinc-500 bg-white hover:bg-zinc-50 border border-zinc-200/60'
                                    } ${!link.url && 'opacity-30 cursor-not-allowed shadow-none'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </BentoCard>
            </div>
        </AdminLayout>
    );
}