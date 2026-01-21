import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function UserDashboard({ user, bills, paymentHistory }) {
    // Logic & Forms (UNCHANGED)
    const { data, setData, post, processing, errors, reset } = useForm({
        bill_ids: [],
        proof_image: null,
    });

    const [showRequestModal, setShowRequestModal] = useState(false);
    const { data: reqData, setData: setReqData, post: postReq, processing: reqProcessing, reset: resetReq } = useForm({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 2 > 12 ? 1 : new Date().getMonth() + 2,
    });

    const handleRequest = (e) => {
        e.preventDefault();
        postReq(route('user.bills.store'), {
            onSuccess: () => {
                setShowRequestModal(false);
                resetReq();
            }
        });
    };

    const currentMonthStr = new Date().toISOString().slice(0, 7);
    const arrearsBills = bills.filter(b => b.month.slice(0, 7) < currentMonthStr && b.status === 'UNPAID');
    const currentMonthBills = bills.filter(b => b.month.slice(0, 7) >= currentMonthStr || (b.month.slice(0, 7) < currentMonthStr && b.status === 'PAID'));
    const hasArrears = arrearsBills.length > 0;

    const toggleBill = (billId) => {
        const selected = new Set(data.bill_ids);
        if (selected.has(billId)) {
            selected.delete(billId);
        } else {
            selected.add(billId);
        }
        setData('bill_ids', Array.from(selected));
    };

    const totalAmount = bills
        .filter(b => data.bill_ids.includes(b.id))
        .reduce((sum, b) => sum + b.amount, 0);

    function handleSubmit(e) {
        e.preventDefault();
        post(route('user.payments.store'), {
            onSuccess: () => reset(),
        });
    }

    // Helper Component for Bento Consistency
    const BentoCard = ({ children, className = "", noPadding = false, onClick = null }) => (
        <div 
            onClick={onClick}
            className={`bg-white rounded-[1.5rem] border border-zinc-200/60 shadow-sm transition-all duration-300 ${onClick ? 'cursor-pointer hover:shadow-md active:scale-[0.98]' : ''} ${noPadding ? '' : 'p-6'} ${className}`}
        >
            {children}
        </div>
    );

    const BillCard = ({ bill }) => {
        const isSelected = data.bill_ids.includes(bill.id);
        const isPaid = bill.status === 'PAID';
        const isPending = bill.latest_payment?.status === 'PENDING';
        
        return (
            <BentoCard 
                onClick={() => !isPaid && !isPending && toggleBill(bill.id)}
                className={`relative overflow-hidden group ${
                    isSelected ? 'bg-zinc-900 border-zinc-900 text-white shadow-xl translate-y-[-4px]' : 'hover:border-emerald-500/30'
                } ${isPaid || isPending ? 'opacity-80' : ''}`}
            >
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${isSelected ? 'text-emerald-400' : 'text-zinc-400'}`}>
                            {bill.type === 'INCIDENTAL' && bill.title ? bill.title : bill.type}
                        </p>
                        <p className={`text-xs font-bold mt-1 ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>{bill.month}</p>
                    </div>
                    
                    {isPaid ? (
                        <span className="bg-emerald-500 text-emerald-950 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">Settled</span>
                    ) : isPending ? (
                        <span className="bg-amber-400 text-amber-950 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">Pending</span>
                    ) : (
                        <div className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all duration-500 ${isSelected ? 'bg-emerald-500 border-emerald-500 rotate-12' : 'border-zinc-200'}`}>
                            {isSelected && <svg className="w-4 h-4 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                        </div>
                    )}
                </div>

                <div className="mt-auto">
                    <p className={`text-2xl font-black tracking-tighter ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                        <span className="text-sm font-light mr-1 opacity-60">Rp</span>
                        {bill.amount.toLocaleString('id-ID')}
                    </p>
                    {isSelected && (
                        <div className="mt-2 flex items-center gap-1.5 animate-pulse">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Ready to process</span>
                        </div>
                    )}
                </div>
                
                {/* Subtle Decorative Gradient for Selected Card */}
                {isSelected && (
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl"></div>
                )}
            </BentoCard>
        );
    };

    return (
        <UserLayout title="Overview">
            <Head title="User Dashboard" />

            <div className="max-w-6xl mx-auto space-y-10 pb-32">
                
                {/* HEADER AREA */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-2">
                    <div>
                        <p className="text-zinc-400 text-xs font-semibold uppercase tracking-[0.2em] mb-1 italic">Personal Dashboard</p>
                        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
                            Welcome back, <span className="text-emerald-600 font-black">{user.name.split(' ')[0]}</span>
                        </h1>
                    </div>
                    <div className="bg-zinc-900 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg border border-white/5">
                        {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}
                    </div>
                </div>

                {/* ARREARS ALERT - SOPHISTICATED REDESIGN */}
                {hasArrears && (
                    <div className="bg-rose-50 border border-rose-100 p-5 rounded-[2rem] flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20 shrink-0">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <div>
                            <p className="text-sm font-black text-rose-900 uppercase tracking-tight leading-none mb-1">Unsettled Arrears Detected</p>
                            <p className="text-xs font-medium text-rose-600/80 italic">You have unpaid bills from previous months. Please prioritize these payments.</p>
                        </div>
                    </div>
                )}

                {/* 1. ARREARS SECTION */}
                {arrearsBills.length > 0 && (
                    <section className="space-y-6">
                        <h3 className="text-xs font-black text-rose-500 uppercase tracking-[0.3em] flex items-center gap-3 px-2">
                            <span className="w-8 h-px bg-rose-200"></span> Tunggakan (Past Due)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {arrearsBills.map(bill => (
                                <BillCard key={bill.id} bill={bill} />
                            ))}
                        </div>
                    </section>
                )}

                {/* 2. CURRENT & FUTURE BILLS */}
                <section className="space-y-6">
                    <div className="flex justify-between items-center px-2">
                        <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] flex items-center gap-3">
                            <span className="w-8 h-px bg-emerald-200"></span> Monthly Stream
                        </h3>
                        <button 
                            onClick={() => setShowRequestModal(true)}
                            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-emerald-600 transition-colors flex items-center gap-2 group"
                        >
                            <svg className="w-4 h-4 bg-zinc-100 p-1 rounded-md group-hover:bg-emerald-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            Request Future Bill
                        </button>
                    </div>

                    {currentMonthBills.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentMonthBills.map(bill => (
                                <BillCard key={bill.id} bill={bill} />
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 border-2 border-dashed border-zinc-200 rounded-[2.5rem] text-center">
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">No active bills found for this terminal.</p>
                        </div>
                    )}
                </section>

                {/* 3. PAYMENT FORM - ELEGANT REDESIGN */}
                {data.bill_ids.length > 0 && (
                    <div id="payment-form" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <BentoCard className="max-w-2xl mx-auto border-zinc-900 bg-white !p-0 overflow-hidden shadow-2xl">
                            <div className="bg-zinc-900 p-8 text-white">
                                <h3 className="text-xl font-black italic tracking-tight mb-6">Settlement <span className="text-emerald-500 not-italic uppercase text-sm tracking-[0.2em] ml-2">Protocol</span></h3>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Queue</p>
                                        <p className="text-xl font-black">{data.bill_ids.length} Item(s)</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Net Amount</p>
                                        <p className="text-xl font-black text-emerald-400">Rp {totalAmount.toLocaleString('id-ID')}</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-8">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Evidence Upload (max 2MB)</p>
                                    <div className="group relative border-2 border-dashed border-zinc-200 rounded-[2rem] p-10 text-center hover:border-emerald-500/50 hover:bg-emerald-50/30 transition-all cursor-pointer">
                                        <input 
                                            type="file" 
                                            accept="image/png, image/jpeg, image/jpg"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            onChange={e => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    if (file.size > 2 * 1024 * 1024) {
                                                        alert('File exceeds 2MB limit.');
                                                        e.target.value = null;
                                                        setData('proof_image', null);
                                                    } else {
                                                        setData('proof_image', file);
                                                    }
                                                }
                                            }}
                                            required 
                                        />
                                        <div className="space-y-4">
                                            <div className="w-16 h-16 bg-zinc-100 rounded-2xl mx-auto flex items-center justify-center text-zinc-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            </div>
                                            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                                                {data.proof_image ? (
                                                    <span className="text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">{data.proof_image.name}</span>
                                                ) : (
                                                    <span>Click or drop <span className="text-zinc-900">Transfer Receipt</span></span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {errors.proof_image && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest">{errors.proof_image}</div>}
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setData({ ...data, bill_ids: [], proof_image: null })}
                                        className="flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:bg-zinc-50 rounded-2xl transition-all"
                                    >
                                        Abort
                                    </button>
                                    <button 
                                        disabled={processing} 
                                        type="submit" 
                                        className="flex-[2] py-4 bg-emerald-500 text-emerald-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-50 active:scale-95"
                                    >
                                        {processing ? 'Processing...' : 'Confirm Settlement'}
                                    </button>
                                </div>
                            </form>
                        </BentoCard>
                    </div>
                )}

                {/* 4. TRANSACTION HISTORY TABLE */}
                <BentoCard noPadding className="overflow-hidden border-zinc-200/80">
                    <div className="bg-zinc-50/80 p-6 border-b border-zinc-100 flex justify-between items-center">
                        <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                             <span className="w-1.5 h-4 bg-zinc-900 rounded-full"></span> Ledger History
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-50/50 text-[10px] uppercase text-zinc-400 font-bold tracking-[0.2em] border-b border-zinc-100">
                                <tr>
                                    <th className="px-8 py-5">Timestamp</th>
                                    <th className="px-6 py-5">Identifier</th>
                                    <th className="px-6 py-5 text-right">Credit</th>
                                    <th className="px-8 py-5 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {paymentHistory.length > 0 ? paymentHistory.map(payment => (
                                    <tr key={payment.id} className="hover:bg-zinc-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-zinc-900 tracking-tight">{new Date(payment.payment_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5 italic">Digital Record</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="font-bold text-zinc-700 tracking-tight leading-none mb-1.5 uppercase">{payment.type}</p>
                                            <span className="text-[10px] font-medium text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded uppercase tracking-tighter">{payment.bill?.month}</span>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <p className="font-black text-zinc-900 text-base tracking-tighter italic">Rp {payment.amount.toLocaleString('id-ID')}</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                             <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm border ${
                                                payment.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200/50' : 
                                                payment.status === 'PENDING' ? 'bg-amber-100 text-amber-700 border-amber-200/50' : 'bg-rose-100 text-rose-700 border-rose-200/50'
                                            }`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-20 text-center text-zinc-400 text-xs italic tracking-widest font-medium">No historical data available for this account.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </BentoCard>
            </div>

            {/* REQUEST MODAL - SOPHISTICATED DESIGN */}
            {showRequestModal && (
                <div className="fixed inset-0 bg-zinc-950/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl border border-zinc-100 animate-in zoom-in-95 duration-500">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-zinc-900 tracking-tighter italic">Request <span className="text-emerald-600 not-italic uppercase text-xl font-black tracking-widest">Future Bill</span></h3>
                            <button onClick={() => setShowRequestModal(false)} className="bg-zinc-100 p-2 rounded-xl hover:bg-zinc-200 transition-colors">
                                <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        
                        <form onSubmit={handleRequest} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Fiscal Year</label>
                                    <input 
                                        type="number" 
                                        value={reqData.year} 
                                        onChange={e => setReqData('year', e.target.value)}
                                        className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 font-bold text-zinc-700"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Target Month</label>
                                    <select 
                                        value={reqData.month}
                                        onChange={e => setReqData('month', e.target.value)}
                                        className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 font-bold text-zinc-700"
                                    >
                                        {[...Array(12)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {new Date(0, i).toLocaleString('id-ID', { month: 'long' })}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="flex gap-4 pt-4">
                                <button 
                                    type="button" 
                                    onClick={() => setShowRequestModal(false)}
                                    className="flex-1 py-4 bg-zinc-100 rounded-2xl font-black text-[10px] text-zinc-400 uppercase tracking-widest hover:bg-zinc-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={reqProcessing}
                                    className="flex-[2] py-4 bg-emerald-500 text-emerald-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 active:scale-95"
                                >
                                    {reqProcessing ? 'Processing...' : 'Commit Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* FLOATING ACTION BAR FOR PAYMENT - REDESIGNED */}
            {data.bill_ids.length > 0 && (
                <div className="fixed bottom-8 inset-x-0 mx-auto w-full max-w-xl px-6 z-[90] animate-in slide-in-from-bottom-20 duration-700 ease-out">
                    <div className="bg-zinc-900/90 backdrop-blur-xl text-white rounded-[2rem] shadow-2xl p-4 pl-8 border border-white/10 flex justify-between items-center group overflow-hidden relative">
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        <div className="relative z-10">
                            <p className="text-[10px] text-emerald-400 uppercase font-black tracking-widest mb-0.5">Aggregate Sum</p>
                            <p className="text-xl font-black tracking-tighter">Rp {totalAmount.toLocaleString('id-ID')}</p>
                        </div>
                        <button
                             onClick={() => document.getElementById('payment-form').scrollIntoView({ behavior: 'smooth' })}
                             className="relative z-10 bg-emerald-500 text-emerald-950 px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all active:scale-95 shadow-xl shadow-emerald-500/20"
                        >
                            Finalize →
                        </button>
                    </div>
                </div>
            )}
        </UserLayout>
    );
}