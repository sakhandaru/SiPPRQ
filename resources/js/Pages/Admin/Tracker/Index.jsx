import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ bills, stats, filters, users }) {
    const [year, setYear] = useState(filters.year || '');
    const [month, setMonth] = useState(filters.month || '');
    const [status, setStatus] = useState(filters.status || 'ALL');
    const [type, setType] = useState(filters.type || 'ALL');

    // Generate Bill Form Logic (UNCHANGED)
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [billType, setBillType] = useState('MONTHLY'); 
    
    const { data: genData, setData: setGenData, post: postGen, processing: genProcessing, reset: resetGen } = useForm({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 2 > 12 ? 1 : new Date().getMonth() + 2,
    });

    const { data: manualData, setData: setManualData, post: postManual, processing: manualProcessing, reset: resetManual } = useForm({
        title: '',
        amount: '',
        user_ids: [],
    });

    const toggleUser = (id) => {
        if (manualData.user_ids.includes(id)) {
            setManualData('user_ids', manualData.user_ids.filter(uid => uid !== id));
        } else {
            setManualData('user_ids', [...manualData.user_ids, id]);
        }
    };
    
    const selectAllUsers = (e) => {
        if (e.target.checked) {
            setManualData('user_ids', users.map(u => u.id));
        } else {
            setManualData('user_ids', []);
        }
    }

    const handleFilter = () => {
        router.get(route('admin.tracker.index'), { year, month, status, type }, { preserveState: true, preserveScroll: true });
    };

    const handleGenerate = (e) => {
        e.preventDefault();
        if (billType === 'MONTHLY') {
            postGen(route('admin.bills.generate'), {
                onSuccess: () => {
                    setShowGenerateModal(false);
                    resetGen();
                    handleFilter();
                }
            });
        } else {
            const dataToSubmit = {
                ...manualData,
                amount: manualData.amount.toString().replace(/,/g, ''),
            };
             router.post(route('admin.bills.store'), dataToSubmit, {
                onSuccess: () => {
                    setShowGenerateModal(false);
                    resetManual();
                    handleFilter();
                },
                preserveScroll: true
             });
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
        <AdminLayout title="Bill Tracker">
            <Head title="Bill Tracker" />

            <div className="space-y-6 pb-12 px-2">
                
                {/* 1. SOPHISTICATED HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <p className="text-zinc-400 text-xs font-semibold uppercase tracking-[0.2em] mb-1">Invoicing System</p>
                        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight italic">
                            Bill <span className="text-emerald-600 not-italic uppercase text-2xl font-black tracking-tighter">Tracker</span>
                        </h1>
                    </div>
                    <button 
                        onClick={() => setShowGenerateModal(true)}
                        className="bg-zinc-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-zinc-800 transition shadow-lg flex items-center gap-2 group active:scale-95"
                    >
                        <div className="bg-emerald-500 rounded-lg p-1 group-hover:rotate-90 transition-transform">
                            <svg className="w-4 h-4 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        </div>
                        Generate Bill
                    </button>
                </div>

                {/* 2. STATS BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <BentoCard className="border-l-4 border-l-emerald-500">
                        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-4">Collected Funds</p>
                        <div className="flex items-end justify-between">
                            <p className="text-4xl font-black text-zinc-900 tracking-tighter italic">{stats.total_paid}</p>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg uppercase tracking-widest">Paid</span>
                        </div>
                    </BentoCard>

                    <BentoCard className="border-l-4 border-l-amber-500">
                        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-4">Pending Audit</p>
                        <div className="flex items-end justify-between">
                            <p className="text-4xl font-black text-zinc-900 tracking-tighter italic">{stats.total_waiting}</p>
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg uppercase tracking-widest">Waiting</span>
                        </div>
                    </BentoCard>

                    <BentoCard className="border-l-4 border-l-rose-500">
                        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-4">Receivables</p>
                        <div className="flex items-end justify-between">
                            <p className="text-4xl font-black text-zinc-900 tracking-tighter italic">{stats.total_unpaid}</p>
                            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg uppercase tracking-widest">Unpaid</span>
                        </div>
                    </BentoCard>
                </div>

                {/* 3. FILTER BAR */}
                <BentoCard className="!p-4 bg-zinc-50/50 border-dashed">
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[140px]">
                             <select 
                                value={type} 
                                onChange={(e) => setType(e.target.value)}
                                className="w-full rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-2.5 bg-white text-xs font-bold text-zinc-600"
                            >
                                <option value="ALL">All Units</option>
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
                                <option value="PAID">Paid</option>
                                <option value="WAITING">Waiting</option>
                                <option value="UNPAID">Unpaid</option>
                            </select>
                        </div>

                        <div className="flex-1 min-w-[140px]">
                            <select 
                                value={month} 
                                onChange={(e) => setMonth(e.target.value)}
                                className="w-full rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-2.5 bg-white text-xs font-bold text-zinc-600"
                            >
                                <option value="">Global Month</option>
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
                                <option value="">Global Year</option>
                                {[2024, 2025, 2026, 2027].map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>

                        <button 
                            onClick={handleFilter}
                            className="bg-emerald-500 text-emerald-950 px-8 py-2.5 rounded-xl font-black text-xs hover:bg-emerald-400 transition tracking-widest uppercase shadow-md shadow-emerald-500/10"
                        >
                            Execute
                        </button>
                    </div>
                </BentoCard>

                {/* 4. TRACKER TABLE */}
                <BentoCard noPadding className="overflow-hidden border-zinc-200/80">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-50 text-[10px] uppercase text-zinc-400 font-bold tracking-[0.2em] border-b border-zinc-100">
                                <tr>
                                    <th className="px-8 py-5">Resident Name</th>
                                    <th className="px-6 py-5">Bill Objective</th>
                                    <th className="px-6 py-5 text-right">Amount</th>
                                    <th className="px-6 py-5 text-center">Status</th>
                                    <th className="px-8 py-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {bills.data.length > 0 ? bills.data.map((bill) => (
                                    <tr key={bill.id} className="hover:bg-zinc-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-zinc-900 tracking-tight text-base leading-none mb-1.5">{bill.resident_name}</p>
                                            <p className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-tighter">{bill.resident_phone || 'NO CONTACT'}</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase leading-none border ${
                                                    bill.type === 'KAS' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                                    bill.type === 'WIFI' ? 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100' :
                                                    'bg-amber-50 text-amber-600 border-amber-100'
                                                }`}>
                                                    {bill.type}
                                                </span>
                                                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">{bill.month_name}</span>
                                            </div>
                                            <p className="font-bold text-zinc-800 tracking-tight">{bill.title}</p>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <p className="font-black text-zinc-900 text-base tracking-tighter italic">
                                                Rp {bill.amount.toLocaleString('id-ID')}
                                            </p>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            {bill.status === 'PAID' && <span className="text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest bg-emerald-100 text-emerald-700 shadow-sm border border-emerald-200/50">Settled</span>}
                                            {bill.status === 'WAITING' && <span className="text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest bg-amber-100 text-amber-700 shadow-sm border border-amber-200/50">In Review</span>}
                                            {bill.status === 'UNPAID' && <span className="text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest bg-rose-100 text-rose-700 shadow-sm border border-rose-200/50">Arrears</span>}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            {bill.status === 'WAITING' ? (
                                                <Link 
                                                    href={route('admin.payments.index')} 
                                                    className="inline-flex items-center gap-1.5 bg-zinc-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition shadow-md active:scale-95"
                                                >
                                                    Audit
                                                </Link>
                                            ) : bill.status === 'UNPAID' ? (
                                                <a 
                                                    href={`https://wa.me/${bill.resident_phone ? bill.resident_phone.replace(/^0/, '62') : ''}?text=${encodeURIComponent(`Assalamualaikum ${bill.resident_name}, mohon melunasi tagihan *${bill.title} (${bill.month_name})* sebesar Rp ${bill.amount.toLocaleString('id-ID')}. Terima kasih - Admin SiPPRQ.`)}`}
                                                    target="_blank" rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 bg-emerald-500 text-emerald-950 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition shadow-md active:scale-95"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.628 1.213 2.827c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                                    Remind
                                                </a>
                                            ) : (
                                                <span className="text-zinc-300 font-black">—</span>
                                            )}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="p-20 text-center text-zinc-400 text-xs italic tracking-wide font-medium">No billing records found matching selection.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    {bills.links && bills.links.length > 3 && (
                         <div className="p-6 bg-zinc-50/50 border-t border-zinc-100 flex justify-center gap-1.5">
                            {bills.links.map((link, i) => (
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

             {/* 5. GENERATE MODAL (Refined Forms) */}
             {showGenerateModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-100 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-zinc-900 tracking-tighter italic">Create <span className="text-emerald-600 not-italic uppercase text-xl font-black tracking-widest">Invoicing</span></h3>
                            <button onClick={() => setShowGenerateModal(false)} className="bg-zinc-100 p-2 rounded-xl hover:bg-zinc-200 transition-colors">
                                <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        
                        {/* TABS UPDATED STYLE */}
                        <div className="flex bg-zinc-100 p-1 rounded-2xl mb-8">
                            <button 
                                onClick={() => setBillType('MONTHLY')}
                                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${billType === 'MONTHLY' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
                            >
                                Routine
                            </button>
                            <button 
                                onClick={() => setBillType('MANUAL')}
                                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${billType === 'MANUAL' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
                            >
                                Incidental
                            </button>
                        </div>

                        <form onSubmit={handleGenerate} className="space-y-6">
                            {billType === 'MONTHLY' ? (
                                <div className="space-y-5">
                                    <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
                                         <p className="text-[10px] font-bold text-indigo-700 leading-relaxed uppercase tracking-widest">
                                            Intelligence: Auto-generation will skip existing records to prevent duplicates.
                                         </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">Fiscal Year</label>
                                            <input 
                                                type="number" 
                                                value={genData.year} 
                                                onChange={e => setGenData('year', e.target.value)}
                                                className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 font-bold text-zinc-700"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">Timeline Month</label>
                                            <select 
                                                value={genData.month}
                                                onChange={e => setGenData('month', e.target.value)}
                                                className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 font-bold text-zinc-700"
                                            >
                                                {months.map(m => (
                                                    <option key={m.id} value={m.id}>{m.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">Bill Title</label>
                                        <input 
                                            type="text" 
                                            value={manualData.title} 
                                            placeholder="e.g. Incidental Renovation"
                                            onChange={e => setManualData('title', e.target.value)}
                                            className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 font-bold text-zinc-700"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">Nominal Amount</label>
                                        <div className="relative">
                                            <input 
                                                type="text" 
                                                value={manualData.amount} 
                                                placeholder="0"
                                                onChange={(e) => {
                                                    let v = e.target.value.replace(/[^0-9]/g, '');
                                                    if (v) v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                    setManualData('amount', v);
                                                }}
                                                className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 font-black text-lg text-zinc-900"
                                                required
                                            />
                                            <span className="absolute right-4 top-3.5 text-[10px] font-black text-zinc-300">IDR</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-3">
                                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Target Core</label>
                                            <label className="flex items-center text-[10px] font-black text-emerald-600 cursor-pointer uppercase tracking-widest">
                                                <input 
                                                    type="checkbox" 
                                                    onChange={selectAllUsers}
                                                    checked={manualData.user_ids.length === users.length && users.length > 0}
                                                    className="mr-2 rounded border-zinc-300 text-emerald-500 focus:ring-0"
                                                />
                                                Select All
                                            </label>
                                        </div>
                                        <div className="max-h-48 overflow-y-auto border border-zinc-100 rounded-[1.5rem] p-2 space-y-1 custom-scrollbar">
                                            {users.map(u => (
                                                <label key={u.id} className="flex items-center p-3 hover:bg-zinc-50 rounded-xl cursor-pointer transition-colors group">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={manualData.user_ids.includes(u.id)}
                                                        onChange={() => toggleUser(u.id)}
                                                        className="rounded border-zinc-300 text-emerald-500 focus:ring-0 mr-3"
                                                    />
                                                    <span className="text-sm font-bold text-zinc-700 group-hover:text-emerald-700 transition-colors">{u.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <div className="text-[9px] font-black text-emerald-500 mt-3 text-right uppercase tracking-[0.2em]">
                                            {manualData.user_ids.length} Active Targets Selected
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 pt-6 border-t border-zinc-100">
                                <button 
                                    type="button" 
                                    onClick={() => setShowGenerateModal(false)}
                                    className="flex-1 py-4 bg-zinc-100 rounded-2xl font-black text-[10px] text-zinc-400 uppercase tracking-widest hover:bg-zinc-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={genProcessing || manualProcessing}
                                    className="flex-1 py-4 bg-emerald-500 text-emerald-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 active:scale-95"
                                >
                                    {genProcessing || manualProcessing ? 'Processing...' : (billType === 'MONTHLY' ? 'Commit Routine' : 'Commit Bill')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}