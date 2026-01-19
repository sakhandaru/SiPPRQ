import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, users, stats, filters }) {
    const [year, setYear] = useState(filters.year);
    const [month, setMonth] = useState(filters.month);
    const [status, setStatus] = useState(filters.status || 'ALL');

    // Generate Bill Form
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const { data: genData, setData: setGenData, post: postGen, processing: genProcessing, reset: resetGen } = useForm({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 2 > 12 ? 1 : new Date().getMonth() + 2, // Default to next month
    });

    const handleFilter = () => {
        router.get(route('admin.tracker.index'), { year, month, status }, { preserveState: true });
    };

    const handleGenerate = (e) => {
        e.preventDefault();
        postGen(route('admin.bills.generate'), {
            onSuccess: () => {
                setShowGenerateModal(false);
                resetGen();
            }
        });
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

            {/* GENERATE MODAL */}
            {showGenerateModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6">
                        <h3 className="text-lg font-bold mb-4">Generate Monthly Bill</h3>
                        <form onSubmit={handleGenerate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Year</label>
                                <input 
                                    type="number" 
                                    value={genData.year} 
                                    onChange={e => setGenData('year', e.target.value)}
                                    className="w-full rounded-xl border-gray-300 focus:border-black focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Month</label>
                                <select 
                                    value={genData.month}
                                    onChange={e => setGenData('month', e.target.value)}
                                    className="w-full rounded-xl border-gray-300 focus:border-black focus:ring-black"
                                >
                                    {months.map(m => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button 
                                    type="button" 
                                    onClick={() => setShowGenerateModal(false)}
                                    className="flex-1 py-2 bg-gray-100 rounded-xl font-bold hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={genProcessing}
                                    className="flex-1 py-2 bg-black text-white rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50"
                                >
                                    {genProcessing ? 'Generating...' : 'Generate'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-6">
                 <div>
                    <h2 className="text-xl font-bold text-gray-900">Payment Tracker</h2>
                    <p className="text-gray-500 text-sm">Monitor and verify payments</p>
                </div>
                 <button 
                    onClick={() => setShowGenerateModal(true)}
                    className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition flex items-center text-sm"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Generate Bill
                </button>
            </div>

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
                                        // Direct link to verify payment
                                        <a href={route('admin.payments.index')} className="text-indigo-600 font-bold text-sm hover:underline">
                                            Verify Now
                                        </a>
                                    ) : user.status === 'UNPAID' ? (
                                        <a 
                                            href={`https://wa.me/${user.phone ? user.phone.replace(/^0/, '62') : ''}?text=${encodeURIComponent(`Assalamualaikum ${user.name}, mohon melunasi tagihan KAS untuk bulan ${user.bill_month_name} sebesar Rp ${user.bill_amount.toLocaleString('id-ID')}. Terima kasih - Admin SiPPRQ.`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-green-600 font-bold text-sm hover:text-green-800 transition"
                                            title="Send WhatsApp Reminder"
                                        >
                                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.628 1.213 2.827c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                            Remind
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
