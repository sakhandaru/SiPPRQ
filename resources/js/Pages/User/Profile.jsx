import UserLayout from '@/Layouts/UserLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Profile({ user, profile, status }) {
    // Ensure profile is an object (UNCHANGED LOGIC)
    const userProfile = profile || {};

    const { data } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        wali_nama: userProfile.wali_nama || '',
        wali_kontak: userProfile.wali_kontak || '',
        address_detail: userProfile.address_detail || '',
        pendidikan: userProfile.pendidikan || 'KULIAH',
        institusi: userProfile.institusi || '',
        tahun_masuk: userProfile.tahun_masuk || '',
        social_instagram: userProfile.social_instagram || '',
        social_facebook: userProfile.social_facebook || '',
        social_linkedin: userProfile.social_linkedin || '',
    });

    // Helper Component for Bento Consistency
    const BentoCard = ({ children, className = "", title, subtitle }) => (
        <div className={`bg-white rounded-[2rem] border border-zinc-200/60 p-8 shadow-sm transition-all duration-300 hover:shadow-md ${className}`}>
            {title && (
                <div className="mb-8">
                    <h3 className="text-xs font-black text-zinc-900 uppercase tracking-[0.3em] mb-1 italic">{title}</h3>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{subtitle}</p>
                </div>
            )}
            {children}
        </div>
    );

    // Helper for Read-only Inputs
    const InfoField = ({ label, value, span = "col-span-1" }) => (
        <div className={span}>
            <label className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2 block">{label}</label>
            <div className="w-full rounded-2xl border border-zinc-100 bg-zinc-50/50 px-4 py-3 text-sm font-bold text-zinc-600 cursor-default">
                {value || '—'}
            </div>
        </div>
    );

    return (
        <UserLayout title="My Profile">
            <Head title="My Profile" />

            <div className="max-w-6xl mx-auto space-y-8 pb-12 px-2">
                
                {/* 1. HEADER SECTION */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <p className="text-zinc-400 text-xs font-semibold uppercase tracking-[0.2em] mb-1 italic">Identity Vault</p>
                        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
                            Personal <span className="text-emerald-600 font-black uppercase text-2xl tracking-tighter">Profile</span>
                        </h1>
                    </div>
                </div>

                {/* 2. ADMIN NOTICE - SOPHISTICATED ALERT */}
                <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-[2rem] flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <p className="text-xs font-bold text-indigo-900/70 leading-relaxed uppercase tracking-wider">
                        Profile information is managed by the <span className="text-indigo-600 font-black underline italic">administrator</span>. 
                        Contact admin to request any data modifications.
                    </p>
                </div>

                {/* 3. BENTO GRID LAYOUT */}
                <div className="grid grid-cols-12 gap-8">
                    
                    {/* PRIMARY IDENTITY CARD */}
                    <BentoCard span="col-span-12" className="col-span-12 lg:col-span-8">
                        <div className="flex flex-col md:flex-row gap-10">
                            {/* Photo Slot */}
                            <div className="shrink-0 mx-auto md:mx-0">
                                {userProfile.foto_profile ? (
                                    <img 
                                        src={`/storage/${userProfile.foto_profile}`} 
                                        alt="Profile" 
                                        className="w-40 h-52 object-cover rounded-[1.5rem] border-4 border-zinc-50 shadow-2xl rotate-1 group-hover:rotate-0 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-40 h-52 bg-zinc-100 rounded-[1.5rem] flex flex-col items-center justify-center text-zinc-300 border-2 border-dashed border-zinc-200">
                                        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        <span className="text-[9px] font-black uppercase tracking-widest">No Portrait</span>
                                    </div>
                                )}
                            </div>

                            {/* Core Account Info */}
                            <div className="flex-1 space-y-6">
                                <div className="border-b border-zinc-100 pb-4">
                                    <h3 className="text-xs font-black text-zinc-900 uppercase tracking-[0.3em] mb-1 italic">Account Core</h3>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Verified Resident Credentials</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InfoField label="Full Name" value={data.name} span="md:col-span-2" />
                                    <InfoField label="Email Terminal" value={data.email} />
                                    <InfoField label="Mobile Access" value={data.phone} />
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                    {/* PERSONAL DATA CARD */}
                    <BentoCard title="Personal Archive" subtitle="Biographical & Emergency Info" className="col-span-12 lg:col-span-4">
                        <div className="space-y-6">
                            <InfoField label="Primary Address" value={data.address_detail} />
                            <div className="grid grid-cols-1 gap-6">
                                <InfoField label="Guardian Name" value={data.wali_nama} />
                                <InfoField label="Guardian Contact" value={data.wali_kontak} />
                            </div>
                        </div>
                    </BentoCard>

                    {/* EDUCATION CARD */}
                    <BentoCard title="Academic Track" subtitle="Institutional Affiliation" className="col-span-12 lg:col-span-7">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoField label="Level" value={data.pendidikan} />
                            <InfoField label="Batch Year" value={data.tahun_masuk} />
                            <InfoField label="Institution" value={data.institusi} span="md:col-span-2" />
                            <InfoField label="Study Program (Prodi)" value={data.study_program} span="md:col-span-2" />
                        </div>
                    </BentoCard>

                    {/* SOCIALS CARD */}
                    <BentoCard title="Digital Presence" subtitle="Social Network Links" className="col-span-12 lg:col-span-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col items-center p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                                <span className="text-[8px] font-black text-zinc-400 uppercase mb-2 tracking-widest text-center">Instagram</span>
                                <span className="text-[10px] font-bold text-zinc-600 truncate max-w-full italic">@{data.social_instagram || 'none'}</span>
                            </div>
                            <div className="flex flex-col items-center p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                                <span className="text-[8px] font-black text-zinc-400 uppercase mb-2 tracking-widest text-center">Facebook</span>
                                <span className="text-[10px] font-bold text-zinc-600 truncate max-w-full italic">{data.social_facebook || 'none'}</span>
                            </div>
                            <div className="flex flex-col items-center p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                                <span className="text-[8px] font-black text-zinc-400 uppercase mb-2 tracking-widest text-center">LinkedIn</span>
                                <span className="text-[10px] font-bold text-zinc-600 truncate max-w-full italic">{data.social_linkedin || 'none'}</span>
                            </div>
                        </div>
                    </BentoCard>

                </div>
            </div>
        </UserLayout>
    );
}