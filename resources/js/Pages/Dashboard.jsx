import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, data, latestResidents, latestPayments, latestCashflows }) {
    return (
        <AdminLayout title="Overview">
            <Head title="Admin Dashboard" />

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Balance Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40 relative overflow-hidden group hover:shadow-md transition">
                    <div className="z-10">
                        <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Total Balance</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">
                            Rp {data.balance.current_balance_fmt}
                        </h3>
                    </div>
                    <div className="z-10 mt-4 flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-lg">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        <span>Active</span>
                    </div>
                     <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-gray-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                </div>

                {/* Total In Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40 relative overflow-hidden group hover:shadow-md transition">
                     <div className="z-10">
                        <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Total Money In</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">
                            Rp {data.total_in_fmt}
                        </h3>
                    </div>
                     <div className="z-10 mt-4 flex items-center text-sm font-medium text-blue-600 bg-blue-50 w-fit px-2 py-1 rounded-lg">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
                        <span>Income</span>
                    </div>
                    <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-blue-50 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
                </div>

                {/* Total Out Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40 relative overflow-hidden group hover:shadow-md transition">
                     <div className="z-10">
                        <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Total Expenses</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">
                            Rp {data.total_out_fmt}
                        </h3>
                    </div>
                     <div className="z-10 mt-4 flex items-center text-sm font-medium text-orange-600 bg-orange-50 w-fit px-2 py-1 rounded-lg">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
                        <span>Expenses</span>
                    </div>
                    <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-orange-50 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
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
