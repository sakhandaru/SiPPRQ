import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function Index({ users }) {
    const { success } = usePage().props;

    return (
        <AdminLayout title="Residents Management">
            <Head title="Residents" />

            {/* ACTION BAR */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-gray-500 text-sm">Manage all registered residents and admins</h3>
                </div>
                <Link
                    href={route('admin.users.create')}
                    className="bg-black text-white px-6 py-2 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg hover:shadow-xl flex items-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Add Resident
                </Link>
            </div>

            {/* SUCCESS MESSAGE */}
            {success && (
                <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                     {success}
                </div>
            )}

            {/* TABLE CARD */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Name / Email</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.data.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 flex items-center">
                                    {user.resident_profile?.foto_profile ? (
                                        <img 
                                            src={`/storage/${user.resident_profile.foto_profile}`} 
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-gray-400 font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-bold text-gray-900 text-base">{user.name}</div>
                                        <div className="text-gray-400 text-xs">{user.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        user.status === 'AKTIF' ? 'bg-emerald-100 text-emerald-700' : 
                                        user.status === 'ALUMNI' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {user.phone || '-'}
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link
                                        href={route('admin.users.edit', user.id)}
                                        className="text-gray-400 hover:text-black font-bold transition"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this resident? This action cannot be undone.')) {
                                                router.delete(route('admin.users.destroy', user.id));
                                            }
                                        }}
                                        className="text-red-300 hover:text-red-500 font-bold transition ml-4"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {/* PAGINATION (Simple Placeholder) */}
                <div className="p-4 border-t border-gray-100 flex justify-center">
                    {users.links.map((link, i) => (
                         <Link
                            key={i}
                            href={link.url || '#'}
                            className={`px-3 py-1 mx-1 rounded text-sm ${link.active ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'} ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
