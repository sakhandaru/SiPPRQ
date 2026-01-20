import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Landing/Navbar';
import Hero from '@/Components/Landing/Hero';
import About from '@/Components/Landing/About';
import VisionMission from '@/Components/Landing/VisionMission';
import Programs from '@/Components/Landing/Programs';
import Gallery from '@/Components/Landing/Gallery';
import Footer from '@/Components/Landing/Footer';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="PP. Raudhatul Qur'an Annasimiyyah" />
            
            <div className="font-sans text-gray-900 antialiased scroll-smooth">
                {/* 1. NAVBAR */}
                <Navbar auth={auth} />

                {/* 2. HERO SECTION */}
                <Hero />

                {/* 3. PROFILE / SEJARAH SECTION */}
                <About />

                {/* 3.5. VISION MISSION SECTION */}
                <VisionMission />

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
