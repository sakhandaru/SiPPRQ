import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, data }) {
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

            {/* Example "Badge Warna Warni" Section (Placeholder for User Table later) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[300px]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                    <button className="text-sm font-bold text-purple-600 hover:text-purple-700">View All</button>
                </div>
                
                <div className="flex flex-col items-center justify-center text-gray-400 py-12">
                    <p>Transaction history will appear here.</p>
                </div>
            </div>

        </AdminLayout>
    );
}
