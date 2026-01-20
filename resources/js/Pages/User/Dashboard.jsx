import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function UserDashboard({ user, bills, paymentHistory }) {
    // Payment Form
    const { data, setData, post, processing, errors, reset } = useForm({
        bill_ids: [],
        proof_image: null,
    });

    // Request Future Bill Form (Self-Service)
    const [showRequestModal, setShowRequestModal] = useState(false);
    const { data: reqData, setData: setReqData, post: postReq, processing: reqProcessing, reset: resetReq } = useForm({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 2 > 12 ? 1 : new Date().getMonth() + 2,
    });

    const handleRequest = (e) => {
        e.preventDefault();
        postReq(route('user.bills.store'), {
            onSuccess: () => {
                setShowRequestModal(false);
                resetReq();
            }
        });
    };

    // Split bills into Arrears (Previous Months) and Current Month
    const currentMonthStr = new Date().toISOString().slice(0, 7); // YYYY-MM
    const arrearsBills = bills.filter(b => b.month.slice(0, 7) < currentMonthStr && b.status === 'UNPAID');
    const currentMonthBills = bills.filter(b => b.month.slice(0, 7) >= currentMonthStr || (b.month.slice(0, 7) < currentMonthStr && b.status === 'PAID'));

    const hasArrears = arrearsBills.length > 0;

    // Helper to toggle selection
    const toggleBill = (billId) => {
        const selected = new Set(data.bill_ids);
        if (selected.has(billId)) {
            selected.delete(billId);
        } else {
            selected.add(billId);
        }
        setData('bill_ids', Array.from(selected));
    };

    // Calculate Total
    const totalAmount = bills
        .filter(b => data.bill_ids.includes(b.id))
        .reduce((sum, b) => sum + b.amount, 0);

    function handleSubmit(e) {
        e.preventDefault();
        post(route('user.payments.store'), {
            onSuccess: () => reset(),
        });
    }

    const BillCard = ({ bill }) => {
        const isSelected = data.bill_ids.includes(bill.id);
        const isPaid = bill.status === 'PAID';
        const isPending = bill.latest_payment?.status === 'PENDING';
        
        return (
            <div 
                key={bill.id} 
                onClick={() => !isPaid && !isPending && toggleBill(bill.id)}
                className={`rounded-2xl p-6 shadow-sm border relative overflow-hidden h-full flex flex-col justify-between transition cursor-pointer ${
                    isSelected ? 'bg-black text-white border-black' : 'bg-white text-gray-900 border-gray-100 hover:border-gray-300'
                } ${isPaid || isPending ? 'opacity-75 cursor-default' : ''}`}
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className={`text-sm font-bold uppercase tracking-wider ${isSelected ? 'text-gray-400' : 'text-gray-400'}`}>
                            {bill.type === 'INCIDENTAL' && bill.title ? bill.title : bill.type}
                        </p>
                        <p className={`text-xs ${isSelected ? 'text-gray-400' : 'text-gray-400'}`}>{bill.month}</p>
                    </div>
                    
                    {/* Checkbox or Status Badge */}
                    {isPaid ? (
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">PAID</span>
                    ) : isPending ? (
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">WAITING</span>
                    ) : (
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isSelected ? 'bg-white border-white' : 'border-gray-300'}`}>
                            {isSelected && <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                        </div>
                    )}
                </div>

                <div>
                     <div className={`text-2xl font-extrabold mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        Rp {bill.amount.toLocaleString()}
                    </div>
                    {isSelected && <div className="text-xs text-gray-400 font-bold">Selected to Pay</div>}
                </div>
            </div>
        );
    };

    return (
        <UserLayout title="Overview">
            <Head title="User Dashboard" />

            {/* FLOATING ACTION BAR FOR PAYMENT */}
            {data.bill_ids.length > 0 && (
                <div className="fixed bottom-6 inset-x-0 mx-auto w-full max-w-2xl px-4 z-50 animate-fade-in-up">
                    <div className="bg-black text-white rounded-2xl shadow-2xl p-4 flex justify-between items-center">
                        <div>
                            <div className="text-xs text-gray-400 uppercase font-bold">Total Payment</div>
                            <div className="text-xl font-extrabold">Rp {totalAmount.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">{data.bill_ids.length} Bills Selected</div>
                        </div>
                        <button
                             onClick={() => document.getElementById('payment-form').scrollIntoView({ behavior: 'smooth' })}
                             className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                        >
                            Pay Now &rarr;
                        </button>
                    </div>
                </div>
            )}

            {/* ARREARS ALERT */}
            {hasArrears && (
                 <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl animate-pulse">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700 font-bold">
                                You have unpaid bills from previous months! Please settle them immediately.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* 1. ARREARS SECTION */}
            {arrearsBills.length > 0 && (
                <div className="mb-10">
                    <h3 className="text-xl font-bold text-red-600 mb-6 flex items-center">
                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mr-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        Unpaid Arrears (Tunggakan)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {arrearsBills.map(bill => (
                            <BillCard key={bill.id} bill={bill} />
                        ))}
                    </div>
                </div>
            )}

            {/* REQUEST MODAL */}
            {showRequestModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                        <h3 className="text-lg font-bold mb-4">Request Future Bill</h3>
                        <p className="text-sm text-gray-500 mb-6">Select a month you want to pay in advance. The bill will be generated immediately.</p>
                        
                        <form onSubmit={handleRequest} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Year</label>
                                <input 
                                    type="number" 
                                    value={reqData.year} 
                                    onChange={e => setReqData('year', e.target.value)}
                                    className="w-full rounded-xl border-gray-300 focus:border-black focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Month</label>
                                <select 
                                    value={reqData.month}
                                    onChange={e => setReqData('month', e.target.value)}
                                    className="w-full rounded-xl border-gray-300 focus:border-black focus:ring-black"
                                >
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {new Date(0, i).toLocaleString('en-US', { month: 'long' })}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button 
                                    type="button" 
                                    onClick={() => setShowRequestModal(false)}
                                    className="flex-1 py-3 bg-gray-100 rounded-xl font-bold hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={reqProcessing}
                                    className="flex-1 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50"
                                >
                                    {reqProcessing ? 'Generating...' : 'Generate Bill'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* 2. CURRENT & FUTURE BILLS */}
            <div className="mb-10">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mr-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        Current & Future Bills
                    </h3>
                    <button 
                        onClick={() => setShowRequestModal(true)}
                        className="bg-gray-100 text-gray-900 px-4 py-2 rounded-xl font-bold text-sm hover:bg-gray-200 transition flex items-center"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        Pay Future Bill
                    </button>
                </div>

                {currentMonthBills.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentMonthBills.map(bill => (
                            <BillCard key={bill.id} bill={bill} />
                        ))}
                    </div>
                ) : (
                    <div className="p-8 bg-gray-50 rounded-2xl text-center text-gray-500">
                        No bills for this month yet.
                    </div>
                )}
            </div>

            {/* PAYMENT FORM (Only shows if a bill is selected) */}
            {data.bill_ids.length > 0 && (
                <div id="payment-form" className="mb-24 animate-fade-in-up">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto border-t-4 border-t-black">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Complete Payment</h3>
                        
                        <div className="bg-gray-50 p-4 rounded-xl mb-6">
                             <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-500">Bills Selected:</span>
                                <span className="font-bold">{data.bill_ids.length}</span>
                             </div>
                             <div className="flex justify-between text-lg font-bold">
                                <span>Total Amount:</span>
                                <span>Rp {totalAmount.toLocaleString()}</span>
                             </div>
                        </div>

                        <p className="text-gray-500 text-sm mb-6">Upload proof of payment (Screenshot/Photo) to verify the transaction.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Hidden Inputs for Bill IDs not needed as they are in 'data' */}
                            
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
                                    onClick={() => setData({ ...data, bill_ids: [], proof_image: null })}
                                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <button 
                                    disabled={processing} 
                                    type="submit" 
                                    className="flex-1 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition disabled:opacity-50"
                                >
                                    {processing ? 'Uploading...' : `Confirm Payment (Rp ${totalAmount.toLocaleString()})`}
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
