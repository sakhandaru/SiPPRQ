import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function UserDashboard({ user, currentBills, paymentHistory }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        bill_id: '',
        proof_image: null,
    });

    const unpaidBills = currentBills.filter(bill => bill.status === 'UNPAID');

    function handleSubmit(e) {
        e.preventDefault();
        post(route('user.payments.store'), {
            onSuccess: () => reset(),
        });
    }

    return (
        <UserLayout title="Overview">
            <Head title="User Dashboard" />

            {/* UPCOMING BILLS SECTION */}
            <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mr-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    Current Bills
                </h3>

                {currentBills.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentBills.map(bill => (
                            <div key={bill.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">{bill.type}</p>
                                        <p className="text-xs text-gray-400">{bill.month}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        bill.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 
                                        bill.latest_payment?.status === 'PENDING' ? 'bg-indigo-100 text-indigo-700' :
                                        'bg-orange-100 text-orange-700'
                                    }`}>
                                        {bill.status === 'PAID' ? 'PAID' : 
                                         bill.latest_payment?.status === 'PENDING' ? 'WAITING VERIFICATION' : 'UNPAID'}
                                    </span>
                                </div>
                                <div className="text-2xl font-extrabold text-gray-900 mb-6">
                                    Rp {bill.amount.toLocaleString()}
                                </div>
                                
                                {bill.status === 'PAID' ? (
                                    <div className="w-full py-3 rounded-xl font-bold bg-emerald-50 text-emerald-700 text-center flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        Paid
                                    </div>
                                ) : bill.latest_payment?.status === 'PENDING' ? (
                                     <div className="w-full py-3 rounded-xl font-bold bg-indigo-50 text-indigo-700 text-center flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        Waiting Verification
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => setData('bill_id', bill.id)}
                                        className={`w-full py-3 rounded-xl font-bold border transition ${
                                            data.bill_id === bill.id 
                                            ? 'bg-black text-white border-black' 
                                            : 'bg-white text-gray-900 border-gray-200 hover:border-black'
                                        }`}
                                    >
                                        {data.bill_id === bill.id ? 'Selected to Pay' : 'Pay Now'}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 bg-gray-50 rounded-2xl text-center text-gray-500">
                        No bills for this month yet.
                    </div>
                )}
            </div>

            {/* PAYMENT FORM (Only shows if a bill is selected) */}
            {data.bill_id && (
                <div className="mb-10 animate-fade-in-up">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto border-t-4 border-t-black">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Complete Payment</h3>
                        <p className="text-gray-500 text-sm mb-6">Upload proof of payment (Screenshot/Photo) to verify the transaction.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input type="hidden" value={data.bill_id} />
                            
                                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-gray-50 transition cursor-pointer relative">
                                <input 
                                    type="file" 
                                    accept="image/png, image/jpeg, image/jpg"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={e => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            if (file.size > 2 * 1024 * 1024) { // 2MB Check
                                                alert('File size exceeds 2MB. Please upload a smaller image.');
                                                e.target.value = null; // Reset input
                                                setData('proof_image', null);
                                            } else {
                                                setData('proof_image', file);
                                            }
                                        }
                                    }}
                                    required 
                                />
                                <div className="space-y-2">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="text-sm text-gray-600">
                                        {data.proof_image ? (
                                            <span className="font-bold text-black">{data.proof_image.name}</span>
                                        ) : (
                                            <span>Click to upload proof</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                                </div>
                            </div>
                            {errors.proof_image && <div className="text-red-500 text-xs">{errors.proof_image}</div>}

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setData({ ...data, bill_id: '' })}
                                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <button 
                                    disabled={processing} 
                                    type="submit" 
                                    className="flex-1 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition disabled:opacity-50"
                                >
                                    {processing ? 'Uploading...' : 'Confirm Payment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* HISTORY SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Transaction History</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paymentHistory.length > 0 ? paymentHistory.map(payment => (
                                <tr key={payment.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900">{new Date(payment.payment_date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">{payment.type} ({payment.bill?.month})</td>
                                    <td className="px-6 py-4 font-bold">Rp {payment.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            payment.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' : 
                                            payment.status === 'PENDING' ? 'bg-indigo-100 text-indigo-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-400">No transactions yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </UserLayout>
    );
}
