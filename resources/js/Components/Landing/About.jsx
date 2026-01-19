export default function About() {
    return (
        <section id="profil" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Visual */}
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-72 h-72 bg-green-50 rounded-full filter blur-3xl opacity-50"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1576764402988-7143f6cca974?q=80&w=2069&auto=format&fit=crop" 
                            alt="Kegiatan Santri" 
                            className="relative rounded-3xl shadow-2xl z-10 w-full object-cover h-[500px]"
                        />
                        <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs hidden md:block">
                            <p className="font-serif text-xl italic text-gray-800">"Adab dulu, baru Ilmu."</p>
                            <p className="text-right text-sm font-bold text-green-600 mt-2">— KH. Abdullah Faqih</p>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-6">
                        <h3 className="text-green-600 font-bold uppercase tracking-wider text-sm">Tentang Pondok</h3>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight font-serif">
                            Mendidik dengan Hati,<br/>
                            Mengabdi untuk Ummat.
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Pondok Pesantren Al-Hidayah berdiri sejak tahun 1990 dengan visi mencetak generasi santri yang tidak hanya hafal Al-Qur'an, tetapi juga memiliki kedalaman ilmu agama (Tafaqquh Fiddin) dan siap berkontribusi di masyarakat modern.
                        </p>
                        
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                            <div>
                                <div className="text-3xl font-black text-green-600">30+</div>
                                <div className="text-sm text-gray-500 font-medium">Tahun Mengabdi</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-green-600">500+</div>
                                <div className="text-sm text-gray-500 font-medium">Santri Aktif</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-green-600">50+</div>
                                <div className="text-sm text-gray-500 font-medium">Pengajar Dedikatif</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
