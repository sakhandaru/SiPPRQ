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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
            {/* Guardian Info */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Name (Wali)</label>
                <input
                    type="text"
                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                    value={data.wali_nama}
                    onChange={e => setData('wali_nama', e.target.value)}
                />
                {errors.wali_nama && <div className="text-red-500 text-xs mt-1">{errors.wali_nama}</div>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Contact</label>
                <input
                    type="text"
                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                    value={data.wali_kontak}
                    onChange={e => setData('wali_kontak', e.target.value)}
                />
                {errors.wali_kontak && <div className="text-red-500 text-xs mt-1">{errors.wali_kontak}</div>}
            </div>

            {/* Region Info (Cascading) */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                    <select
                        className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                        value={data.province_id}
                        onChange={e => setData(prev => ({...prev, province_id: e.target.value, city_id: '', district_id: ''}))}
                    >
                        <option value="">Select Province</option>
                        {provinces.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    {errors.province_id && <div className="text-red-500 text-xs mt-1">{errors.province_id}</div>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select
                        className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black disabled:bg-gray-100"
                        value={data.city_id}
                        onChange={e => setData(prev => ({...prev, city_id: e.target.value, district_id: ''}))}
                        disabled={!data.province_id || loadingCities} // Disable if no province selected or loading
                    >
                        <option value="">{loadingCities ? 'Loading cities...' : 'Select City'}</option>
                        {cities.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {errors.city_id && <div className="text-red-500 text-xs mt-1">{errors.city_id}</div>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District (Kecamatan)</label>
                    <select
                        className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black disabled:bg-gray-100"
                        value={data.district_id}
                        onChange={e => setData('district_id', e.target.value)}
                        disabled={!data.city_id || loadingDistricts} // Disable if no city selected or loading
                    >
                        <option value="">{loadingDistricts ? 'Loading districts...' : 'Select District'}</option>
                        {districts.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </select>
                    {errors.district_id && <div className="text-red-500 text-xs mt-1">{errors.district_id}</div>}
                </div>
            </div>

            {/* Address Detail */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address (Jalan, RT/RW)</label>
                <textarea
                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                    value={data.address_detail}
                    onChange={e => setData('address_detail', e.target.value)}
                    rows="2"
                    placeholder="Jl. Mawar No. 12, RT 01 RW 02..."
                ></textarea>
                {errors.address_detail && <div className="text-red-500 text-xs mt-1">{errors.address_detail}</div>}
            </div>

            {/* Student Info */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIS (Student ID)</label>
                <input
                    type="text"
                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                    value={data.student_id_number}
                    onChange={e => setData('student_id_number', e.target.value)}
                />
                {errors.student_id_number && <div className="text-red-500 text-xs mt-1">{errors.student_id_number}</div>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                    type="date"
                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                    value={data.birth_date}
                    onChange={e => setData('birth_date', e.target.value)}
                />
                {errors.birth_date && <div className="text-red-500 text-xs mt-1">{errors.birth_date}</div>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Study Program (Prodi)</label>
                <input
                    type="text"
                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                    value={data.study_program}
                    onChange={e => setData('study_program', e.target.value)}
                />
                {errors.study_program && <div className="text-red-500 text-xs mt-1">{errors.study_program}</div>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
                <select
                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                    value={data.pendidikan}
                    onChange={e => setData('pendidikan', e.target.value)}
                >
                    <option value="KULIAH">Kuliah (University)</option>
                    <option value="SMA">SMA</option>
                    <option value="SMP">SMP</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution / Campus</label>
                <input
                    type="text"
                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                    value={data.institusi}
                    onChange={e => setData('institusi', e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year of Entry</label>
                <input
                    type="number"
                    className="w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                    value={data.tahun_masuk}
                    onChange={e => setData('tahun_masuk', e.target.value)}
                />
            </div>
            <div className="md:col-span-2 border-t border-gray-100 pt-4 mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Formal Photo (Max 2MB)</label>
                <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg"
                    className="w-full p-2 border border-gray-200 rounded-xl"
                    onChange={e => setData('foto_profile', e.target.files[0])}
                />
                {errors.foto_profile && <div className="text-red-500 text-xs mt-1">{errors.foto_profile}</div>}
            </div>
        </div>
    );
}
