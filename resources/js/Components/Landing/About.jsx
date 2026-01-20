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
                        <h3 className="text-green-600 font-bold uppercase tracking-wider text-sm">Sejarah Pondok</h3>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight font-serif">
                            Dari Kauman untuk<br/>
                            Generasi Qur'ani.
                        </h2>
                        <div className="text-gray-600 text-lg leading-relaxed space-y-4 text-justify">
                            <p>
                                Bermula dari pengajian Al-Qur'an di Kauman Semarang yang diasuh oleh <strong>Almaghfurlah KH. M Turmudzi Taslim, AH.</strong>, Pondok Pesantren Raudhatul Qur’an tumbuh menjawab kebutuhan umat.
                            </p>
                            <p>
                                Melanjutkan cita-cita beliau, <strong>KH. Hanief Ismail, Lc.</strong> mendirikan <strong>PP. Raudhatul Qur’an Annasimiyyah</strong> pada 10 Muharram 1431 H di Puspanjolo. Ikhtiar ini bertujuan memfasilitasi pelajar dan mahasiswa untuk mendalami Al-Qur'an, Kitab Kuning, serta Bahasa Asing di tengah kesibukan akademis mereka.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
