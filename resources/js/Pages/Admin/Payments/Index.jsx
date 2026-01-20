import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ payments, filters }) {
    const { success, error } = usePage().props;
    const [selectedImage, setSelectedImage] = useState(null);

    const [month, setMonth] = useState(filters.month || '');
    const [year, setYear] = useState(filters.year || '');
    const [status, setStatus] = useState(filters.status || 'ALL');
    const [type, setType] = useState(filters.type || 'ALL');

    const handleFilter = () => {
        router.get(route('admin.payments.index'), { month, year, status, type }, { preserveState: true });
    };
    
    const handleVerify = (id) => {
        if (confirm('Are you sure you want to verify this payment?')) {
            router.post(route('admin.payments.verify', id));
        }
    };

    const handleReject = (id) => {
        if (confirm('Are you sure you want to REJECT this payment?')) {
            router.post(route('admin.payments.reject', id));
        }
    };

    const months = [
        { id: 1, name: 'January' }, { id: 2, name: 'February' }, { id: 3, name: 'March' },
        { id: 4, name: 'April' }, { id: 5, name: 'May' }, { id: 6, name: 'June' },
        { id: 7, name: 'July' }, { id: 8, name: 'August' }, { id: 9, name: 'September' },
        { id: 10, name: 'October' }, { id: 11, name: 'November' }, { id: 12, name: 'December' }
    ];

    return (
        <AdminLayout title="Payment Verification">
            <Head title="Payments" />

            {/* MESSAGES */}
            {success && (
                <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 flex items-center">
                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                     {success}
                </div>
            )}
             {error && (
                <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 flex items-center">
                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                     {error}
                </div>
            )}

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Payment Verification</h2>
            </div>

            {/* FILTER SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex flex-wrap gap-4">
                     <select 
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                        className="rounded-xl border-gray-200 focus:border-black focus:ring-black py-2"
                    >
                        <option value="ALL">All Types</option>
                        <option value="KAS">KAS</option>
                        <option value="WIFI">WIFI</option>
                        <option value="INCIDENTAL">INCIDENTAL</option>
                    </select>

                    <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}
                        className="rounded-xl border-gray-200 focus:border-black focus:ring-black py-2"
                    >
                        <option value="ALL">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="VERIFIED">Verified</option>
                        <option value="REJECTED">Rejected</option>
                    </select>

                    <select 
                        value={month} 
                        onChange={(e) => setMonth(e.target.value)}
                        className="rounded-xl border-gray-200 focus:border-black focus:ring-black py-2"
                    >
                        <option value="">All Months</option>
                        {months.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>
                    <select 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)}
                        className="rounded-xl border-gray-200 focus:border-black focus:ring-black py-2"
                    >
                        <option value="">All Years</option>
                        {[2024, 2025, 2026, 2027].map(y => (
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

            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Payment For</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Proof</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {payments.data.length > 0 ? payments.data.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-900">{payment.user ? payment.user.name : 'Unknown User'}</div>
                                    <div className="text-xs text-gray-400">ID: {payment.id}</div>
                                </td>
                                <td className="px-6 py-4">
                                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide border ${
                                        payment.type === 'KAS' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                                        payment.type === 'WIFI' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                                        'bg-orange-50 text-orange-600 border-orange-200'
                                    }`}>
                                        {payment.type}
                                    </span>
                                    {payment.bill && payment.bill.title && (
                                        <p className="text-xs text-gray-500 mt-1">{payment.bill.title}</p>
                                    )}
                                </td>
                                <td className="px-6 py-4 font-mono text-gray-700">Rp {payment.amount.toLocaleString()}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{new Date(payment.payment_date).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    {payment.proof_image ? (
                                        <button 
                                            onClick={() => setSelectedImage(`/storage/${payment.proof_image}`)}
                                            className="text-blue-600 underline font-bold hover:text-blue-800"
                                        >
                                            View
                                        </button>
                                    ) : (
                                        <span className="text-gray-300 italic">No Image</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                     {payment.status === 'VERIFIED' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Verified</span>}
                                     {payment.status === 'PENDING' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>}
                                     {payment.status === 'REJECTED' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Rejected</span>}
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    {payment.status === 'PENDING' && (
                                        <>
                                            <button 
                                                onClick={() => handleVerify(payment.id)}
                                                className="text-emerald-600 hover:text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-lg transition"
                                            >
                                                Verify
                                            </button>
                                            <button 
                                                onClick={() => handleReject(payment.id)}
                                                className="text-red-600 hover:text-red-800 font-bold bg-red-50 px-3 py-1 rounded-lg transition"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="7" className="p-8 text-center text-gray-400">No payments found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                 {/* PAGINATION */}
                 {payments.links && payments.links.length > 3 && (
                     <div className="p-4 border-t border-gray-100 flex justify-center">
                        {payments.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`px-3 py-1 mx-1 rounded text-sm ${link.active ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'} ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* IMAGE MODAL */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-4xl max-h-full">
                        <img src={selectedImage} alt="Proof" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
                        <button 
                            className="absolute top-4 right-4 bg-white rounded-full p-2 text-black hover:bg-gray-200"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                </div>
            )}

        </AdminLayout>
    );
}
