import { Link, usePage } from '@inertiajs/react';

export default function UserLayout({ children, title }) {
    const { auth } = usePage().props;
    const user = auth.user;

    // Sidebar Links Configuration for User
    const links = [
        { name: 'Dashboard', route: 'dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { name: 'My Profile', route: 'my-profile.show', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        // Add more links if needed like 'History' separately, but usually included in Dashboard
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r border-gray-100 flex-col fixed h-full z-10 hidden md:flex">
                <div className="h-24 flex items-center justify-center px-8 border-b border-gray-50">
                    <img src="/logoSiPPRQ.png" alt="SiPPRQ" className="w-48 h-auto" />
                </div>

                <nav className="flex-1 px-6 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
    {/* Section Label */}
    <p className="px-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-6 italic">
        User Menu
    </p>
    
    {links.map((link) => {
        const active = route().current(link.route + '*');
        return (
            <Link
                key={link.name}
                href={route(link.route)}
                className={`flex items-center px-4 py-3.5 text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all duration-300 group ${
                    active 
                        ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-200 translate-x-1' 
                        : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
            >
                {/* Icon Box - Memberikan tekstur bento pada menu */}
                <div className={`p-2 rounded-xl mr-3 transition-colors duration-300 ${
                    active 
                        ? 'bg-emerald-500/20 text-emerald-400 shadow-inner' 
                        : 'bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200'
                }`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={link.icon} />
                    </svg>
                </div>

                <span className="leading-none tracking-[0.05em]">{link.name}</span>
                
                {/* Active Glow Indicator */}
                {active && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                )}
            </Link>
        );
    })}
</nav>

                <div className="p-4 border-t border-gray-50">
                     <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl mb-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold mr-3">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {user.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                Resident
                            </p>
                        </div>
                    </div>
                     <Link 
                        href={route('logout')} 
                        method="post" 
                        as="button" 
                        className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg transition"
                    >
                        Log Out
                    </Link>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 md:ml-64 p-4 md:p-8">
                {/* Header Area */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    </div>
                    {/* Mobile Menu Button could go here */}
                </header>

                <div className="animate-fade-in-up">
                    {children}
                </div>
            </main>
        </div>
    );
}
