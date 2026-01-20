export default function Programs() {
    return (
        <section id="pendidikan" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h3 className="text-green-600 font-bold uppercase tracking-wider text-sm mb-2">Kurikulum</h3>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">Integrasi Ilmu & Amal</h2>
                    <p className="mt-4 text-gray-600">Pendidikan holistik yang memadukan Al-Qur'an, Turats, dan Keterampilan Modern.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 group">
                        <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Al-Qur'an</h3>
                        <p className="text-gray-500 mb-4">Program pengajaran Al-Qur'an Bin Nazhar (Membaca) hingga Bil Ghoib (Menghafal).</p>
                        <ul className="text-sm text-gray-500 space-y-2">
                            <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Tahsin / Bin Nazhar</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Tahfidz / Bil Ghoib</li>
                        </ul>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 group">
                        <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Kitab Kuning</h3>
                        <p className="text-gray-500 mb-4">Kajian kitab-kitab salafiyah (Fiqih, Nahwu Shorof, Aqidah) berhaluan Ahlussunnah wal Jama'ah.</p>
                        <ul className="text-sm text-gray-500 space-y-2">
                            <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Manhaj Aswaja</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Sanad Keilmuan Jelas</li>
                        </ul>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 group">
                        <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Bahasa & Modern</h3>
                        <p className="text-gray-500 mb-4">Pembekalan Bahasa Arab & Inggris aktif serta kajian isu-isu kontemporer via teknologi.</p>
                        <ul className="text-sm text-gray-500 space-y-2">
                            <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Bilingual Active</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Kajian Multimedia</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
