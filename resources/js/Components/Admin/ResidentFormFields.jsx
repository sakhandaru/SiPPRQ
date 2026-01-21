import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ResidentFormFields({ data, setData, errors }) {
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    
    // Loading States
    const [loadingCities, setLoadingCities] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);

    // Fetch Provinces on mount
    useEffect(() => {
        axios.get(route('api.regions.provinces')).then(res => setProvinces(res.data));
    }, []);

    // Fetch Cities when province changes
    useEffect(() => {
        if (data.province_id) {
            setLoadingCities(true);
            axios.get(route('api.regions.cities', data.province_id))
                .then(res => setCities(res.data))
                .finally(() => setLoadingCities(false));
        } else {
            setCities([]);
        }
    }, [data.province_id]);

    // Fetch Districts when city changes
    useEffect(() => {
        if (data.city_id) {
            setLoadingDistricts(true);
            // If fetching for an existing city (edit mode), we might want to ensure districts are loaded
            // But usually this runs fine.
            axios.get(route('api.regions.districts', data.city_id))
                .then(res => setDistricts(res.data))
                .finally(() => setLoadingDistricts(false));
        } else {
            setDistricts([]);
        }
    }, [data.city_id]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Guardian Info */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-zinc-50/50 rounded-3xl border border-zinc-100">
                <div className="md:col-span-2 mb-2">
                     <h4 className="text-xs font-black text-zinc-900 uppercase tracking-[0.2em] italic">Emergency Contact (Wali)</h4>
                </div>
                <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Guardian Name</label>
                    <input
                        type="text"
                        className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-sm font-bold text-zinc-700 bg-white"
                        value={data.wali_nama}
                        onChange={e => setData('wali_nama', e.target.value)}
                        placeholder="e.g. Budi Santoso"
                    />
                    {errors.wali_nama && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.wali_nama}</div>}
                </div>
                <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Guardian Contact</label>
                    <input
                        type="text"
                        className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-sm font-bold text-zinc-700 bg-white"
                        value={data.wali_kontak}
                        onChange={e => setData('wali_kontak', e.target.value)}
                        placeholder="e.g. 081234567890"
                    />
                    {errors.wali_kontak && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.wali_kontak}</div>}
                </div>
            </div>

            {/* Region Info (Cascading) */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Province</label>
                    <div className='relative'>
                        <select
                            className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-xs font-bold text-zinc-700 bg-white appearance-none"
                            value={data.province_id}
                            onChange={e => setData(prev => ({...prev, province_id: e.target.value, city_id: '', district_id: ''}))}
                        >
                            <option value="">Select Province</option>
                            {provinces.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                         <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    {errors.province_id && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.province_id}</div>}
                </div>
                <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">City / Regency</label>
                    <div className='relative'>
                        <select
                            className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-xs font-bold text-zinc-700 bg-white appearance-none disabled:bg-zinc-50 disabled:text-zinc-300"
                            value={data.city_id}
                            onChange={e => setData(prev => ({...prev, city_id: e.target.value, district_id: ''}))}
                            disabled={!data.province_id || loadingCities}
                        >
                            <option value="">{loadingCities ? 'Loading...' : 'Select City'}</option>
                            {cities.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    {errors.city_id && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.city_id}</div>}
                </div>
                <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">District</label>
                    <div className='relative'>
                        <select
                            className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-xs font-bold text-zinc-700 bg-white appearance-none disabled:bg-zinc-50 disabled:text-zinc-300"
                            value={data.district_id}
                            onChange={e => setData('district_id', e.target.value)}
                            disabled={!data.city_id || loadingDistricts}
                        >
                            <option value="">{loadingDistricts ? 'Loading...' : 'Select District'}</option>
                            {districts.map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    {errors.district_id && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.district_id}</div>}
                </div>
            </div>

            {/* Address Detail */}
            <div className="md:col-span-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Full Address</label>
                <textarea
                    className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-sm font-bold text-zinc-700 bg-white"
                    value={data.address_detail}
                    onChange={e => setData('address_detail', e.target.value)}
                    rows="2"
                    placeholder="Street name, RT/RW, House Number..."
                ></textarea>
                {errors.address_detail && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.address_detail}</div>}
            </div>

            {/* Student Info */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-zinc-50/50 rounded-3xl border border-zinc-100 mt-2">
                <div className="md:col-span-2 mb-2">
                     <h4 className="text-xs font-black text-zinc-900 uppercase tracking-[0.2em] italic">Academic Profile</h4>
                </div>
                
                <div>
                     <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Student ID (NIS/NIM)</label>
                    <input
                        type="text"
                        className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-sm font-bold text-zinc-700 bg-white"
                        value={data.student_id_number}
                        onChange={e => setData('student_id_number', e.target.value)}
                    />
                    {errors.student_id_number && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.student_id_number}</div>}
                </div>
                 <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Date of Birth</label>
                    <input
                        type="date"
                        className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-sm font-bold text-zinc-700 bg-white"
                        value={data.birth_date}
                        onChange={e => setData('birth_date', e.target.value)}
                    />
                    {errors.birth_date && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.birth_date}</div>}
                </div>
                <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Institution / Campus</label>
                    <input
                        type="text"
                        className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-sm font-bold text-zinc-700 bg-white"
                        value={data.institusi}
                        onChange={e => setData('institusi', e.target.value)}
                    />
                </div>
                 <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Study Program (Prodi)</label>
                    <input
                        type="text"
                        className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-sm font-bold text-zinc-700 bg-white"
                        value={data.study_program}
                        onChange={e => setData('study_program', e.target.value)}
                    />
                    {errors.study_program && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.study_program}</div>}
                </div>
                <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Education Level</label>
                    <div className='relative'>
                        <select
                            className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-sm font-bold text-zinc-700 bg-white appearance-none"
                            value={data.pendidikan}
                            onChange={e => setData('pendidikan', e.target.value)}
                        >
                            <option value="KULIAH">Kuliah (University)</option>
                            <option value="SMA">SMA</option>
                            <option value="SMP">SMP</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Entry Year</label>
                    <input
                        type="number"
                        className="w-full rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-0 py-3 text-sm font-bold text-zinc-700 bg-white"
                        value={data.tahun_masuk}
                        onChange={e => setData('tahun_masuk', e.target.value)}
                    />
                </div>
            </div>

            <div className="md:col-span-2 pt-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Formal Photo (Max 2MB)</label>
                <div className="flex items-center gap-4">
                     <label className="flex-1 cursor-pointer group">
                        <div className="w-full h-16 border-2 border-dashed border-zinc-200 rounded-2xl flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-50/50 transition-all">
                            <span className="text-xs font-bold text-zinc-400 group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                {data.foto_profile ? data.foto_profile.name : 'Click to Upload Photo'}
                            </span>
                        </div>
                        <input 
                            type="file" 
                            accept="image/png, image/jpeg, image/jpg"
                            className="hidden"
                            onChange={e => setData('foto_profile', e.target.files[0])}
                        />
                    </label>
                </div>
                {errors.foto_profile && <div className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.foto_profile}</div>}
            </div>
        </div>
    );
}
