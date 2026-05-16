import React, { useState } from "react";
import { MapPin, Users, Calendar, ArrowLeft, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const LandingPage = ({
  tourDestinations,
  featuredDestinations,
  galleryImages,
  setSelectedTour,
  scroll,
  scrollRef,
  onSearch,
}) => {
  const { t, i18n } = useTranslation();
  // State lokal untuk menampung input user sementara
  const [localLokasi, setLocalLokasi] = useState(""); // <-- Sudah dirapikan dari React.useState
  const [localGuests, setLocalGuests] = useState("");

  const handleSearchSubmit = () => {
    // 1. Jalankan fungsi filter pencarian internal web Anda
    onSearch(localLokasi);
    // 2. Logika otomatis membuka Google Maps khusus Bali
    if (localLokasi.trim()) {
      const queryUser = localLokasi.trim().toLowerCase();
      let kueriTambahan = " Bali"; // Default ditambahkan kata Bali

      // Cek apakah input user mengandung kata kunci hotel
      const kataKunciHotel = [
        "hotel",
        "villa",
        "resort",
        "homestay",
        "penginapan",
        "staycation",
      ];
      const apakahMencariHotel = kataKunciHotel.some((kata) =>
        queryUser.includes(kata),
      );

      if (apakahMencariHotel) {
        // Jika mendeteksi kata hotel, kunci pencarian ke hotel di Bali
        kueriTambahan = " Hotel Bali";
      } else {
        // Jika tempat umum, kunci pencarian ke objek wisata di Bali
        kueriTambahan = " Wisata Bali";
      }

      // Gabungkan input user dengan kueri pelindung
      const destinasiLengkap = `${localLokasi.trim()}${kueriTambahan}`;
      const encodedDestination = encodeURIComponent(destinasiLengkap);

      // Buka Google Maps di tab baru
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedDestination}`;
      window.open(googleMapsUrl, "_blank");
    }

    // Otomatis scroll ke bagian paket setelah cari
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
  };
  // =========================================================

  // Helper untuk mengambil judul sesuai bahasa yang aktif
  const getTitle = (item) => {
    return i18n.language === "id"
      ? item.title_id || item.title_en
      : item.title_en || item.title;
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <header className="relative h-[80vh] flex flex-col items-center justify-center text-center text-white px-4">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4"
            className="w-full h-full object-cover brightness-75"
            alt="Bali Background"
          />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl font-bold mb-4">{t("hero_title")}</h2>
          <p className="mb-8 text-gray-200">{t("hero_subtitle")}</p>
        </div>

        {/* SEARCH BAR */}
        <div className="absolute -bottom-10 z-20 bg-white p-6 rounded-xl shadow-2xl flex flex-wrap gap-6 items-center text-black">
          <div className="flex items-center gap-3 border-r pr-6">
            <MapPin className="text-teal-600" size={24} />
            <div className="flex flex-col text-left">
              <p className="text-sm text-teal-600 font-bold">{t("location")}</p>
              <input
                type="text"
                placeholder={t("search_dest")}
                className="text-sm outline-none border-none focus:ring-0 w-40"
                value={localLokasi}
                onChange={(e) => setLocalLokasi(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              />
            </div>
          </div>

          <button
            onClick={handleSearchSubmit}
            className="bg-amber-300 hover:bg-teal-600 hover:text-white px-10 py-3 rounded-full font-bold transition-all"
          >
            {t("search_button")}
          </button>
        </div>
      </header>
      {/* 2. PACKAGES SECTION */}
      <section
        className="mt-32 px-10 max-w-7xl mx-auto text-center"
        id="packages"
      >
        <h3 className="text-3xl font-bold mb-2">{t("packages_title")}</h3>
        <p className="text-gray-500 mb-10">{t("packages_subtitle")}</p>

        {/* LOGIKA PENGECEKAN DATA */}
        {tourDestinations.length === 0 ? (
          /* JIKA KOSONG */
          <div className="py-20 text-gray-500 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
            <p className="text-xl">
              Ups! Destinasi{" "}
              <span className="font-bold text-teal-600">"{localLokasi}"</span>{" "}
              tidak ditemukan.
            </p>
            <button
              onClick={() => {
                setLocalLokasi("");
                onSearch("");
              }}
              className="mt-4 text-teal-600 font-bold underline hover:text-teal-800"
            >
              Lihat semua paket
            </button>
          </div>
        ) : (
          /* JIKA ADA DATA */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-20">
            {tourDestinations.map((tour) => (
              <div
                key={tour.id}
                onClick={() => setSelectedTour(tour)}
                className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-pointer flex flex-col"
              >
                <img
                  src={tour.img}
                  alt={getTitle(tour)}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 text-left flex flex-col flex-grow">
                  <h4 className="font-bold text-sm mb-2 text-teal-600 uppercase tracking-wider">
                    {getTitle(tour)}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tour.places?.map((place) => (
                      <span
                        key={place.id}
                        className="text-[11px] bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200"
                      >
                        {place.name}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <p className="font-bold text-gray-900">{tour.price}</p>
                    <span className="text-[10px] text-gray-500 font-medium">
                      {t("see_detail")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-32 px-10 max-w-7xl mx-auto text-center" id="packages">
        <h3 className="text-3xl font-bold mb-2">{t("packages_title")}</h3>
        <p className="text-gray-500 mb-10">{t("packages_subtitle")}</p>

        {/* Logika Pengecekan Data Paket Anda ... */}
        {tourDestinations.length === 0 ? (
          <div className="py-20 text-gray-500 bg-white ...">
            {/* ... isi pesan kosong ... */}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-20">
            {/* ... peta data tourDestinations ... */}
          </div>
        )}
      </section> {/* <-- Batas Akhir Section Packages */}


      {/* ========================================================= */}
      {/* LIVE PETA & TOMBOL WHATSAPP (Taruh di Sini) */}
      {/* ========================================================= */}
      {localLokasi.trim() && (
        <section className="px-10 max-w-7xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl shadow-md border border-gray-100">
            {/* Tempat Map Muncul di Dalam Web */}
            <div className="w-full md:w-2/3 h-96 rounded-xl overflow-hidden shadow-inner bg-gray-100">
              <iframe
                title="Bali Map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(localLokasi.trim())}%20Bali&output=embed`}
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            {/* Sisi Kanan: Panel Interaksi / Tanya Admin */}
            <div className="w-full md:w-1/3 flex flex-col justify-center text-left p-4">
              <h4 className="font-bold text-2xl text-gray-900 mb-2">
                Tertarik dengan "{localLokasi}"?
              </h4>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                Peta di samping menunjukkan lokasi asli di Bali. Jika ada pertanyaan mengenai rute, akomodasi, atau paket tour di area ini, silakan hubungi tim kami.
              </p>
              <a
                href={`https://wa.me/6287762023292?text=Halo%20Admin,%20saya%20ingin%20bertanya%20tentang%20destinasi%20${encodeURIComponent(localLokasi)}%20di%20Bali.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-center py-3 rounded-full font-bold transition-all shadow-md hover:scale-[1.02]"
              >
                Tanya Admin via WhatsApp
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 3. TRENDING SECTION */}
      <section className="relative w-full min-h-[450px] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="./bg-hero.jpg"
            className="w-full h-full object-cover brightness-75"
            alt="Bali"
          />
        </div>
        <div className="container mx-auto px-10 flex flex-col md:flex-row items-center gap-12 z-10 text-white">
          <div className="text-left">
            <button className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-5 py-3 rounded-full uppercase tracking-widest">
              {t("trending_now")}
            </button>
            <h2 className="text-5xl md:text-7xl font-bold mt-6 mb-4">
              {t("trending_title")}
            </h2>
            <p className="text-lg text-white/90 max-w-lg mb-8">
              {t("trending_desc")}
            </p>
            <a
              href="#featured"
              className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl inline-block"
            >
              {t("book_now")}
            </a>
          </div>
        </div>
      </section>

      {/* 4. FEATURED DESTINATIONS */}
      <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto" id="featured">
        <div className="flex flex-col md:flex-row justify-between mb-10 gap-6">
          <div className="max-w-2xl text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("featured_title")}
            </h2>
            <p className="text-gray-500">{t("featured_subtitle")}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              className="p-4 rounded-full border border-gray-200 hover:bg-gray-100 shadow-sm"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-4 rounded-full bg-amber-300 hover:bg-amber-400 shadow-md"
            >
              <ArrowLeft size={24} className="rotate-180" />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {featuredDestinations.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedTour(item)}
              className="min-w-[300px] md:min-w-[320px] bg-white rounded-2xl overflow-hidden shadow-lg snap-start group cursor-pointer text-left flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.img}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={getTitle(item)}
                />
                <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-md font-bold text-sm shadow-sm border border-emerald-100">
                  {item.price}
                </div>
              </div>
              <div className="p-5 flex-grow">
                <h3 className="font-bold text-gray-900 text-lg mb-4 leading-tight h-12 line-clamp-2">
                  {getTitle(item)}
                </h3>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < item.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-xs">
                      ({item.reviews})
                    </span>
                  </div>
                  <span className="text-teal-600 font-bold text-sm">
                    {t("book_now_caps")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GALLERY SECTION */}
      <section
        id="gallery"
        className="py-20 bg-white px-6 md:px-10 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="max-w-2xl text-left">
            <h2 className="text-5xl font-serif font-bold text-gray-900 mb-4 italic">
              From The Gallery
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Explore the breathtaking beauty of Bali through our curated
              collection of moments. Each image captures the essence of
              paradise.
            </p>
          </div>
          <button className="bg-[#4a5568] hover:bg-gray-800 text-white px-8 py-3 rounded text-sm font-medium transition-all shadow-lg">
            View All Images
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-xl shadow-sm cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-medium border border-white px-4 py-2 rounded uppercase tracking-widest">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
