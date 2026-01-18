import { Head, useForm, Link } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-white flex">
            <Head title="Log in" />

            {/* LEFT SIDE: LOGIN FORM */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <img src="/logoSiPPRQ.png" alt="SiPPRQ Logo" className="w-48 h-auto mx-auto mb-6" />
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Monggo Kang</h2>
                        <p className="text-gray-500 mt-2">Silahkan masuk untuk melanjutkan</p>
                    </div>

                    {status && <div className="mb-6 font-medium text-sm text-green-600 text-center bg-green-50 p-3 rounded-lg border border-green-100">{status}</div>}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-black focus:ring-black transition bg-gray-50 focus:bg-white"
                                placeholder="name@example.com"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <div className="text-red-500 text-xs mt-2 font-medium">{errors.email}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-black focus:ring-black transition bg-gray-50 focus:bg-white"
                                placeholder="********"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            {errors.password && <div className="text-red-500 text-xs mt-2 font-medium">{errors.password}</div>}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded-md border-gray-300 text-black shadow-sm focus:ring-black h-4 w-4"
                                />
                                <span className="ml-2 text-sm text-gray-600 font-medium">Keep me signed in</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-4 bg-black text-white font-bold text-lg rounded-xl shadow-lg hover:bg-gray-800 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Signing in...' : 'Sign in'}
                        </button>
                        
                        <div className="text-center mt-8">
                            <Link href="/" className="text-sm text-gray-400 hover:text-black font-medium transition">
                                ← Back to Home
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* RIGHT SIDE: IMAGE */}
            <div className="hidden lg:flex w-1/2 bg-gray-100 relative overflow-hidden">
                <img 
                    src="/zika.jpeg" 
                    alt="Office" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-16">
                    <div className="text-white max-w-lg">
                        <h3 className="text-4xl font-bold mb-4">PP Raudhatul Qur'an Annasimiyyah</h3>
                        <p className="text-lg opacity-90">Sistem All-in-One untuk Pengelolaan Keuangan dan Administrasi Pesantren.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
