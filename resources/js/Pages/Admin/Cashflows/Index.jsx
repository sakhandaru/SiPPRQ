import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ cashflows, balance, filters, stats }) {
    const { success } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [proofUrl, setProofUrl] = useState(null);

    const [month, setMonth] = useState(filters.month || '');
    const [year, setYear] = useState(filters.year || '');
    const [direction, setDirection] = useState(filters.direction || 'ALL');

    const { data, setData, post, processing, errors, reset, transform } = useForm({
        direction: 'OUT',
        category: '',
        amount: '',
        description: '',
        proof_file: null,
    });
    
    const handleFilter = () => {
        router.get(route('admin.cashflows.index'), { month, year, direction }, { preserveState: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        transform((data) => ({
            ...data,
            amount: data.amount.toString().replace(/,/g, ''),
        }));

        post(route('admin.cashflows.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    const months = [
        { id: 1, name: 'January' }, { id: 2, name: 'February' }, { id: 3, name: 'March' },
        { id: 4, name: 'April' }, { id: 5, name: 'May' }, { id: 6, name: 'June' },
        { id: 7, name: 'July' }, { id: 8, name: 'August' }, { id: 9, name: 'September' },
        { id: 10, name: 'October' }, { id: 11, name: 'November' }, { id: 12, name: 'December' }
    ];

    // Helper Component for consistency with Dashboard
    const BentoCard = ({ children, className = "", noPadding = false }) => (
        <div className={`bg-white rounded-[1.5rem] border border-zinc-200/60 shadow-sm transition-all duration-300 hover:shadow-md ${noPadding ? '' : 'p-6'} ${className}`}>
            {children}
        </div>
    );

    return (
        <AdminLayout title="Cashflow Management">
            <Head title="Cashflow Management" />
            
            <div className="space-y-6 pb-12">
                
                {/* 1. HEADER SECTION */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-2">
                    <div>
                        <p className="text-zinc-400 text-xs font-semibold uppercase tracking-[0.2em] mb-1">Financial Records</p>
                        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight italic">
                            Cashflow <span className="text-emerald-600 not-italic">Stream</span>
                        </h1>
                    </div>
                    <button 
                        onClick={() => setShowModal(true)}
                        className="bg-zinc-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-zinc-800 transition shadow-lg flex items-center gap-2 group"
                    >
                        <div className="bg-emerald-500 rounded-lg p-1 group-hover:rotate-90 transition-transform">
                            <svg className="w-4 h-4 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        </div>
                        Record Transaction
                    </button>
                </div>

                {success && (
                    <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl border border-emerald-100 flex items-center animate-fade-in animate-in slide-in-from-top-2">
                        <div className="bg-emerald-500 p-1 rounded-full mr-3 text-white">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <span className="font-bold text-sm tracking-tight">{success}</span>
                    </div>
                )}

                {/* 2. STATS GRID - Minimalist Style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <BentoCard className="bg-gradient-to-br from-emerald-950 to-zinc-900 !text-white border-none relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-emerald-400/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Total Liquidity</p>
                            <p className="text-3xl font-black tracking-tighter">Rp {balance ? balance.current_balance.toLocaleString('id-ID') : 0}</p>
                        </div>
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-3xl"></div>
                    </BentoCard>

                    <BentoCard>
                        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Total Income
                        </p>
                        <p className="text-3xl font-black text-zinc-900 tracking-tighter">+ Rp {stats?.total_in ? parseInt(stats.total_in).toLocaleString('id-ID') : 0}</p>
                    </BentoCard>

                    <BentoCard>
                        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Total Expense
                        </p>
                        <p className="text-3xl font-black text-zinc-900 tracking-tighter">- Rp {stats?.total_out ? parseInt(stats.total_out).toLocaleString('id-ID') : 0}</p>
                    </BentoCard>
                </div>

                {/* 3. FILTERS - Clean Bar */}
                <BentoCard className="!p-4 bg-zinc-50/50 border-dashed">
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[180px]">
                            <select 
                                value={direction} 
                                onChange={(e) => setDirection(e.target.value)}
                                className="w-full rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-2.5 bg-white text-xs font-bold text-zinc-600"
                            >
                                <option value="ALL">All Directions</option>
                                <option value="IN">Income (IN)</option>
                                <option value="OUT">Expense (OUT)</option>
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
                            className="bg-emerald-500 text-emerald-950 px-8 py-2.5 rounded-xl font-black text-xs hover:bg-emerald-400 transition tracking-widest uppercase"
                        >
                            Filter
                        </button>
                    </div>
                </BentoCard>

                {/* 4. DATA TABLE - Sophisticated Look */}
                <BentoCard noPadding className="overflow-hidden border-zinc-200/80">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-50 text-[10px] uppercase text-zinc-400 font-bold tracking-[0.2em] border-b border-zinc-100">
                                <tr>
                                    <th className="px-8 py-5">Date & Time</th>
                                    <th className="px-6 py-5">Activity</th>
                                    <th className="px-6 py-5 text-right">Amount</th>
                                    <th className="px-6 py-5 text-center">Reference</th>
                                    <th className="px-8 py-5 text-right">Auditor</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {cashflows.data.length > 0 ? cashflows.data.map((flow) => (
                                    <tr key={flow.id} className="hover:bg-zinc-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-zinc-900 tracking-tight">{new Date(flow.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                            <p className="text-[10px] font-medium text-zinc-400 mt-0.5 uppercase">{new Date(flow.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${
                                                    flow.direction === 'IN' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                                }`}>
                                                    {flow.direction === 'IN' ? 'IN' : 'OUT'}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-zinc-800 leading-none mb-1">{flow.category}</p>
                                                    <p className="text-xs text-zinc-400 truncate max-w-[200px] italic">{flow.description || 'No description'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-6 text-right font-black text-base tracking-tighter ${flow.direction === 'IN' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {flow.direction === 'IN' ? '+' : '-'} {parseInt(flow.amount).toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            {flow.proof_file_path ? (
                                                <button 
                                                    onClick={() => setProofUrl(`/storage/${flow.proof_file_path}`)}
                                                    className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-800 text-[10px] font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 transition-all"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                                    View
                                                </button>
                                            ) : (
                                                <span className="text-zinc-300 text-[10px] font-medium italic">Empty</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <p className="text-xs font-bold text-zinc-900 tracking-tight">{flow.creator ? flow.creator.name : 'System'}</p>
                                            <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-tighter">Verified Agent</p>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="p-16 text-center text-zinc-400 text-xs italic">No transactions found in this period.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION - Minimalist Style */}
                    {cashflows.links && cashflows.links.length > 3 && (
                        <div className="p-6 bg-zinc-50/50 border-t border-zinc-100 flex justify-center gap-1">
                            {cashflows.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                                        link.active ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:bg-white border border-transparent hover:border-zinc-200'
                                    } ${!link.url && 'opacity-30 cursor-not-allowed'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </BentoCard>
            </div>

            {/* MODALS - Updated Style */}
            {proofUrl && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-zinc-950/90 p-6 backdrop-blur-md transition-all" onClick={() => setProofUrl(null)}>
                     <div className="relative max-w-4xl max-h-screen animate-in zoom-in-95 duration-300">
                        <img src={proofUrl} alt="Proof" className="max-w-full max-h-[85vh] rounded-[2rem] shadow-2xl border-4 border-white" />
                        <button className="absolute -top-12 right-0 text-white hover:text-emerald-400 transition-colors flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                            Close <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                     </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl border border-zinc-100 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-zinc-900 tracking-tighter italic">Record <span className="text-emerald-600 not-italic">Tx</span></h3>
                            <button onClick={() => setShowModal(false)} className="bg-zinc-100 p-2 rounded-xl hover:bg-zinc-200 transition-colors">
                                <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-400 mb-3 block">Flow Direction</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setData('direction', 'IN')}
                                        className={`py-3 rounded-2xl font-bold text-xs transition-all border-2 ${data.direction === 'IN' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-zinc-100 text-zinc-400 hover:border-zinc-200'}`}
                                    >
                                        Money IN
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setData('direction', 'OUT')}
                                        className={`py-3 rounded-2xl font-bold text-xs transition-all border-2 ${data.direction === 'OUT' ? 'bg-rose-50 border-rose-500 text-rose-700' : 'bg-white border-zinc-100 text-zinc-400 hover:border-zinc-200'}`}
                                    >
                                        Money OUT
                                    </button>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">Category</label>
                                    <select
                                        className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-sm font-bold text-zinc-700"
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Category...</option>
                                        <option value="OPERATIONAL">Operational</option>
                                        <option value="CONSTRUCTION">Construction</option>
                                        <option value="ACTIVITY">Santri Activity</option>
                                        <option value="CONSUMPTION">Consumption</option>
                                        <option value="MAINTENANCE">Maintenance</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">Amount</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 font-black text-lg text-zinc-900"
                                            placeholder="0"
                                            value={data.amount}
                                            onChange={(e) => {
                                                let v = e.target.value.replace(/[^0-9]/g, '');
                                                if (v) v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                setData('amount', v);
                                            }}
                                            required
                                        />
                                        <span className="absolute right-4 top-3.5 text-[10px] font-black text-zinc-300">IDR</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">Proof Attachment</label>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        className="w-full text-xs font-medium text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-zinc-900 file:text-white hover:file:bg-zinc-800 transition-all border border-zinc-200 rounded-2xl p-2"
                                        onChange={e => setData('proof_file', e.target.files[0])}
                                        required={data.direction === 'OUT'}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-emerald-500 text-emerald-950 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                                >
                                    {processing ? 'Processing...' : 'Confirm Transaction'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}