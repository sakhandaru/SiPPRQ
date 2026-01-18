import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage, router } from '@inertiajs/react'; // Corrected router import
import { useState } from 'react';

export default function Index({ payments }) {
    const { success, error } = usePage().props;
    const [selectedImage, setSelectedImage] = useState(null);

    // Filter logic if needed, for now just display
    
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

            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Amount / Type</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Proof</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {payments.data.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-900">{payment.user ? payment.user.name : 'Unknown User'}</div>
                                    <div className="text-xs text-gray-400">ID: {payment.id}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-900">Rp {payment.amount.toLocaleString()}</div>
                                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">{payment.type}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        payment.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' :
                                        payment.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(payment.created_at).toLocaleDateString()}
                                </td>
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
                        ))}
                    </tbody>
                </table>
                 {/* PAGINATION */}
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
