import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ bills, stats, filters, users }) {
    const [year, setYear] = useState(filters.year || '');
    const [month, setMonth] = useState(filters.month || '');
    const [status, setStatus] = useState(filters.status || 'ALL');
    const [type, setType] = useState(filters.type || 'ALL');

    // Generate Bill Form
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [billType, setBillType] = useState('MONTHLY'); // MONTHLY or MANUAL
    
    // Monthly Form
    const { data: genData, setData: setGenData, post: postGen, processing: genProcessing, reset: resetGen } = useForm({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 2 > 12 ? 1 : new Date().getMonth() + 2, // Default to next month
    });

    // Manual Form
    const { data: manualData, setData: setManualData, post: postManual, processing: manualProcessing, reset: resetManual } = useForm({
        title: '',
        amount: '',
        user_ids: [],
    });

    // Helper for manual selection
    const toggleUser = (id) => {
        if (manualData.user_ids.includes(id)) {
            setManualData('user_ids', manualData.user_ids.filter(uid => uid !== id));
        } else {
            setManualData('user_ids', [...manualData.user_ids, id]);
        }
    };
    
    const selectAllUsers = (e) => {
        if (e.target.checked) {
            setManualData('user_ids', users.map(u => u.id));
        } else {
            setManualData('user_ids', []);
        }
    }

    // Trigger filter when any state changes
    const handleFilter = () => {
        router.get(route('admin.tracker.index'), { year, month, status, type }, { preserveState: true, preserveScroll: true });
    };

    const handleGenerate = (e) => {
        e.preventDefault();
        if (billType === 'MONTHLY') {
            postGen(route('admin.bills.generate'), {
                onSuccess: () => {
                    setShowGenerateModal(false);
                    resetGen();
                    handleFilter(); // Reload
                }
            });
        } else {
            // Clean amount
            const dataToSubmit = {
                ...manualData,
                amount: manualData.amount.toString().replace(/,/g, ''),
            };
            
             router.post(route('admin.bills.store'), dataToSubmit, {
                onSuccess: () => {
                    setShowGenerateModal(false);
                    resetManual();
                    handleFilter(); // Reload
                },
                preserveScroll: true
             });
        }
    };

    const months = [
        { id: 1, name: 'January' }, { id: 2, name: 'February' }, { id: 3, name: 'March' },
        { id: 4, name: 'April' }, { id: 5, name: 'May' }, { id: 6, name: 'June' },
        { id: 7, name: 'July' }, { id: 8, name: 'August' }, { id: 9, name: 'September' },
        { id: 10, name: 'October' }, { id: 11, name: 'November' }, { id: 12, name: 'December' }
    ];

    return (
        <AdminLayout title="Bill Tracker">
            <Head title="Bill Tracker" />

            {/* GENERATE MODAL */}
            {showGenerateModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Create Bill</h3>
                            <button onClick={() => setShowGenerateModal(false)} className="text-gray-400 hover:text-black">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        
                        {/* TABS */}
                        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                            <button 
                                onClick={() => setBillType('MONTHLY')}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${billType === 'MONTHLY' ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Monthly Routine
                            </button>
                            <button 
                                onClick={() => setBillType('MANUAL')}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${billType === 'MANUAL' ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Incidental / Manual
                            </button>
                        </div>

                        <form onSubmit={handleGenerate} className="space-y-4">
                            {billType === 'MONTHLY' ? (
                                <>
                                    <div className="bg-blue-50 p-4 rounded-xl text-blue-700 text-sm mb-4">
                                        Generates standard monthly bills (KAS, etc) for all active residents. 
                                        Checks logic for existing bills to avoid duplicates.
                                    </div>
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
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                                        <input 
                                            type="text" 
                                            value={manualData.title} 
                                            placeholder="e.g. Iuran Rekreasi, Denda, etc."
                                            onChange={e => setManualData('title', e.target.value)}
                                            className="w-full rounded-xl border-gray-300 focus:border-black focus:ring-black"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Amount (Rp)</label>
                                        <input 
                                            type="text" 
                                            value={manualData.amount} 
                                            placeholder="0"
                                            onChange={(e) => {
                                                let value = e.target.value.replace(/[^0-9]/g, '');
                                                if (value) value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                setManualData('amount', value);
                                            }}
                                            className="w-full rounded-xl border-gray-300 focus:border-black focus:ring-black"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-bold text-gray-700">Select Residents</label>
                                            <label className="flex items-center text-xs text-blue-600 cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    onChange={selectAllUsers}
                                                    checked={manualData.user_ids.length === users.length && users.length > 0}
                                                    className="mr-1 rounded border-gray-300"
                                                />
                                                Select All
                                            </label>
                                        </div>
                                        <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-xl p-2 space-y-1">
                                            {users.map(u => (
                                                <label key={u.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={manualData.user_ids.includes(u.id)}
                                                        onChange={() => toggleUser(u.id)}
                                                        className="rounded border-gray-300 text-black focus:ring-black mr-2"
                                                    />
                                                    <span className="text-sm">{u.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1 text-right">
                                            {manualData.user_ids.length} selected
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                                <button 
                                    type="button" 
                                    onClick={() => setShowGenerateModal(false)}
                                    className="flex-1 py-3 bg-gray-100 rounded-xl font-bold hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={genProcessing || manualProcessing}
                                    className="flex-1 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 transition"
                                >
                                    {genProcessing || manualProcessing ? 'Processing...' : (billType === 'MONTHLY' ? 'Generate Monthly' : 'Create Bill')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-6">
                 <div>
                    <h2 className="text-xl font-bold text-gray-900">Bill Tracker</h2>
                    <p className="text-gray-500 text-sm">Monitor all bills (Kas, Wifi, Incidental).</p>
                </div>
                 <button 
                    onClick={() => setShowGenerateModal(true)}
                    className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition flex items-center text-sm"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Generate Bill
                </button>
            </div>

            {/* SUMMARY STATS (Global) */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-yellow-600 text-xs font-bold uppercase tracking-wider">Waiting Verification</p>
                    <p className="text-3xl font-black text-yellow-600 mt-2">{stats.total_waiting}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-red-500 text-xs font-bold uppercase tracking-wider">Total Unpaid Bills</p>
                    <p className="text-3xl font-black text-red-500 mt-2">{stats.total_unpaid}</p>
                </div>
            </div>

            {/* HEADER & FILTERS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">All Bills</h1>
                    <p className="text-gray-500 text-sm mt-1">Showing {bills.total} bills.</p>
                </div>
                <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
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
                        <option value="PAID">Paid</option>
                        <option value="WAITING">Waiting Verification</option>
                        <option value="UNPAID">Unpaid</option>
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

            {/* TRACKER TABLE - BILL BASED */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs font-bold tracking-wider">
                        <tr>
                            <th className="p-6">Resident</th>
                            <th className="p-6">Bill Details</th>
                            <th className="p-6">Amount</th>
                            <th className="p-6 text-center">Status</th>
                            <th className="p-6 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {bills.data.length > 0 ? bills.data.map((bill) => (
                            <tr key={bill.id} className="hover:bg-gray-50 transition">
                                <td className="p-6">
                                    <p className="font-bold text-gray-900">{bill.resident_name}</p>
                                    <p className="text-xs text-gray-400">{bill.resident_phone || '-'}</p>
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded mr-2 uppercase tracking-wide border ${
                                            bill.type === 'KAS' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                                            bill.type === 'WIFI' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                                            'bg-orange-50 text-orange-600 border-orange-200'
                                        }`}>
                                            {bill.type}
                                        </span>
                                        <p className="font-bold text-gray-800">{bill.title}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{bill.month_name}</p>
                                </td>
                                <td className="p-6">
                                    <p className="font-mono font-medium">Rp {bill.amount.toLocaleString()}</p>
                                </td>
                                <td className="p-6 text-center">
                                    {bill.status === 'PAID' && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                            PAID
                                        </span>
                                    )}
                                    {bill.status === 'WAITING' && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                                            WAITING VERIFICATION
                                        </span>
                                    )}
                                    {bill.status === 'UNPAID' && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                                            UNPAID
                                        </span>
                                    )}
                                </td>
                                <td className="p-6 text-right">
                                    {bill.status === 'WAITING' ? (
                                        // Direct link to verify payment
                                        <a href={route('admin.payments.index')} className="text-indigo-600 font-bold text-sm hover:underline">
                                            Verify Payment
                                        </a>
                                    ) : bill.status === 'UNPAID' ? (
                                        <a 
                                            href={`https://wa.me/${bill.resident_phone ? bill.resident_phone.replace(/^0/, '62') : ''}?text=${encodeURIComponent(`Assalamualaikum ${bill.resident_name}, mohon melunasi tagihan *${bill.title} (${bill.month_name})* sebesar Rp ${bill.amount.toLocaleString('id-ID')}. Terima kasih - Admin SiPPRQ.`)}`}
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
                                <td colSpan="5" className="p-12 text-center text-gray-400">
                                    No bills found matching your filter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                 {/* PAGINATION */}
                 {bills.links && bills.links.length > 3 && (
                     <div className="p-4 border-t border-gray-100 flex justify-center">
                        {bills.links.map((link, i) => (
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
        </AdminLayout>
    );
}
