import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-white flex flex-col justify-center items-center text-center p-4">
                <div className="max-w-md w-full space-y-8">
                    {/* LOGO Placeholder */}
                    <div className="flex justify-center">
                        <div className="h-16 w-16 bg-black rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                            S
                        </div>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        SiPPRQ v2
                    </h1>
                    <p className="mt-2 text-lg text-gray-500">
                        Sistem Informasi Pengelolaan Pembayaran & Residents Asrama.
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                        {auth.user ? (
                            <div className="flex flex-col gap-4">
                                <Link
                                    href={route('dashboard')}
                                    className="px-8 py-3 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition shadow-lg hover:shadow-xl"
                                >
                                    Go to Dashboard
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-red-600 hover:text-red-800 font-bold underline"
                                >
                                    Log Out
                                </Link>
                            </div>
                        ) : (
                            <Link
                                href={route('login')}
                                className="px-8 py-3 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition shadow-lg hover:shadow-xl"
                            >
                                Login System
                            </Link>
                        )}
                    </div>
                </div>

                <div className="mt-12 text-sm text-gray-400">
                    &copy; 2026 SiPPRQ. All rights reserved.
                </div>
            </div>
        </>
    );
}
