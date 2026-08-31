'use client';

import { useState } from 'react';

export default function GraduationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    instagram: '',
    university: '',
    service: '',
    date: '',
    sessionTime: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate WhatsApp text
    const text = `Halo Shotnesia, saya ingin memesan layanan Graduation!
Berikut detail pesanan saya:

*Nama:* ${formData.fullName}
*Nomor WA:* ${formData.whatsapp}
*Instagram:* ${formData.instagram ? '@' + formData.instagram.replace('@', '') : '-'}
*Kampus/Sekolah:* ${formData.university}
*Layanan:* ${formData.service}
*Tanggal:* ${formData.date}
*Waktu:* ${formData.sessionTime}
*Tempat:* ${formData.location}`;

    const encodedText = encodeURIComponent(text);
    const whatsappNumber = '6287774298789'; 
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#faf8f5] border border-[#f0eadd] rounded-2xl p-6 md:p-10 shadow-sm mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* 1. NAMA */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border-b border-[#f0eadd] pb-6">
          <div className="flex items-start gap-4 md:w-1/3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#11223f] flex items-center justify-center text-[#e5d4a4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#11223f] uppercase tracking-wider">1. Nama Lengkap</h3>
              <p className="text-xs text-slate-500 mt-0.5">Sesuai KTP / Identitas</p>
            </div>
          </div>
          <div className="md:w-2/3 mt-2 md:mt-0">
            <input 
              type="text" 
              name="fullName"
              required
              placeholder="Masukkan nama lengkap Anda" 
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-[#eae0cc] rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c8a97e] focus:border-[#c8a97e] transition-colors"
            />
          </div>
        </div>

        {/* 2. WHATSAPP */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border-b border-[#f0eadd] pb-6">
          <div className="flex items-start gap-4 md:w-1/3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#11223f] flex items-center justify-center text-[#e5d4a4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#11223f] uppercase tracking-wider">2. Nomor WhatsApp</h3>
              <p className="text-xs text-slate-500 mt-0.5">Nomor yang aktif/bisa dihubungi</p>
            </div>
          </div>
          <div className="md:w-2/3 mt-2 md:mt-0 flex">
            <span className="inline-flex items-center px-4 bg-[#f8f5f0] border border-r-0 border-[#eae0cc] rounded-l-md text-slate-600 font-medium">
              +62
            </span>
            <input 
              type="tel" 
              name="whatsapp"
              required
              placeholder="81234567890" 
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-[#eae0cc] rounded-r-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c8a97e] focus:border-[#c8a97e] transition-colors"
            />
          </div>
        </div>

        {/* 3. INSTAGRAM */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border-b border-[#f0eadd] pb-6">
          <div className="flex items-start gap-4 md:w-1/3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#11223f] flex items-center justify-center text-[#e5d4a4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#11223f] uppercase tracking-wider">3. Instagram</h3>
              <p className="text-xs text-slate-500 mt-0.5">(Opsional)</p>
            </div>
          </div>
          <div className="md:w-2/3 mt-2 md:mt-0 flex">
            <span className="inline-flex items-center px-4 bg-[#f8f5f0] border border-r-0 border-[#eae0cc] rounded-l-md text-slate-600 font-medium">
              @
            </span>
            <input 
              type="text" 
              name="instagram"
              placeholder="username_ig" 
              value={formData.instagram}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-[#eae0cc] rounded-r-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c8a97e] focus:border-[#c8a97e] transition-colors"
            />
          </div>
        </div>

        {/* 4. UNIVERSITAS / SEKOLAH */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border-b border-[#f0eadd] pb-6">
          <div className="flex items-start gap-4 md:w-1/3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#11223f] flex items-center justify-center text-[#e5d4a4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#11223f] uppercase tracking-wider">4. Universitas / Sekolah</h3>
              <p className="text-xs text-slate-500 mt-0.5">Nama institusi Anda</p>
            </div>
          </div>
          <div className="md:w-2/3 mt-2 md:mt-0">
            <input 
              type="text" 
              name="university"
              required
              placeholder="Contoh: Universitas Indonesia" 
              value={formData.university}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-[#eae0cc] rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c8a97e] focus:border-[#c8a97e] transition-colors"
            />
          </div>
        </div>

        {/* 5. LAYANAN */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border-b border-[#f0eadd] pb-6">
          <div className="flex items-start gap-4 md:w-1/3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#11223f] flex items-center justify-center text-[#e5d4a4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#11223f] uppercase tracking-wider">5. Layanan</h3>
              <p className="text-xs text-slate-500 mt-0.5">Pilih paket layanan</p>
            </div>
          </div>
          <div className="md:w-2/3 mt-2 md:mt-0 flex flex-col sm:flex-row gap-4">
            <label className={`flex-1 flex items-center gap-3 p-4 rounded-md border cursor-pointer transition-colors ${formData.service === 'Photoshoot' ? 'bg-indigo-50 border-indigo-300' : 'bg-white border-[#eae0cc] hover:bg-slate-50'}`}>
              <input type="radio" name="service" value="Photoshoot" checked={formData.service === 'Photoshoot'} onChange={handleChange} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" required />
              <span className="text-sm font-medium text-slate-700">Photoshoot</span>
            </label>
            <label className={`flex-1 flex items-center gap-3 p-4 rounded-md border cursor-pointer transition-colors ${formData.service === 'Video' ? 'bg-indigo-50 border-indigo-300' : 'bg-white border-[#eae0cc] hover:bg-slate-50'}`}>
              <input type="radio" name="service" value="Video" checked={formData.service === 'Video'} onChange={handleChange} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" required />
              <span className="text-sm font-medium text-slate-700">Video</span>
            </label>
          </div>
        </div>

        {/* 6 & 7. TANGGAL DAN WAKTU */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border-b border-[#f0eadd] pb-6">
          <div className="flex items-start gap-4 md:w-1/3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#11223f] flex items-center justify-center text-[#e5d4a4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#11223f] uppercase tracking-wider">6. Jadwal Sesi</h3>
              <p className="text-xs text-slate-500 mt-0.5">Tanggal & Pilihan Waktu</p>
            </div>
          </div>
          <div className="md:w-2/3 mt-2 md:mt-0 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tanggal (Perkiraan / Pasti)</label>
              <input 
                type="text" 
                name="date"
                required
                placeholder="Cth: Akhir Oktober / 15 Nov"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-[#eae0cc] rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c8a97e] focus:border-[#c8a97e] transition-colors"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Waktu Sesi</label>
              <select 
                name="sessionTime"
                required
                value={formData.sessionTime}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-[#eae0cc] rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c8a97e] focus:border-[#c8a97e] transition-colors appearance-none"
              >
                <option value="" disabled>Pilih waktu</option>
                <option value="Pagi">Pagi</option>
                <option value="Siang">Siang</option>
                <option value="Sore">Sore</option>
                <option value="Malam">Malam</option>
              </select>
            </div>
          </div>
        </div>

        {/* 8. TEMPAT */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 pb-2">
          <div className="flex items-start gap-4 md:w-1/3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#11223f] flex items-center justify-center text-[#e5d4a4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#11223f] uppercase tracking-wider">7. Tempat</h3>
              <p className="text-xs text-slate-500 mt-0.5">Lokasi pemotretan</p>
            </div>
          </div>
          <div className="md:w-2/3 mt-2 md:mt-0">
            <input 
              type="text" 
              name="location"
              required
              placeholder="Cth: Balairung UI / Studio" 
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-[#eae0cc] rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c8a97e] focus:border-[#c8a97e] transition-colors"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center border-t border-[#f0eadd] pt-8">
          <button 
            type="submit"
            className="group flex items-center gap-3 px-12 py-4 bg-[#11223f] hover:bg-[#1a325a] text-[#e5d4a4] font-semibold tracking-widest text-sm rounded transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
          >
            ORDER SEKARANG
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

      </form>
    </div>
  );
}
