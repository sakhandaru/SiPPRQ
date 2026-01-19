import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, users, stats, filters }) {
    const [year, setYear] = useState(filters.year);
    const [month, setMonth] = useState(filters.month);
    const [status, setStatus] = useState(filters.status || 'ALL');

    const handleFilter = () => {
        router.get(route('admin.tracker.index'), { year, month, status }, { preserveState: true });
    };

    const months = [
        { id: 1, name: 'January' }, { id: 2, name: 'February' }, { id: 3, name: 'March' },
        { id: 4, name: 'April' }, { id: 5, name: 'May' }, { id: 6, name: 'June' },
        { id: 7, name: 'July' }, { id: 8, name: 'August' }, { id: 9, name: 'September' },
        { id: 10, name: 'October' }, { id: 11, name: 'November' }, { id: 12, name: 'December' }
    ];

    return (
        <AdminLayout title="Payment Tracker">
            <Head title="Payment Tracker" />

            {/* SUMMARY STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Residents</p>
                    <p className="text-3xl font-black text-gray-900 mt-2">{stats.total_users}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Paid</p>
                    <p className="text-3xl font-black text-emerald-600 mt-2">{stats.paid}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-yellow-600 text-xs font-bold uppercase tracking-wider">Waiting Verification</p>
                    <p className="text-3xl font-black text-yellow-600 mt-2">{stats.waiting}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-red-500 text-xs font-bold uppercase tracking-wider">Unpaid</p>
                    <p className="text-3xl font-black text-red-500 mt-2">{stats.unpaid}</p>
                </div>
            </div>

            {/* HEADER & FILTERS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Payment Tracker</h1>
                    <p className="text-gray-500 text-sm mt-1">Monitor monthly payments for all residents.</p>
                </div>
                <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}
                        className="rounded-xl border-gray-200 focus:border-black focus:ring-black"
                    >
                        <option value="ALL">All Status</option>
                        <option value="PAID">Paid</option>
                        <option value="WAITING">Waiting Verification</option>
                        <option value="UNPAID">Unpaid</option>
                        <option value="NO_BILL">No Bill</option>
                    </select>

                    <select 
                        value={month} 
                        onChange={(e) => setMonth(e.target.value)}
                        className="rounded-xl border-gray-200 focus:border-black focus:ring-black"
                    >
                        {months.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>
                    <select 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)}
                        className="rounded-xl border-gray-200 focus:border-black focus:ring-black"
                    >
                        {[2024, 2025, 2026].map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                    <button 
                        onClick={handleFilter}
                        className="bg-black text-white px-6 py-2 rounded-xl font-bold hover:bg-gray-800 transition"
                    >
                        Filter
                    </button>
                </div>
            </div>

            {/* TRACKER TABLE */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs font-bold tracking-wider">
                        <tr>
                            <th className="p-6">Resident Name</th>
                            <th className="p-6 text-center">Status</th>
                            <th className="p-6 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.length > 0 ? users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="p-6">
                                    <p className="font-bold text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-400">{user.email}</p>
                                </td>
                                <td className="p-6 text-center">
                                    {user.status === 'PAID' && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                            PAID
                                        </span>
                                    )}
                                    {user.status === 'WAITING' && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                                            WAITING VERIFICATION
                                        </span>
                                    )}
                                    {user.status === 'UNPAID' && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                                            UNPAID
                                        </span>
                                    )}
                                    {user.status === 'NO_BILL' && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-400">
                                            NO BILL
                                        </span>
                                    )}
                                </td>
                                <td className="p-6 text-right">
                                    {user.status === 'WAITING' ? (
                                        // TODO: Direct link to verify payment
                                        <a href={route('admin.payments.index')} className="text-indigo-600 font-bold text-sm hover:underline">
                                            Verify Now
                                        </a>
                                    ) : (
                                        <span className="text-gray-300 text-sm">-</span>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className="p-8 text-center text-gray-400">
                                    No residents found active in this period.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
