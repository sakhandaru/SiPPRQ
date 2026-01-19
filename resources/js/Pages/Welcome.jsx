import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Landing/Navbar';
import Hero from '@/Components/Landing/Hero';
import About from '@/Components/Landing/About';
import Programs from '@/Components/Landing/Programs';
import Gallery from '@/Components/Landing/Gallery';
import Footer from '@/Components/Landing/Footer';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Pondok Pesantren Al-Hidayah" />
            
            <div className="font-sans text-gray-900 antialiased scroll-smooth">
                {/* 1. NAVBAR */}
                <Navbar auth={auth} />

                {/* 2. HERO SECTION */}
                <Hero />

                {/* 3. PROFILE / SAMBUTAN SECTION */}
                <About />

                {/* 4. PROGRAMS SECTION */}
                <Programs />

                {/* 5. GALLERY SECTION */}
                <Gallery />

                {/* 6. FOOTER */}
                <Footer />
            </div>
        </>
    );
}
