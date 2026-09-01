'use client';

import { useState } from 'react';

export default function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    roomNumber: '',
    sessionDate: '',
    sessionTime: '',
    checkoutDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate WhatsApp text
    const text = `Halo Shotnesia, saya ingin memesan sesi foto!
Berikut detail pesanan saya:

*Nama:* ${formData.fullName}
*Email:* ${formData.email}
*Nomor WA:* ${formData.whatsapp}
*Nomor Kamar:* ${formData.roomNumber}
*Tanggal Sesi:* ${formData.sessionDate}
*Waktu Sesi:* ${formData.sessionTime}
*Tanggal Check-out:* ${formData.checkoutDate}

Terima kasih!`;

    const encodedText = encodeURIComponent(text);
    // Nomor WA Admin khusus Order
    const whatsappNumber = '6282111947630'; 
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'Order General',
          formData,
          text
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error API Resend:", errorData);
      }
    } catch (error) {
      console.error("Gagal mengirim email notifikasi:", error);
    } finally {
      setIsSubmitting(false);
      // Menggunakan window.location.href alih-alih window.open agar tidak diblokir oleh pop-up blocker browser
      window.location.href = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#faf8f5] border border-[#f0eadd] rounded-2xl p-6 md:p-10 shadow-sm mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* 1. FULL NAME */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border-b border-[#f0eadd] pb-6">
          <div className="flex items-start gap-4 md:w-1/3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#11223f] flex items-center justify-center text-[#e5d4a4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#11223f] uppercase tracking-wider">1. Full Name</h3>
              <p className="text-xs text-slate-500 mt-0.5">As per ID / Passport</p>
            </div>
          </div>
          <div className="md:w-2/3 mt-2 md:mt-0">
            <input 
              type="text" 
              name="fullName"
              required
              placeholder="Enter your full name" 
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-[#eae0cc] rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c8a97e] focus:border-[#c8a97e] transition-colors"
            />
          </div>
        </div>

        {/* 2. EMAIL ADDRESS */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border-b border-[#f0eadd] pb-6">
          <div className="flex items-start gap-4 md:w-1/3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#11223f] flex items-center justify-center text-[#e5d4a4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#11223f] uppercase tracking-wider">2. Email Address</h3>
              <p className="text-xs text-slate-500 mt-0.5">Active email address</p>
            </div>
          </div>
          <div className="md:w-2/3 mt-2 md:mt-0">
            <input 
              type="email" 
              name="email"
              required
              placeholder="Enter your email address" 
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-[#eae0cc] rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c8a97e] focus:border-[#c8a97e] transition-colors"
            />
          </div>
        </div>

        {/* 3. WHATSAPP */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border-b border-[#f0eadd] pb-6">
          <div className="flex items-start gap-4 md:w-1/3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#11223f] flex items-center justify-center text-[#e5d4a4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#11223f] uppercase tracking-wider">3. WhatsApp</h3>
              <p className="text-xs text-slate-500 mt-0.5">Reachable during your stay</p>
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
              placeholder="Enter your WhatsApp number" 
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-[#eae0cc] rounded-r-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c8a97e] focus:border-[#c8a97e] transition-colors"
            />
          </div>
        </div>

        {/* 4. ROOM NUMBER */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border-b border-[#f0eadd] pb-6">
          <div className="flex items-start gap-4 md:w-1/3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#11223f] flex items-center justify-center text-[#e5d4a4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-3 4H9v2h2v-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#11223f] uppercase tracking-wider">4. Room Number</h3>
              <p className="text-xs text-slate-500 mt-0.5">Enter your room number</p>
            </div>
          </div>
          <div className="md:w-2/3 mt-2 md:mt-0">
            <input 
              type="text" 
              name="roomNumber"
              required
              placeholder="Enter your room number" 
              value={formData.roomNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-[#eae0cc] rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c8a97e] focus:border-[#c8a97e] transition-colors"
            />
          </div>
        </div>

        {/* 5. PHOTO SESSION */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border-b border-[#f0eadd] pb-6">
          <div className="flex items-start gap-4 md:w-1/3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#11223f] flex items-center justify-center text-[#e5d4a4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#11223f] uppercase tracking-wider">5. Photo Session</h3>
              <p className="text-xs text-slate-500 mt-0.5">Date & session time</p>
            </div>
          </div>
          <div className="md:w-2/3 mt-2 md:mt-0 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date</label>
              <input 
                type="date" 
                name="sessionDate"
                required
                value={formData.sessionDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-[#eae0cc] rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c8a97e] focus:border-[#c8a97e] transition-colors"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Session Time</label>
              <select 
                name="sessionTime"
                required
                value={formData.sessionTime}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-[#eae0cc] rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c8a97e] focus:border-[#c8a97e] transition-colors appearance-none"
              >
                <option value="" disabled>Select session</option>
                <option value="Morning (08:00 - 10:00)">Morning (08:00 - 10:00)</option>
                <option value="Noon (10:00 - 13:00)">Noon (10:00 - 13:00)</option>
                <option value="Afternoon (14:00 - 16:00)">Afternoon (14:00 - 16:00)</option>
                <option value="Sunset (16:30 - 18:30)">Sunset (16:30 - 18:30)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 6. CHECK OUT DATE */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 pb-2">
          <div className="flex items-start gap-4 md:w-1/3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#11223f] flex items-center justify-center text-[#e5d4a4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#11223f] uppercase tracking-wider">6. Check Out Date</h3>
              <p className="text-xs text-slate-500 mt-0.5">When will you leave?</p>
            </div>
          </div>
          <div className="md:w-2/3 mt-2 md:mt-0">
            <input 
              type="date" 
              name="checkoutDate"
              required
              value={formData.checkoutDate}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-[#eae0cc] rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#c8a97e] focus:border-[#c8a97e] transition-colors"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center border-t border-[#f0eadd] pt-8">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="group flex items-center gap-3 px-12 py-4 bg-[#11223f] hover:bg-[#1a325a] disabled:bg-slate-400 disabled:cursor-not-allowed text-[#e5d4a4] font-semibold tracking-widest text-sm rounded transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
          >
            {isSubmitting ? 'MEMPROSES...' : 'ORDER NOW'}
            {!isSubmitting && (
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
