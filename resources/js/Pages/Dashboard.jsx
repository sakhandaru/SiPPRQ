import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, data, latestResidents, latestPayments, latestCashflows }) {
    return (
        <AdminLayout title="Overview">
            <Head title="Admin Dashboard" />

            {/* 1. ACTION CENTER */}
            <h2 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">Action Center</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Pending Verification */}
                <a href={route('admin.payments.index', { status: 'PENDING' })} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition cursor-pointer">
                    <div className="z-10 flex justify-between items-start">
                        <div>
                            <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Pending Verification</p>
                            <h3 className={`text-4xl font-black ${data.pending_payments_count > 0 ? 'text-orange-500' : 'text-gray-900'}`}>
                                {data.pending_payments_count}
                            </h3>
                        </div>
                        <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                    </div>
                    <div className="z-10 text-xs font-bold text-gray-400 group-hover:text-orange-600 transition">View Payments →</div>
                </a>

                {/* Unpaid Bills */}
                <a href={route('admin.tracker.index', { status: 'UNPAID', month: new Date().getMonth() + 1, year: new Date().getFullYear() })} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition cursor-pointer">
                    <div className="z-10 flex justify-between items-start">
                        <div>
                            <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Unpaid Bills (This Month)</p>
                            <h3 className="text-4xl font-black text-gray-900">
                                {data.unpaid_bills_count}
                            </h3>
                        </div>
                        <div className="bg-red-50 p-2 rounded-lg text-red-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                        </div>
                    </div>
                    <div className="z-10 text-xs font-bold text-gray-400 group-hover:text-red-600 transition">Check Tracker →</div>
                </a>

                {/* Active Residents */}
                <a href={route('admin.users.index')} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition cursor-pointer">
                    <div className="z-10 flex justify-between items-start">
                        <div>
                            <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Active Residents</p>
                            <h3 className="text-4xl font-black text-gray-900">
                                {data.active_residents_count}
                            </h3>
                        </div>
                        <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                    </div>
                    <div className="z-10 text-xs font-bold text-gray-400 group-hover:text-indigo-600 transition">Manage Residents →</div>
                </a>
            </div>

            {/* 2. FINANCIAL HEALTH */}
            <h2 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">Financial Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Balance Card */}
                <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-md border border-gray-800 flex flex-col justify-between h-32 relative overflow-hidden">
                    <div className="z-10 relative">
                        <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Current Balance</p>
                        <h3 className="text-3xl font-black tracking-tight">
                            Rp {data.balance.current_balance_fmt}
                        </h3>
                    </div>
                     <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800 rounded-full mix-blend-overlay filter blur-3xl opacity-50 -mr-16 -mt-16"></div>
                </div>

                {/* Monthly Income */}
                 <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 relative overflow-hidden group">
                     <div>
                        <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Money In (This Month)</p>
                        <h3 className="text-2xl font-black text-emerald-600">
                             + Rp {data.total_in_fmt}
                        </h3>
                    </div>
                     <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                </div>

                {/* Monthly Expenses */}
                 <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 relative overflow-hidden group">
                     <div>
                        <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Expires (This Month)</p>
                        <h3 className="text-2xl font-black text-red-600">
                             - Rp {data.total_out_fmt}
                        </h3>
                    </div>
                     <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                        <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                </div>
            </div>

            {/* PREVIEW PANELS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 1. Latest Residents */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            Latest Residents
                        </h3>
                        <a href={route('admin.users.index')} className="text-sm font-bold text-indigo-600 hover:text-indigo-700">View All</a>
                    </div>
                    <div className="flex-1 space-y-3">
                        {latestResidents.length > 0 ? latestResidents.map(user => (
                            <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs mr-3">
                                        {user.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-gray-400">Joined {new Date(user.created_at).toLocaleDateString()}</span>
                            </div>
                        )) : (
                             <p className="text-gray-400 text-sm text-center py-4">No residents found.</p>
                        )}
                    </div>
                </div>

                {/* 2. Latest Payments */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Latest Payments
                        </h3>
                        <a href={route('admin.payments.index')} className="text-sm font-bold text-emerald-600 hover:text-emerald-700">View All</a>
                    </div>
                    <div className="flex-1 space-y-3">
                         {latestPayments.length > 0 ? latestPayments.map(payment => (
                            <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs mr-3">Rp</div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{payment.user?.name || 'Unknown'}</p>
                                        <p className="text-xs text-gray-500">{payment.type}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-emerald-600">+Rp {parseInt(payment.amount).toLocaleString('id-ID')}</p>
                                    <p className="text-xs text-gray-400">{new Date(payment.payment_date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-400 text-sm text-center py-4">No verified payments yet.</p>
                        )}
                    </div>
                </div>

                {/* 3. Latest Cashflow */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center">
                           <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
                            Latest Cashflow
                        </h3>
                         <a href={route('admin.cashflows.index')} className="text-sm font-bold text-blue-600 hover:text-blue-700">View All</a>
                    </div>
                    <div className="flex-1 space-y-3">
                         {latestCashflows.length > 0 ? latestCashflows.map(flow => (
                            <div key={flow.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                                <div className="flex items-center">
                                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mr-3 ${flow.direction === 'IN' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                                        {flow.direction === 'IN' ? '↓' : '↑'}
                                   </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 truncate max-w-[150px]">{flow.description}</p>
                                        <p className="text-xs text-gray-500 uppercase">{flow.category}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-bold ${flow.direction === 'IN' ? 'text-blue-600' : 'text-orange-600'}`}>
                                        {flow.direction === 'IN' ? '+' : '-'}Rp {parseInt(flow.amount).toLocaleString('id-ID')}
                                    </p>
                                    <p className="text-xs text-gray-400">{new Date(flow.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-400 text-sm text-center py-4">No cashflow data.</p>
                        )}
                    </div>
                </div>

                {/* 4. Quick Reports */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center">
                           <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Reports Shortcuts
                        </h3>
                        <a href={route('admin.reports.index')} className="text-sm font-bold text-purple-600 hover:text-purple-700">All Reports</a>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <a href={route('admin.reports.cashflow')} className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-2xl hover:bg-purple-100 transition group cursor-pointer border border-transparent hover:border-purple-200">
                             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-purple-600 mb-3 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                             </div>
                             <span className="font-bold text-gray-900">Cashflow Report</span>
                             <span className="text-xs text-gray-500 mt-1">Download PDF</span>
                        </a>

                        <a href={route('admin.reports.payments')} className="flex flex-col items-center justify-center p-4 bg-pink-50 rounded-2xl hover:bg-pink-100 transition group cursor-pointer border border-transparent hover:border-pink-200">
                             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-pink-600 mb-3 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                             </div>
                             <span className="font-bold text-gray-900">Payments Report</span>
                             <span className="text-xs text-gray-500 mt-1">Download PDF</span>
                        </a>
                    </div>
                </div>

            </div>

        </AdminLayout>
    );
}
