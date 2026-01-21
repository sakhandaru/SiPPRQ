import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ payments, filters }) {
    const { success, error } = usePage().props;
    const [selectedImage, setSelectedImage] = useState(null);

    const [month, setMonth] = useState(filters.month || '');
    const [year, setYear] = useState(filters.year || '');
    const [status, setStatus] = useState(filters.status || 'ALL');
    const [type, setType] = useState(filters.type || 'ALL');

    const handleFilter = () => {
        router.get(route('admin.payments.index'), { month, year, status, type }, { preserveState: true });
    };
    
    const handleVerify = (id) => {
        if (confirm('Are you sure you want to verify this payment?')) {
            router.post(route('admin.payments.verify', id));
        }
    };

    const handleReject = (id) => {
        if (confirm('Are you sure you want to REJECT this payment?')) {
            router.post(route('admin.payments.reject', id));
        }
    };

    const months = [
        { id: 1, name: 'January' }, { id: 2, name: 'February' }, { id: 3, name: 'March' },
        { id: 4, name: 'April' }, { id: 5, name: 'May' }, { id: 6, name: 'June' },
        { id: 7, name: 'July' }, { id: 8, name: 'August' }, { id: 9, name: 'September' },
        { id: 10, name: 'October' }, { id: 11, name: 'November' }, { id: 12, name: 'December' }
    ];

    // Helper Component for Bento Consistency
    const BentoCard = ({ children, className = "", noPadding = false }) => (
        <div className={`bg-white rounded-[1.5rem] border border-zinc-200/60 shadow-sm transition-all duration-300 hover:shadow-md ${noPadding ? '' : 'p-6'} ${className}`}>
            {children}
        </div>
    );

    return (
        <AdminLayout title="Payment Verification">
            <Head title="Payments" />

            <div className="space-y-6 pb-12">
                
                {/* 1. HEADER & SUMMARY */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-2">
                    <div>
                        <p className="text-zinc-400 text-xs font-semibold uppercase tracking-[0.2em] mb-1">Treasury Verification</p>
                        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight italic">
                            Payment <span className="text-emerald-600 not-italic uppercase text-2xl font-black">Verify</span>
                        </h1>
                    </div>
                    <BentoCard className="!py-2 !px-4 flex items-center gap-4 bg-zinc-900 text-white border-none">
                        <div className="text-right">
                            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1 text-emerald-400">Database</p>
                            <p className="text-xl font-black leading-none">{payments.total}</p>
                        </div>
                        <div className="h-8 w-px bg-white/10"></div>
                        <div className="bg-emerald-500 rounded-lg p-1.5 shadow-lg shadow-emerald-500/20">
                            <svg className="w-4 h-4 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                    </BentoCard>
                </div>

                {/* 2. FEEDBACK MESSAGES */}
                {(success || error) && (
                    <div className="space-y-2">
                        {success && (
                            <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-100 flex items-center animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="bg-emerald-500 p-1 rounded-full mr-3 text-white shadow-sm">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <span className="font-bold text-sm tracking-tight">{success}</span>
                            </div>
                        )}
                        {error && (
                            <div className="bg-rose-50 text-rose-700 p-4 rounded-2xl border border-rose-100 flex items-center animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="bg-rose-500 p-1 rounded-full mr-3 text-white shadow-sm">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </div>
                                <span className="font-bold text-sm tracking-tight">{error}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* 3. FILTER BAR - Sophisticated Mini Bar */}
                <BentoCard className="!p-4 bg-zinc-50/50 border-dashed">
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[140px]">
                             <select 
                                value={type} 
                                onChange={(e) => setType(e.target.value)}
                                className="w-full rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-2.5 bg-white text-xs font-bold text-zinc-600"
                            >
                                <option value="ALL">All Types</option>
                                <option value="KAS">KAS</option>
                                <option value="WIFI">WIFI</option>
                                <option value="INCIDENTAL">INCIDENTAL</option>
                            </select>
                        </div>

                        <div className="flex-1 min-w-[140px]">
                            <select 
                                value={status} 
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-2.5 bg-white text-xs font-bold text-zinc-600"
                            >
                                <option value="ALL">All Status</option>
                                <option value="PENDING">Pending</option>
                                <option value="VERIFIED">Verified</option>
                                <option value="REJECTED">Rejected</option>
                            </select>
                        </div>

                        <div className="flex-1 min-w-[140px]">
                            <select 
                                value={month} 
                                onChange={(e) => setMonth(e.target.value)}
                                className="w-full rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-2.5 bg-white text-xs font-bold text-zinc-600"
                            >
                                <option value="">All Months</option>
                                {months.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                        </div>

                         <div className="flex-1 min-w-[100px]">
                             <select 
                                value={year} 
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-2.5 bg-white text-xs font-bold text-zinc-600"
                            >
                                <option value="">All Years</option>
                                {[2024, 2025, 2026, 2027].map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                        
                        <button 
                            onClick={handleFilter}
                            className="bg-emerald-500 text-emerald-950 px-8 py-2.5 rounded-xl font-black text-xs hover:bg-emerald-400 transition tracking-widest uppercase shadow-md shadow-emerald-500/10"
                        >
                            Filter
                        </button>
                    </div>
                </BentoCard>

                {/* 4. MAIN DATA TABLE */}
                <BentoCard noPadding className="overflow-hidden border-zinc-200/80">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-50 text-[10px] uppercase text-zinc-400 font-bold tracking-[0.2em] border-b border-zinc-100">
                                <tr>
                                    <th className="px-8 py-5">Resident Profile</th>
                                    <th className="px-6 py-5">Payment Unit</th>
                                    <th className="px-6 py-5 text-right">Amount</th>
                                    <th className="px-6 py-5 text-center">Receipt</th>
                                    <th className="px-6 py-5 text-center">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {payments.data.length > 0 ? payments.data.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-zinc-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-zinc-900 tracking-tight text-base leading-none mb-1.5">{payment.user ? payment.user.name : 'Unknown User'}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-mono font-bold text-zinc-300 border border-zinc-100 px-1.5 py-0.5 rounded uppercase leading-none">ID #{payment.id}</span>
                                                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">{new Date(payment.payment_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                             <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border leading-none inline-block mb-1 ${
                                                payment.type === 'KAS' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                                payment.type === 'WIFI' ? 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100' :
                                                'bg-amber-50 text-amber-600 border-amber-100'
                                            }`}>
                                                {payment.type}
                                            </span>
                                            {payment.bill?.title && (
                                                <p className="text-[10px] text-zinc-400 font-medium truncate max-w-[140px] italic">"{payment.bill.title}"</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-6 text-right font-black text-zinc-900 text-base tracking-tighter">
                                            Rp {payment.amount.toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            {payment.proof_image ? (
                                                <button 
                                                    onClick={() => setSelectedImage(`/storage/${payment.proof_image}`)}
                                                    className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-800 text-[10px] font-bold bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100 transition-all active:scale-95 shadow-sm"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    View Proof
                                                </button>
                                            ) : (
                                                <span className="text-zinc-300 text-[10px] font-medium italic uppercase tracking-widest">No Image</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                             {payment.status === 'VERIFIED' && <span className="text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest bg-emerald-100 text-emerald-700 shadow-sm border border-emerald-200/50">Verified</span>}
                                             {payment.status === 'PENDING' && <span className="text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest bg-amber-100 text-amber-700 shadow-sm border border-amber-200/50">Pending</span>}
                                             {payment.status === 'REJECTED' && <span className="text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest bg-rose-100 text-rose-700 shadow-sm border border-rose-200/50">Rejected</span>}
                                        </td>
                                        <td className="px-8 py-6 text-right space-x-1.5">
                                            {payment.status === 'PENDING' && (
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={() => handleVerify(payment.id)}
                                                        className="text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-emerald-950 px-4 py-2 rounded-xl hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/10 active:scale-95"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button 
                                                        onClick={() => handleReject(payment.id)}
                                                        className="text-[10px] font-black uppercase tracking-wider bg-zinc-100 text-rose-600 px-4 py-2 rounded-xl hover:bg-rose-50 transition-all active:scale-95"
                                                    >
                                                        Decline
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="p-20 text-center text-zinc-400 text-xs italic tracking-wide font-medium">No payment records found matching your selection.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    {payments.links && payments.links.length > 3 && (
                         <div className="p-6 bg-zinc-50/50 border-t border-zinc-100 flex justify-center gap-1.5">
                            {payments.links.map((link, i) => (
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

            {/* LIGHTBOX MODAL */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/90 p-8 backdrop-blur-md transition-all animate-in fade-in duration-300" 
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-full animate-in zoom-in-95 duration-500 ease-out">
                        <img 
                            src={selectedImage} 
                            alt="Proof Attachment" 
                            className="max-w-full max-h-[85vh] rounded-[2.5rem] shadow-2xl border-[6px] border-white/10" 
                        />
                        <button 
                            className="absolute -top-14 right-0 text-white hover:text-emerald-400 transition-colors flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.3em]"
                            onClick={() => setSelectedImage(null)}
                        >
                            Close Viewer
                            <div className="bg-white/10 p-2 rounded-full backdrop-blur-md">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </div>
                        </button>
                    </div>
                </div>
            )}

        </AdminLayout>
    );
}