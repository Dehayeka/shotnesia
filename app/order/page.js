import OrderForm from './OrderForm';
import Link from 'next/link';

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* Top Background Pattern/Image (Simulated with a gradient) */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#f5f2eb] to-transparent -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        
        {/* Navigation Back */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#11223f] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center flex flex-col items-center">
          <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full border border-[#c8a97e] bg-[#fbfaf8]">
            <svg className="w-8 h-8 text-[#c8a97e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif text-[#11223f] tracking-widest uppercase mb-2">
            Shotnesia
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-[#c8a97e]"></div>
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-[#c8a97e] uppercase">
              Photo Service
            </span>
            <div className="h-px w-8 bg-[#c8a97e]"></div>
          </div>

          <h2 className="text-2xl md:text-4xl font-serif text-[#11223f] mt-10 mb-3">
            Capture Your Special Moments
          </h2>
          <p className="text-xs md:text-sm font-bold tracking-[0.15em] text-[#c8a97e] uppercase mb-4">
            TIMELESS MEMORIES, BEAUTIFULLY YOURS
          </p>
          <p className="max-w-xl mx-auto text-sm text-slate-600 leading-relaxed">
            Please fill out the form below to book your photography experience with Shotnesia Photo Service. 
            We look forward to capturing your special moments.
          </p>
        </div>

        {/* Order Form Component */}
        <OrderForm />

        {/* Footer Text */}
        <div className="mt-16 text-center flex flex-col items-center">
          <svg className="w-6 h-6 text-[#c8a97e] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <p className="text-lg font-serif text-[#11223f] mb-2">
            Thank you for choosing Shotnesia Photo Service.
          </p>
          <p className="text-sm text-slate-500">
            Let us capture the beauty of your journey.
          </p>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-[#11223f] py-8 px-6 mt-12 border-t-4 border-[#c8a97e]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[#e5d4a4]">
          <div className="flex items-center gap-4">
            <svg className="w-8 h-8 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <div>
              <p className="font-semibold text-sm tracking-wider uppercase mb-1">Need assistance?</p>
              <p className="text-xs text-white/70">Our team is here to help you.</p>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-12 bg-[#e5d4a4]/20"></div>
          
          <div className="text-center md:text-left">
             <p className="font-semibold text-sm tracking-wider uppercase mb-1">Contact our admin</p>
             <p className="text-xs text-white/70">or click the WhatsApp button directly.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
