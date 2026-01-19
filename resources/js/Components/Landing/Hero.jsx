export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=2070&auto=format&fit=crop" 
                    alt="Background Pondok" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-8 animate-fade-in-up">
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium tracking-wide uppercase text-green-300 mb-2">
                    Membangun Generasi Qur'ani
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                    Menjaga Tradisi,<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">
                        Merawat Masa Depan
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                    Selamat datang di Portal Resmi Pondok Pesantren Al-Hidayah. Pusat pendidikan Islam yang memadukan kurikulum salaf dan modern untuk mencetak santri berakhlakul karimah.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <a href="#profil" className="px-8 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition shadow-xl hover:shadow-green-500/30 transform hover:-translate-y-1">
                        Selengkapnya
                    </a>
                    <a href="#kontak" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-white hover:text-green-900 transition shadow-xl transform hover:-translate-y-1">
                        Info Pendaftaran
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
        </section>
    );
}
