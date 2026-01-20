import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ cashflows, balance }) {
    const { success } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [proofUrl, setProofUrl] = useState(null);

    const { data, setData, post, processing, errors, reset, transform } = useForm({
        direction: 'OUT',
        category: '',
        amount: '',
        description: '',
        proof_file: null,
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        transform((data) => ({
            ...data,
            amount: data.amount.toString().replace(/,/g, ''),
        }));

        post(route('admin.cashflows.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    return (
        <AdminLayout title="Cashflow Management">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Cashflow</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage income and expenses.</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg flex items-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Record Transaction
                </button>
            </div>

            {/* BALANCE CARD */}
            <div className="mb-8">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 inline-block min-w-[250px]">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Current Balance (Saldo)</p>
                    <p className="text-3xl font-black text-gray-900 mt-2">Rp {balance ? balance.current_balance.toLocaleString('id-ID') : 0}</p>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Direction</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Description</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Proof</th>
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
                                <td className="px-6 py-4">
                                    {flow.proof_file_path ? (
                                        <button 
                                            onClick={() => setProofUrl(`/storage/${flow.proof_file_path}`)}
                                            className="text-blue-600 hover:text-blue-800 text-xs font-bold border border-blue-200 rounded px-2 py-1 bg-blue-50"
                                        >
                                            View
                                        </button>
                                    ) : (
                                        <span className="text-gray-300 text-xs text-center block">-</span>
                                    )}
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

            {/* PROOF MODAL */}
            {proofUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4" onClick={() => setProofUrl(null)}>
                     <div className="relative max-w-4xl max-h-screen">
                        <img src={proofUrl} alt="Proof" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
                        <button className="absolute -top-10 right-0 text-white hover:text-gray-300 text-sm font-bold">CLOSE [X]</button>
                     </div>
                </div>
            )}

            {/* TRANSACTION MODAL */}
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
                                <select
                                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="OPERATIONAL">Operational (Listrik/Air/Wifi)</option>
                                    <option value="CONSTRUCTION">Pembangunan & Renovasi</option>
                                    <option value="ACTIVITY">Kegiatan Santri</option>
                                    <option value="CONSUMPTION">Konsumsi</option>
                                    <option value="MAINTENANCE">Maintenance & Perbaikan</option>
                                    <option value="OTHER">Lainnya</option>
                                </select>
                                {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (Rp)</label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    placeholder="0"
                                    value={data.amount}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/[^0-9]/g, '');
                                        if (value) {
                                            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                        }
                                        setData('amount', value);
                                    }}
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Proof (Bukti/Nota)</label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    className="w-full p-2 border border-gray-200 rounded-xl"
                                    onChange={e => setData('proof_file', e.target.files[0])}
                                    required
                                />
                                {errors.proof_file && <div className="text-red-500 text-xs mt-1">{errors.proof_file}</div>}
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
