import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer id="kontak" className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">A</div>
                            <div className="font-bold text-xl">PP. Al-Hidayah</div>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Mewujudkan generasi santri yang intelek, religius, dan berwawasan global dengan tetap memegang teguh nilai-nilai Ahlussunnah wal Jama'ah.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Hubungi Kami</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start">
                                <svg className="w-6 h-6 mr-3 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span>Jl. Raya Pesantren No. 99, Kecamatan Klojen, Kota Malang, Jawa Timur</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-6 h-6 mr-3 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                <span>(0341) 555-777</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Menu Wali Santri</h4>
                        <ul className="space-y-2">
                            <li><Link href={route('login')} className="text-gray-400 hover:text-green-400 transition">Login Sistem Pembayaran</Link></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-400 transition">Panduan Pembayaran</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-400 transition">Info Pendaftaran Baru</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
                    &copy; 2026 Pondok Pesantren Al-Hidayah. All rights reserved. System powered by SiPPRQ.
                </div>
            </div>
        </footer>
    );
}
