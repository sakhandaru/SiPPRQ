import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, data, latestResidents, latestPayments, latestCashflows }) {
    
    const BentoCard = ({ children, className = "", span = "", href = null }) => {
        const baseClasses = `bg-white rounded-[1.5rem] border border-zinc-200/60 p-6 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 group relative overflow-hidden ${className}`;
        
        return (
            <div className={`${span} h-full`}>
                {href ? (
                    <Link href={href} className={`${baseClasses} block h-full`}>{children}</Link>
                ) : (
                    <div className={`${baseClasses} h-full`}>{children}</div>
                )}
            </div>
        );
    };

    return (
        <AdminLayout title="Overview">
            <Head title="Admin Dashboard" />

            <div className="flex flex-col h-[calc(100vh-100px)] gap-6 p-2 overflow-hidden">
                
                {/* 1. TOP HEADER & GREETING */}
                <div className="flex justify-between items-end shrink-0">
                    <div>
                        <p className="text-zinc-400 text-xs font-semibold uppercase tracking-[0.2em] mb-1">Dashboard</p>
                        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
                            Selamat Pagi, <span className="text-emerald-600 font-extrabold">{auth.user.name.split('')}</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right mr-3 hidden md:block">
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Status</p>
                            <p className="text-xs font-bold text-emerald-500 flex items-center gap-1 justify-end">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> System Operational
                            </p>
                        </div>
                        <div className="bg-zinc-900 text-white px-4 py-2 rounded-2xl text-xs font-mono shadow-lg">
                            {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })} • {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                </div>

                {/* 2. MAIN BENTO GRID */}
                <div className="grid grid-cols-12 grid-rows-10 gap-5 flex-1 min-h-0">
                    
                    {/* TOTAL BALANCE - Elegant & Wide */}
                    <BentoCard span="col-span-8 row-span-4" className="bg-gradient-to-br from-zinc-900 to-zinc-800 !text-white !p-8">
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Total Treasury Balance</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-emerald-500 text-2xl font-light">Rp</span>
                                        <h2 className="text-6xl font-black tracking-tighter">
                                            {data.balance.current_balance_fmt.split(',')[0]}
                                        </h2>
                                    </div>
                                </div>
                                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                            </div>
                            
                            <div className="flex gap-8 items-center pt-6 border-t border-white/5">
                                <div>
                                    <p className="text-zinc-500 text-[10px] font-bold uppercase mb-1">Monthly Income</p>
                                    <p className="text-xl font-bold text-emerald-400">+{data.total_in_fmt}</p>
                                </div>
                                <div className="w-px h-8 bg-white/5"></div>
                                <div>
                                    <p className="text-zinc-500 text-[10px] font-bold uppercase mb-1">Monthly Expense</p>
                                    <p className="text-xl font-bold text-rose-400">-{data.total_out_fmt}</p>
                                </div>
                            </div>
                        </div>
                        {/* Subtle Glow Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                    </BentoCard>

                    {/* QUICK ALERTS - Two Stacked Cards */}
                    <BentoCard 
                        span="col-span-2 row-span-4" 
                        href={route('admin.payments.index', { status: 'PENDING' })}
                        className={`border-none ${data.pending_payments_count > 0 ? 'bg-amber-50 shadow-amber-500/10' : 'bg-zinc-50'}`}
                    >
                        <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">Verify</p>
                        <div className="my-auto">
                            <p className={`text-6xl font-black tracking-tighter ${data.pending_payments_count > 0 ? 'text-amber-600' : 'text-zinc-300'}`}>
                                {data.pending_payments_count}
                            </p>
                        </div>
                        <p className="text-[10px] font-medium text-amber-600/60 leading-tight">Payments waiting for confirmation</p>
                    </BentoCard>

                    <BentoCard 
                        span="col-span-2 row-span-4" 
                        href={route('admin.tracker.index', { status: 'UNPAID' })}
                        className="bg-rose-50 border-none"
                    >
                        <p className="text-[10px] font-bold text-rose-700 uppercase tracking-widest">Unpaid</p>
                        <div className="my-auto">
                            <p className="text-6xl font-black text-rose-600 tracking-tighter">
                                {data.unpaid_bills_count}
                            </p>
                        </div>
                        <p className="text-[10px] font-medium text-rose-600/60 leading-tight">Residents with active bills</p>
                    </BentoCard>

                    {/* LIVE STREAM - Middle Section */}
                    <BentoCard span="col-span-7 row-span-6" className="flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1 h-3 bg-emerald-500 rounded-full"></span>
                                Cashflow Activity
                            </h3>
                            <Link href={route('admin.cashflows.index')} className="text-[10px] font-bold text-zinc-400 hover:text-emerald-500 transition-colors uppercase">View Archive</Link>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
                            {latestCashflows.length > 0 ? latestCashflows.map((flow) => (
                                <div key={flow.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-100 group/item">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${flow.direction === 'IN' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                            {flow.direction === 'IN' ? '↓' : '↑'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-zinc-800 group-hover/item:text-emerald-700 transition-colors">{flow.category}</p>
                                            <p className="text-[10px] text-zinc-400 font-medium">{new Date(flow.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
                                        </div>
                                    </div>
                                    <p className={`text-sm font-black ${flow.direction === 'IN' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {flow.direction === 'IN' ? '+' : '-'} {parseInt(flow.amount).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            )) : (
                                <div className="h-full flex items-center justify-center text-zinc-400 text-xs italic">No transactions record.</div>
                            )}
                        </div>
                    </BentoCard>

                    {/* RESIDENTS - Dynamic Circle Avatars */}
                    <BentoCard span="col-span-5 row-span-3" className="flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Active Residents</h3>
                            <p className="text-2xl font-black text-zinc-900">{data.active_residents_count}</p>
                        </div>
                        <div className="flex -space-x-3 my-4">
                            {latestResidents.slice(0, 8).map((u, i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-600 ring-1 ring-zinc-200" title={u.name}>
                                    {u.name.charAt(0)}
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-4 border-white bg-emerald-500 flex items-center justify-center text-[10px] font-black text-white ring-1 ring-emerald-600">
                                +{data.active_residents_count > 8 ? data.active_residents_count - 8 : 0}
                            </div>
                        </div>
                        <Link href={route('admin.users.index')} className="w-full py-2 bg-zinc-50 rounded-xl text-[10px] font-bold text-zinc-500 text-center hover:bg-emerald-50 hover:text-emerald-600 transition-all uppercase tracking-widest">
                            Resident Directory
                        </Link>
                    </BentoCard>

                    {/* REPORT HUB - Minimalist Action */}
                    <BentoCard span="col-span-5 row-span-3" className="!p-0 border-none shadow-lg shadow-emerald-500/10">
                        <Link href={route('admin.reports.index')} className="w-full h-full flex items-center justify-between p-6 bg-emerald-600 hover:bg-emerald-700 transition-colors text-white group/btn">
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Analytics</p>
                                <h4 className="text-xl font-bold tracking-tight leading-none">Download <br/> Monthly Report</h4>
                            </div>
                            <div className="bg-white/20 p-4 rounded-2xl group-hover/btn:scale-110 transition-transform backdrop-blur-md">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                        </Link>
                    </BentoCard>

                </div>
            </div>

            <style jsx global>{`
                body { background-color: #fcfcfd; overflow: hidden; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d4d4d8; }
            `}</style>
        </AdminLayout>
    );
}