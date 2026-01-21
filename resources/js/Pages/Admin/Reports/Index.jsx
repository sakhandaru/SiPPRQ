import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    const years = [2024, 2025, 2026, 2027];
    const months = [
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    // Helper Component for Bento Consistency
    const BentoCard = ({ children, className = "" }) => (
        <div className={`bg-white rounded-[2rem] border border-zinc-200/60 p-8 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 ${className}`}>
            {children}
        </div>
    );

    return (
        <AdminLayout title="Reports Center">
            <Head title="Reports" />

            <div className="space-y-8 pb-12">
                
                {/* 1. HEADER SECTION */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-2">
                    <div>
                        <p className="text-zinc-400 text-xs font-semibold uppercase tracking-[0.2em] mb-1">Intelligence Output</p>
                        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight italic">
                            Reports <span className="text-emerald-600 not-italic uppercase text-2xl font-black">Archive</span>
                        </h1>
                    </div>
                    <div className="hidden md:block">
                        <div className="bg-zinc-900 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                            Reports Center
                        </div>
                    </div>
                </div>

                {/* 2. REPORTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* CASHFLOW REPORTS */}
                    <BentoCard>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-zinc-900 tracking-tight">Cashflow Intelligence</h3>
                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Financial Stream Analysis</p>
                            </div>
                        </div>
                        
                        <form action={route('admin.reports.cashflow')} method="GET" target="_blank" className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 mb-2 block">Timeline Month</label>
                                    <select name="month" className="w-full rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 bg-zinc-50/50 text-sm font-bold text-zinc-700">
                                        <option value="">Full Year</option>
                                        {months.map(m => (
                                            <option key={m.value} value={m.value}>{m.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 mb-2 block">Fiscal Year</label>
                                    <select name="year" className="w-full rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 bg-zinc-50/50 text-sm font-bold text-zinc-700">
                                        <option value="">Global</option>
                                        {years.map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
                                <button 
                                    type="submit" name="export" value="pdf"
                                    className="group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-zinc-900 hover:bg-emerald-600 transition-all duration-300 active:scale-95 shadow-lg shadow-zinc-200"
                                >
                                    <svg className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Export PDF</span>
                                </button>
                                <button 
                                    type="submit" name="export" value="excel"
                                    className="group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 active:scale-95"
                                >
                                    <svg className="w-5 h-5 text-zinc-400 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    <span className="text-[10px] font-black text-zinc-500 group-hover:text-emerald-700 uppercase tracking-[0.2em]">Spreadsheet</span>
                                </button>
                            </div>
                        </form>
                    </BentoCard>

                    {/* PAYMENTS REPORTS */}
                    <BentoCard>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-zinc-900 tracking-tight">Payment Verification</h3>
                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Transaction Status Audit</p>
                            </div>
                        </div>

                        <form action={route('admin.reports.payments')} method="GET" target="_blank" className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 mb-2 block">Month</label>
                                    <select name="month" className="w-full rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 bg-zinc-50/50 text-sm font-bold text-zinc-700">
                                        <option value="">All Months</option>
                                        {months.map(m => (
                                            <option key={m.value} value={m.value}>{m.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 mb-2 block">Year</label>
                                    <select name="year" className="w-full rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 bg-zinc-50/50 text-sm font-bold text-zinc-700">
                                        <option value="">All Years</option>
                                        {years.map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                             <div>
                                <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 mb-2 block">Verification Status</label>
                                <select name="status" className="w-full rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 bg-zinc-50/50 text-sm font-bold text-zinc-700">
                                    <option value="">All Statuses</option>
                                    <option value="VERIFIED">Verified Only</option>
                                    <option value="PENDING">Pending Only</option>
                                    <option value="REJECTED">Rejected Only</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
                                <button 
                                    type="submit" name="export" value="pdf"
                                    className="group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-zinc-900 hover:bg-emerald-600 transition-all duration-300 active:scale-95 shadow-lg shadow-zinc-200"
                                >
                                    <svg className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Export PDF</span>
                                </button>
                                <button 
                                    type="submit" name="export" value="excel"
                                    className="group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 active:scale-95"
                                >
                                    <svg className="w-5 h-5 text-zinc-400 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    <span className="text-[10px] font-black text-zinc-500 group-hover:text-emerald-700 uppercase tracking-[0.2em]">Spreadsheet</span>
                                </button>
                            </div>
                        </form>
                    </BentoCard>
                </div>
            </div>
        </AdminLayout>
    );
}