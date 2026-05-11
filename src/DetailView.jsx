import React, { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Star, Send } from "lucide-react";

const DetailView = ({ tour, onBack, language = "id" }) => {
  // 1. Kamus Terjemahan Statis
  const translations = {
    id: {
      waHeader: "Halo Wayan at Ubud, saya ingin booking:",
      review: "5.0 (Review Terpercaya)",
      destTitle: "Destinasi yang dikunjungi:",
      bookTitle: "Book Your Trip",
      labelDest: "Destinasi Terpilih",
      labelDate: "Pilih Tanggal",
      labelPeople: "Jumlah Orang",
      labelNote: "Catatan Tambahan",
      placeholderNote: "Contoh: Jemput di Hotel Kuta...",
      btnBooking: "Booking via WhatsApp",
      waGreeting: "Halo Wayan at Ubud, saya ingin booking:",
      waUnit: "Orang"
    },
    en: {
      waHeader: "Hello Wayan at Ubud, I would like to book:",
      review: "5.0 (Trusted Reviews)",
      destTitle: "Destinations to visit:",
      bookTitle: "Book Your Trip",
      labelDest: "Selected Destination",
      labelDate: "Choose Date",
      labelPeople: "Number of People",
      labelNote: "Additional Notes",
      placeholderNote: "Example: Pick up at Kuta Hotel...",
      btnBooking: "Book via WhatsApp",
      waGreeting: "Hello Wayan at Ubud, I would like to book:",
      waUnit: "People"
    }
  };

  const t = translations[language] || translations.id;
  
  // Tentukan judul berdasarkan bahasa yang dikirim dari App.jsx
  const displayTitle = language === "en" ? (tour.title_en || tour.title) : (tour.title_id || tour.title);

  const [bookingData, setBookingData] = useState({
    date: "",
    guests: "1",
    note: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    // Menggunakan displayTitle agar nama paket di WA sesuai bahasa yang sedang aktif
    const message = `${t.waHeader}\n\n` +
                    `📍 Package: ${displayTitle}\n` +
                    `📅 Date: ${bookingData.date}\n` +
                    `👥 Guests: ${bookingData.guests} ${t.waUnit}\n` +
                    `📝 Note: ${bookingData.note || "-"}`;
    
    const whatsappUrl = `https://wa.me/6287762023292?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-left relative">
      {/* 2. Hero Section - Ditambah pointer-events-none pada overlay agar klik tembus */}
      <div className="relative h-[400px] w-full z-0">
        <img src={tour.img} className="w-full h-full object-cover" alt={displayTitle} />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 bg-white p-3 rounded-full shadow-xl hover:scale-110 transition-all z-50"
        >
          <ArrowLeft className="text-gray-900" size={24} />
        </button>
      </div>

      {/* 3. Konten Utama - Menggunakan z-30 agar berada di atas Hero Image */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-20 relative z-30 pb-20">
        
        {/* Kolom Kiri: Info Detail */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{displayTitle}</h2>
                <div className="flex items-center gap-2 text-amber-500 font-bold">
                  <Star size={20} fill="currentColor" />
                  <span>{t.review}</span>
                </div>
              </div>
              <p className="text-3xl font-black text-teal-600">{tour.price}</p>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-xl font-bold mb-4">{t.destTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.places?.map((place) => (
                  <div key={place.id} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <MapPin className="text-teal-500" size={20} />
                    <span className="font-medium text-gray-700">{place.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Kolom Kanan: Sidebar Form (Z-index 50 agar tombol mutlak bisa diklik) */}
        <div className="lg:col-span-1 relative z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-teal-50 sticky top-28">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">{t.bookTitle}</h3>
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{t.labelDest}</label>
                <input 
                  type="text" 
                  value={displayTitle} // Mengambil langsung dari variabel, otomatis berubah saat bahasa ganti
                  readOnly
                  className="w-full bg-gray-100 border border-gray-200 p-4 rounded-xl font-bold text-gray-700 cursor-not-allowed outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{t.labelDate}</label>
                  <input 
                    type="date" 
                    required
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    className="w-full border border-gray-200 p-4 rounded-xl text-sm outline-none focus:border-teal-500 transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{t.labelPeople}</label>
                  <input 
                    type="number" 
                    min="1" 
                    required
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                    className="w-full border border-gray-200 p-4 rounded-xl text-sm outline-none focus:border-teal-500 transition-all bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{t.labelNote}</label>
                <textarea 
                  placeholder={t.placeholderNote}
                  onChange={(e) => setBookingData({...bookingData, note: e.target.value})}
                  className="w-full border border-gray-200 p-4 rounded-xl text-sm h-24 outline-none focus:border-teal-500 transition-all bg-white"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-teal-200 active:scale-95"
              >
                <Send size={20} />
                {t.btnBooking}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;