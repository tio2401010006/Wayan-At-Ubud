import React from "react";
import { ArrowLeft, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const FeaturedDestinations = ({
  featuredDestinations,
  setSelectedTour,
  scroll,
  scrollRef,
}) => {
  const { t, i18n } = useTranslation();

  const getTitle = (item) => {
    return i18n.language === "id"
      ? item.title_id || item.title_en
      : item.title_en || item.title;
  };

  return (
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
        {Array.isArray(featuredDestinations) &&
        featuredDestinations.length > 0 ? (
          featuredDestinations.map((item) => {
            let displayPrice = item.price || "";
            if (i18n.language === "id") {
              displayPrice = displayPrice
                .replace("FULL DAY TOUR", "TUR SEHARI PENUH")
                .replace("HALF DAY TOUR", "TUR SETENGAH HARI")
                .replace("WATERFALL TRIP", "PERJALANAN AIR TERJUN")
                .replace("EXPERIENCE", "PENGALAMAN")
                .replace("ADVENTURE", "PETUALANGAN")
                .replace("Asking For Price", "Hubungi untuk Harga")
                .replace("Asking by Request", "Sesuai Permintaan");
            }

            let displayDuration = item.duration || "Full Day Tour";
            if (i18n.language === "id") {
              displayDuration = displayDuration
                .replace(/Full Day Tour/i, "Tur Sehari Penuh")
                .replace(/Half Day Tour/i, "Tur Setengah Hari")
                .replace(/Waterfall Trip/i, "Perjalanan Air Terjun")
                .replace(/EXPERIENCE/i, "PENGALAMAN")
                .replace(/ADVENTURE/i, "PETUALANGAN")
                .replace(/Asking For Price/i, "Hubungi untuk Harga")
                .replace(/Asking by Request/i, "Sesuai Permintaan");
            }

            return (
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
                  {/* KODE BARU: Label Durasi di Kiri Atas (Sesuai Admin) */}
                  <div className="absolute top-4 left-4 bg-teal-500/90 text-white px-3 py-1 rounded-md font-bold text-[10px] uppercase tracking-wider shadow-sm">
                    {displayDuration}
                  </div>
                  {/* KODE BARU: Label Harga di Kanan Atas (Sesuai Admin) */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-md font-bold text-xs shadow-sm">
                    {displayPrice}
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
                            fill={
                              i < (item.rating || 5) ? "currentColor" : "none"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-gray-400 text-xs">
                        ({item.reviews || 0})
                      </span>
                    </div>
                    <span className="text-teal-600 font-bold text-sm">
                      {t("book_now_caps")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full text-center py-20 text-gray-400">
            <p>Memuat destinasi unggulan...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDestinations;
