export default function Gallery() {
    return (
        <section id="fasilitas" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">Fasilitas & Galeri</h2>
                    <p className="mt-4 text-gray-600">Lingkungan yang nyaman dan kondusif untuk menuntut ilmu.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
                    {/* Masonry-like Grid with correct Unsplash placeholders */}
                    <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-3xl">
                        <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop" alt="Gallery 1" className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-end p-8">
                            <span className="text-white font-bold text-lg">Gedung Asrama Putra</span>
                        </div>
                    </div>
                    <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-3xl">
                        <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" alt="Gallery 2" className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                    </div>
                        <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-3xl">
                        <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2072&auto=format&fit=crop" alt="Gallery 3" className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                    </div>
                    <div className="col-span-2 row-span-1 relative group overflow-hidden rounded-3xl">
                        <img src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?q=80&w=2148&auto=format&fit=crop" alt="Gallery 4" className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                    </div>
                </div>
            </div>
        </section>
    );
}
