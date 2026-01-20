export default function VisionMission() {
    return (
        <section className="py-24 bg-gradient-to-b from-green-900 to-green-950 relative overflow-hidden text-white">
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-[0.2em] text-amber-400 uppercase mb-3">Core Values</h2>
                    <h2 className="text-4xl md:text-5xl font-bold font-serif text-white">Visi & Misi</h2>
                </div>

                <div className="flex flex-col gap-16">
                    {/* VISI SECTION */}
                    <div className="text-center relative">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-green-900 shadow-xl shadow-amber-500/20 mb-8 transform rotate-3 hover:rotate-0 transition duration-500">
                             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        </div>
                        
                        <div className="relative inline-block">
                            <svg className="absolute -top-6 -left-6 w-12 h-12 text-amber-500/30" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01699V21H14.017ZM21.017 21L21.017 18C21.017 16.8954 20.1216 16 19.017 16H16.017V21H21.017ZM14.017 7L14.017 18L9.01699 18L9.01699 7C9.01699 5.89543 9.91243 5 11.017 5L12.017 5C13.1216 5 14.017 5.89543 14.017 7ZM19.017 5L21.017 5L21.017 18L16.017 18L16.017 7C16.017 5.89543 16.9124 5 18.017 5L19.017 5Z"></path></svg>
                            <h3 className="text-3xl md:text-5xl font-serif leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-white drop-shadow-sm max-w-4xl mx-auto">
                                "Terciptanya generasi muslim Indonesia yang Qur’ani, cerdas, berilmu, dan berakhlaq mulia."
                            </h3>
                            <svg className="absolute -bottom-6 -right-6 w-12 h-12 text-amber-500/30 rotate-180" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01699V21H14.017ZM21.017 21L21.017 18C21.017 16.8954 20.1216 16 19.017 16H16.017V21H21.017ZM14.017 7L14.017 18L9.01699 18L9.01699 7C9.01699 5.89543 9.91243 5 11.017 5L12.017 5C13.1216 5 14.017 5.89543 14.017 7ZM19.017 5L21.017 5L21.017 18L16.017 18L16.017 7C16.017 5.89543 16.9124 5 18.017 5L19.017 5Z"></path></svg>
                        </div>
                        <div className="w-32 h-1 bg-amber-500 mx-auto mt-12 rounded-full"></div>
                    </div>

                    {/* MISI SECTION */}
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:bg-white/10 transition duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                        
                        <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
                            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center text-green-950 font-bold shadow-lg shadow-amber-500/20">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            </div>
                            <h3 className="text-3xl font-bold text-white tracking-wide">Misi Utama</h3>
                        </div>

                        <ul className="space-y-8">
                            <li className="flex items-start group/item">
                                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-green-800 border border-green-700 text-amber-400 rounded-xl font-bold mr-6 text-lg group-hover/item:bg-amber-500 group-hover/item:text-green-900 transition duration-300 shadow-lg">1</span>
                                <span className="text-xl text-gray-200 leading-relaxed group-hover/item:text-white transition">Menyelenggarakan pendidikan pondok pesantren yang berkualitas untuk membekali ilmu-ilmu agama kepada para santri melalui pengkajian kitab-kitab kuning/salafiyah ‘ala madzhabi ahlis sunnah wal jama’ah.</span>
                            </li>
                            <li className="flex items-start group/item">
                                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-green-800 border border-green-700 text-amber-400 rounded-xl font-bold mr-6 text-lg group-hover/item:bg-amber-500 group-hover/item:text-green-900 transition duration-300 shadow-lg">2</span>
                                <span className="text-xl text-gray-200 leading-relaxed group-hover/item:text-white transition">Menyelenggarakan pendidikan pondok pesantren untuk membekali para santri kemampuan Bahasa Arab dan Bahasa Inggris secara aktif.</span>
                            </li>
                            <li className="flex items-start group/item">
                                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-green-800 border border-green-700 text-amber-400 rounded-xl font-bold mr-6 text-lg group-hover/item:bg-amber-500 group-hover/item:text-green-900 transition duration-300 shadow-lg">3</span>
                                <span className="text-xl text-gray-200 leading-relaxed group-hover/item:text-white transition">Menyediakan sarana prasarana sebagai pusat informasi dan pusat kajian ilmu-ilmu agama.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
