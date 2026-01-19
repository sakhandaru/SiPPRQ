import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Navbar({ auth }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        A
                    </div>
                    <div className={`font-bold text-xl tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                        PP. Al-Hidayah
                    </div>
                </div>

                {/* Menu (Desktop) */}
                <div className={`hidden md:flex gap-8 font-medium ${scrolled ? 'text-gray-600' : 'text-white/90'}`}>
                    <a href="#profil" className="hover:text-green-600 transition">Profil</a>
                    <a href="#pendidikan" className="hover:text-green-600 transition">Pendidikan</a>
                    <a href="#fasilitas" className="hover:text-green-600 transition">Fasilitas</a>
                    <a href="#kontak" className="hover:text-green-600 transition">Kontak</a>
                </div>

                {/* Login Button */}
                <div>
                    {auth.user ? (
                        <Link href={route('dashboard')} className="px-5 py-2.5 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition shadow-lg hover:shadow-green-500/30">
                            Dashboard
                        </Link>
                    ) : (
                        <Link href={route('login')} className={`px-5 py-2.5 font-bold rounded-full transition border ${scrolled ? 'bg-black text-white border-black hover:bg-gray-800' : 'bg-white/10 text-white border-white/30 hover:bg-white hover:text-green-900 backdrop-blur-sm'}`}>
                            Login SiPPRQ
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
