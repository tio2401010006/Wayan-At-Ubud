import React, { useState, useRef } from "react";
import { Link, NavLink, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, MapPin, Users, Search } from "lucide-react";
import LandingPage from "./LandingPage";
import DetailView from "./DetailView";
import AboutUs from "./AboutUs";
import { HelmetProvider, Helmet } from "react-helmet-async";

const App = () => {
  const tourDestinations = [
    {
      id: 101,
      title_en: "FULL DAY TOUR",
      title_id: "TUR SEHARI PENUH",
      price: "IDR 900.000",
      img: "./Tegallalang RIce Terrace.jpg",
      places: [
        { id: "kanto-lampo", name: "Kanto Lampo Waterfall" },
        { id: "tibumana", name: "Tibumana Waterfall" },
        { id: "tukad-cepung", name: "Tukad Cepung Waterfall" },
        { id: "penglipuan", name: "Penglipuran Village" },
        { id: "batur-volcano", name: "Batur Volcano" },
        { id: "Tegalalang", name: "Tegallalang Rice Terrace" },
      ],
    },
    {
      id: 102,
      title_en: "HALF DAY TOUR",
      title_id: "TUR SETENGAH HARI",
      price: "IDR 600.000",
      img: "./Tirta Empul2.jpg",
      places: [
        { id: "tirta-empul", name: "Tampaksiring Holly Water Temple" },
        { id: "tegallalang-rt", name: "Tegallalang Rice Terrace" },
        { id: "coffee", name: "Coffee Plantation" },
        { id: "mongkey-forest", name: "Monkey Forest Ubud" },
      ],
    },
    {
      id: 103,
      title_en: "WATERFALL TRIP",
      title_id: "PERJALANAN AIR TERJUN",
      price: "IDR 550.000",
      img: "./Tukad cepung.jpg",
      places: [
        { id: "kanto-lampo", name: "Kanto Lampo Waterfall" },
        { id: "tibumana", name: "Tibumana Waterfall" },
        { id: "tukad-cepung", name: "Tukad Cepung Waterfall" },
      ],
    },
    {
      id: 104,
      title_en: "ADVENTURE",
      title_id: "PETUALANGAN",
      price: "Asking for Price",
      img: "./Rafting.jpg",
      places: [
        { id: "atv", name: "ATV" },
        { id: "rafting", name: "Rafting" },
        { id: "cycling", name: "Cycling" },
        { id: "jeep-tour", name: "Jeep Tour Batur Sunrise" },
      ],
    },
    {
      id: 104,
      title_en: "PICK UP AIRPORT TO UBUD",
      title_id: "PENJEMPUTAN BANDARA KE UBUD",
      price: "IDR 550.000",
      img: "./Pick Up.jpg",
    },
    {
      id: 104,
      title_en: "EXPRERIENCE",
      title_id: "PENGALAMAN",
      price: "Asking for Price",
      img: "./Cooking Class.jpg",
      places: [
        { id: "Cooking Class Balinese", name: "Cooking Class Balinese" },
        { id: "Silver Class", name: "Silver Class" },
      ],
    },
  ];

  const featuredDestinations = [
    {
      id: 1,
      title_en: "Tampaksiring Holly Water Temple",
      title_id: "Pura Tirta Empul Tampaksiring",
      price: "FULL DAY TOUR IDR 900.000",
      img: "./Tirta Empul2.jpg",
      rating: 5,
      reviews: 584,
    },
    {
      id: 2,
      title_en: "Tegallalang Rice Terrace",
      title_id: "Tegallalang Rice Terrace",
      price: "FULL DAY TOUR IDR 900.000",
      img: "./Tegallalang RIce Terrace.jpg",
      rating: 5,
      reviews: 200,
    },
    {
      id: 3,
      title_en: "Coffee Plantation",
      title_id: "Coffee Plantation",
      price: "HALF DAY TOUR IDR 600.000",
      img: "./Coffee Plantation.jpg",
      rating: 5,
      reviews: 120,
    },
    {
      id: 3,
      title_en: "Tirta Empul Holly Water Tample",
      title_id: "Pura Tirta Empul",
      price: "HALF DAY TOUR IDR 600.000",
      img: "./Tirta Empul.jpg",
      rating: 5,
      reviews: 120,
    },
    {
      id: 3,
      title_en: "Tegallalang Rice Terrace",
      title_id: "Tegallalang Rice Terrace",
      price: "HALF DAY TOUR IDR 600.000",
      img: "./Tegallalang RIce Terrace.jpg",
      rating: 5,
      reviews: 150,
    },
    {
      id: 3,
      title_en: "Monkey Forest Ubud",
      title_id: "Monkey Forest Ubud",
      price: "HALF DAY TOUR IDR 600.000",
      img: "./Monkey forest.jpg",
      rating: 5,
      reviews: 180,
    },
    {
      id: 4,
      title_en: "Tibumana Waterfall",
      title_id: "Tibumana Waterfall",
      price: "FULL DAY TOUR IDR 900.000",
      img: "./Tibumana Waterfall.jpg",
      rating: 5,
      reviews: 300,
    },
    {
      id: 5,
      title_en: "Tukad Cepung Waterfall",
      title_id: "Tukad Cepung Waterfall",
      price: "FULL DAY TOUR IDR 900.000",
      img: "./Tukad cepung.jpg",
      rating: 5,
      reviews: 200,
    },
    {
      id: 5,
      title_en: "Batur Volcano",
      title_id: "Batur Volcano",
      price: "FULL DAY TOUR IDR 900.000",
      img: "./Batur Volacano.jpg",
      rating: 5,
      reviews: 500,
    },
    {
      id: 6,
      title_en: "Penglipuran Village",
      title_id: "Desa Penglipuran",
      price: "FULL DAY TOUR IDR 900.000",
      img: "./Penglipuran Village.jpg",
      rating: 5,
      reviews: 120,
    },
    {
      id: 7,
      title_en: "Kanto Lampo Waterfall",
      title_id: "Kano Lampo Waterfall",
      price: "FULL DAY TOUR IDR 900.000",
      img: "./Kanto Lampo.jpg",
      rating: 5,
      reviews: 100,
    },
    {
      id: 8,
      title_en: "Jeep Tour Sunrise",
      title_id: "Jeep Tour Sunrise",
      price: "Asking for Price",
      img: "./jeep tour.jpg",
      rating: 5,
      reviews: 120,
    },
    {
      id: 9,
      title_en: "ATV",
      title_id: "ATV",
      price: "Asking for Price",
      img: "./ATV2.jpg",
      rating: 5,
      reviews: 180,
    },
    {
      id: 10,
      title_en: "Rafting",
      title_id: "Rafting",
      price: "Asking for Price",
      img: "./Rafting.jpg",
      rating: 5,
      reviews: 120,
    },
    {
      id: 11,
      title_en: "Cycling",
      title_id: "Cycling",
      price: "Asking for Price",
      img: "./Cycling.jpg",
      rating: 5,
      reviews: 200,
    },
    {
      id: 12,
      title_en: "Kanto Lampo Waterfall",
      title_id: "Kano Lampo Waterfall",
      price: "WATERFALL TRIP IDR 550.000",
      img: "./Kanto Lampo.jpg",
      rating: 5,
      reviews: 100,
    },
    {
      id: 13,
      title_en: "Tibumana Waterfall",
      title_id: "Tibumana Waterfall",
      price: "WATERFALL TRIP IDR 550.000",
      img: "./Tibumana Waterfall.jpg",
      rating: 5,
      reviews: 120,
    },
    {
      id: 14,
      title_en: "Tukad Cepung Waterfall",
      title_id: "Tukad Cepung Waterfall",
      price: "WATERFALL TRIP IDR 550.000",
      img: "./Tukad cepung.jpg",
      rating: 5,
      reviews: 120,
    },
    {
      id: 15,
      title_en: "Cooking Class Balinese",
      title_id: "Kelas Memasak Masakan Bali",
      price: "Asking by Request",
      img: "./Cooking Class.jpg",
      rating: 5,
      reviews: 300,
    },
    {
      id: 16,
      title_en: "Silver Class",
      title_id: "Kelas Perak",
      price: "Asking by Request",
      img: "./Silver Class.jpg",
      rating: 5,
      reviews: 120,
    },
  ];

  const galleryImages = [
    { id: 1, name: "Tukad Cepung Waterfall", img: "./Tukad cepung.jpg" },
    { id: 2, name: "Kanto Lampo Waterfall", img: "./Kanto Lampo.jpg" },
    { id: 3, name: "Tibumana Waterfall", img: "./Tibumana Waterfall.jpg" },
    { id: 4, name: "Penglipuran Village", img: "./Penglipuran Village.jpg" },
    {
      id: 5,
      name: "Tegallalang Rice Terrace",
      img: "./Tegallalang RIce Terrace.jpg",
    },
    { id: 6, name: "Rafting", img: "./Rafting.jpg" },
    { id: 7, name: "Tukad Cepung Waterfall", img: "./Tukad cepung.jpg" },
    { id: 8, name: "Monkey Forest Ubud", img: "./Monkey forest.jpg" },
    { id: 9, name: "Jeep Tour Sunrise", img: "./jeep tour.jpg" },
    { id: 10, name: "Cycling", img: "./Cycling.jpg" },
    { id: 11, name: "Cooking Class Balinese", img: "./Cooking Class.jpg" },
    { id: 12, name: "Batur Volcano", img: "./Batur Volacano.jpg" },
    { id: 13, name: "ATV", img: "./ATV.jpg" },
    { id: 14, name: "Silver Class", img: "./Kanto Lampo.jpg" },
    {
      id: 15,
      name: "Tirta Empul Holly Water Temple",
      img: "./Tirta Empul2.jpg",
    },
    {
      id: 15,
      name: "Tirta Empul Holly Water Temple",
      img: "./Tirta Empul.jpg",
    },
  ];

  const location = useLocation();
  const isAboutPage = location.pathname === "/AboutUs";
  const [selectedTour, setSelectedTour] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollRef = useRef(null);
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  // Logika filter data
  const filteredTours = tourDestinations.filter((tour) => {
    const title =
      i18n.language === "id"
        ? tour.title_id || tour.title_en || ""
        : tour.title_en || "";
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Fungsi yang dipanggil saat tombol Cari diklik
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Jika ingin otomatis scroll ke bagian paket setelah klik cari:
    const element = document.getElementById("packages");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  if (selectedTour) {
    const tourTitle = i18n.language === "id" ? selectedTour.title_id : selectedTour.title_en;
    return (
      <HelmetProvider>
        <Helmet>
          <title>{`${tourTitle} Best Price - Wayan at Ubud Bali Tour`}</title>
          <meta 
            name="description" 
            content={i18n.language === "id" 
              ? `Pesan paket ${tourTitle} terbaik di Ubud, Bali. Harga terjangkau ${selectedTour.price}, sopir berpengalaman, dan pelayanan ramah.`
              : `Book the best ${tourTitle} in Ubud, Bali. Affordable price at ${selectedTour.price}, experienced driver, and friendly service.`
            } 
          />
          <meta name="keywords" content={`ubud tour, bali driver, ${tourTitle ? tourTitle.toLowerCase() : ""}, bali waterfall trip`} />
          <meta property="og:title" content={`${tourTitle} - Wayan at Ubud`} />
          <meta property="og:description" content={`Best tour package in Bali: ${tourTitle}. Price: ${selectedTour.price}`} />
          <meta property="og:image" content={`${window.location.origin}/${selectedTour.img}`} />
        </Helmet>
        <DetailView
          tour={selectedTour}
          onBack={() => setSelectedTour(null)}
          language={i18n.language}
        />
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <div className="min-h-screen font-sans bg-gray-50 overflow-x-hidden text-left">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>{i18n.language === "id" ? "Wayan at Ubud - Tur & Driver Kustom Terbaik di Bali" : "Wayan at Ubud - Best Custom Tours & Private Driver in Bali"}</title>
                  <meta 
                    name="description" 
                    content={i18n.language === "id"
                      ? "Nikmati liburan tak terlupakan di Bali bersama Wayan at Ubud. Menyediakan tur sehari penuh, perjalanan air terjun, petualangan ATV/Rafting, dan penjemputan bandara."
                      : "Enjoy an unforgettable holiday in Bali with Wayan at Ubud. Offering full day tours, waterfall trips, ATV/Rafting adventures, and airport pick-up."
                    } 
                  />
                  <meta name="keywords" content="ubud tour, bali private driver, bali custom tour, ubud waterfall trip, mt batur jeep tour, balinese cooking class, wayan ubud" />
                  <meta property="og:title" content="Wayan at Ubud - Bali Private Tour" />
                  <meta property="og:description" content="Explore Ubud and Bali with custom tour packages. Best price guaranteed." />
                  <meta property="og:image" content={`${window.location.origin}/Tegallalang RIce Terrace.jpg`} />
                </Helmet>
                <LandingPage
                  tourDestinations={filteredTours}
                  onSearch={(query) => setSearchQuery(query)}
                  featuredDestinations={featuredDestinations}
                  galleryImages={galleryImages}
                  setSelectedTour={setSelectedTour}
                  scroll={scroll}
                  scrollRef={scrollRef}
                />
              </>
            }
          />
          <Route
            path="/AboutUs"
            element={
              <>
                <Helmet>
                  <title>{i18n.language === "id" ? "Tentang Kami - Wayan at Ubud" : "About Us - Wayan at Ubud"}</title>
                  <meta 
                    name="description" 
                    content={i18n.language === "id"
                      ? "Ketahui lebih lanjut tentang Wayan at Ubud, penyedia layanan tur lokal terpercaya di Ubud, Bali yang berkomitmen memberikan pengalaman wisata terbaik."
                      : "Learn more about Wayan at Ubud, a trusted local tour provider in Ubud, Bali committed to delivering the best travel experiences."
                    } 
                  />
                </Helmet>
                <AboutUs language={i18n.language} />
              </>
            }
          />
        </Routes>

        <nav
          className={`flex items-center justify-between px-6 md:px-10 py-5 w-full z-50 transition-all duration-300 ${
            isAboutPage
              ? "bg-[#0b1629] sticky top-0 shadow-lg text-white"
              : "bg-transparent absolute text-white"
          }`}
        >
          <h1 className="text-xl font-bold italic tracking-tighter">
            WAYAN at UBUD
          </h1>

          <div className="hidden md:flex space-x-8 font-medium">
            {/* NavLink otomatis memberikan class 'active' saat diklik */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors duration-300 hover:text-amber-300 ${isActive ? "" : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/AboutUs"
              className={({ isActive }) =>
                `transition-colors duration-300 hover:text-amber-300 ${isActive ? "" : ""}`
              }
            >
              About Us
            </NavLink>

            <a
              href="#packages"
              className="hover:text-amber-300 transition-colors"
            >
              Packages
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-[#0f1d33] z-[60] flex flex-col items-center justify-center text-white space-y-8 text-2xl transition-all duration-300">
            {/* Tombol Close (Opsional jika ingin tombol terpisah, tapi icon X sudah ada di navbar) */}
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              {t("nav_home")}
            </Link>
            <Link to="/AboutUs" onClick={() => setIsMenuOpen(false)}>
              {t("nav_about")}
            </Link>
            <Link to="/ContactUs" onClick={() => setIsMenuOpen(false)}>
              {t("nav_contact")}
            </Link>
            <a href="#packages" onClick={() => setIsMenuOpen(false)}>
              {t("nav_packages")}
            </a>

            {/* Tambahkan pilihan bahasa juga di menu mobile agar user mudah akses */}
            <div className="pt-10">
              <select
                onChange={(e) => {
                  changeLanguage(e);
                  setIsMenuOpen(false);
                }}
                value={i18n.language}
                className="bg-gray-800 text-base text-white p-2 rounded border border-gray-700"
              >
                <option value="en">English</option>
                <option value="id">Indonesia</option>
              </select>
            </div>
          </div>
        )}

        {/* FOOTER BARU (SESUAI DESAIN GAMBAR) */}
        <footer className="bg-[#0b1629] text-gray-400 py-16 px-6 md:px-16 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Kolom 1: Language */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg">Language</h4>
                <div className="relative">
                  <select
                    onChange={changeLanguage}
                    value={i18n.language}
                    className="w-full bg-[#162235] text-white p-3 rounded-md border border-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="en">🇬🇧 English (UK)</option>
                    <option value="id">🇮🇩 Indonesia</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Kolom 2: Company */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/AboutUs"
                      className="hover:text-white transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Kolom 3: Help */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg">Help</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>

              {/* Kolom 4: Payment Methods */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg">
                  Payment Methods
                </h4>
                <div className="flex gap-2">
                  <div className="bg-white px-3 py-1 rounded text-[#0b1629] font-black text-[10px] shadow-sm">
                    VISA
                  </div>
                  <div className="bg-white px-3 py-1 rounded text-[#0b1629] font-black text-[10px] shadow-sm">
                    MC
                  </div>
                  <div className="bg-white px-3 py-1 rounded text-[#0b1629] font-black text-[10px] shadow-sm">
                    PAYPAL
                  </div>
                </div>
              </div>
            </div>

            {/* Garis Pembatas & Copyright */}
            <div className="pt-8 border-t border-gray-800 text-center text-sm">
              <p>Copyright 2026 ByO.Digital. All Rights Reserved</p>
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
};

export default App;
