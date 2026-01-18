import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ cashflows, balance }) {
    const { success } = usePage().props;
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        direction: 'OUT',
        category: '',
        amount: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.cashflows.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    return (
        <AdminLayout title="Cashflow Management">
            <Head title="Cashflows" />

            {/* HEADER STATS & ACTION */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="mr-4 p-3 bg-purple-50 rounded-xl text-purple-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Current Balance</div>
                        <div className="text-2xl font-extrabold text-gray-900">
                             Rp {new Intl.NumberFormat('id-ID').format(balance.current_balance)}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg hover:shadow-xl flex items-center"
                >
                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Record Transaction
                </button>
            </div>

            {/* SUCCESS MESSAGE */}
            {success && (
                <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                     {success}
                </div>
            )}

            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Direction</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Description</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Creator</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {cashflows.data.map((flow) => (
                            <tr key={flow.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    {new Date(flow.created_at).toLocaleDateString()}
                                    <div className="text-xs text-gray-400">{new Date(flow.created_at).toLocaleTimeString()}</div>
                                </td>
                                <td className="px-6 py-4">
                                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        flow.direction === 'IN' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {flow.direction}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {flow.category}
                                </td>
                                <td className="px-6 py-4">
                                    {flow.description || '-'}
                                </td>
                                <td className={`px-6 py-4 font-bold ${flow.direction === 'IN' ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {flow.direction === 'IN' ? '+' : '-'} Rp {flow.amount.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-400">
                                    {flow.creator ? flow.creator.name : 'System'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {/* PAGINATION */}
                 <div className="p-4 border-t border-gray-100 flex justify-center">
                    {cashflows.links.map((link, i) => (
                         <Link
                            key={i}
                            href={link.url || '#'}
                            className={`px-3 py-1 mx-1 rounded text-sm ${link.active ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'} ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up">
                        <h3 className="text-xl font-bold mb-4">Record New Transaction</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
                                <div className="flex gap-4">
                                    <label className={`flex-1 cursor-pointer border rounded-xl p-3 text-center transition ${data.direction === 'IN' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold' : 'hover:bg-gray-50'}`}>
                                        <input type="radio" name="direction" value="IN" className="hidden" checked={data.direction === 'IN'} onChange={() => setData('direction', 'IN')} />
                                        Money IN (Income)
                                    </label>
                                    <label className={`flex-1 cursor-pointer border rounded-xl p-3 text-center transition ${data.direction === 'OUT' ? 'bg-red-50 border-red-500 text-red-700 font-bold' : 'hover:bg-gray-50'}`}>
                                        <input type="radio" name="direction" value="OUT" className="hidden" checked={data.direction === 'OUT'} onChange={() => setData('direction', 'OUT')} />
                                        Money OUT (Expense)
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    placeholder="e.g. WiFi Bill, Donation, Maintenance"
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    required
                                />
                                {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (Rp)</label>
                                <input
                                    type="number"
                                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    placeholder="0"
                                    value={data.amount}
                                    onChange={e => setData('amount', e.target.value)}
                                    required
                                />
                                {errors.amount && <div className="text-red-500 text-xs mt-1">{errors.amount}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    rows="2"
                                    placeholder="Optional details..."
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                ></textarea>
                            </div>
                            
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save Record'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
