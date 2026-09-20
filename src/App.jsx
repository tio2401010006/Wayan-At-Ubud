import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import LandingPage from "./LandingPage";
import DetailView from "./DetailView";
import AboutUs from "./AboutUs";
import AdminContainer from "./AdminContainer";
import { supabase } from "./supabaseClient";
import { HelmetProvider, Helmet } from "react-helmet-async";

const App = () => {
  const [tourDestinations, setTourDestinations] = useState([]);
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [slides, setSlides] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAboutPage = location.pathname === "/AboutUs";
  const isAdminPage = location.pathname === "/admin";

  const [selectedTour, setSelectedTour] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollRef = useRef(null);
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadWebsiteData = async () => {
      try {
        const { data: tours } = await supabase
          .from("tours")
          .select("*")
          .order("id", { ascending: false });
        setTourDestinations(tours || []);

        // Fetch untuk Featured Destinations
        const { data: tourData } = await supabase
          .from("tours")
          .select("*")
          .eq("is_featured", true);

        // 3. SET STATE
        if (tourData) {
          setFeaturedDestinations(tourData);
        }

        // (Optional: Fetch untuk slideshow jika perlu)
        const { data: slideData } = await supabase
          .from("slideshow")
          .select("*");
        if (slideData) {
          setSlides(slideData);
        }

        const { data: gallery } = await supabase
          .from("gallery")
          .select("*")
          .order("id", { ascending: false });
        setGalleryImages(gallery || []);
      } catch (error) {
        console.error("Gagal mengambil data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadWebsiteData();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1629] flex items-center justify-center text-white font-medium">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-amber-300 border-t-transparent rounded-full animate-spin"></div>
          <p>Memuat Data Terupdate...</p>
        </div>
      </div>
    );
  }

  if (selectedTour) {
    const tourTitle =
      i18n.language === "id" ? selectedTour.title_id : selectedTour.title_en;
    return (
      <HelmetProvider>
        <Helmet>
          <title>{`${tourTitle} Best Price - Wayan at Ubud Bali Tour`}</title>
          <meta
            name="description"
            content={
              i18n.language === "id"
                ? `Pesan paket ${tourTitle}...`
                : `Book the best ${tourTitle}...`
            }
          />
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
        {/* --- SEKSI NAVBAR & MOBILE MENU UTAMA --- */}
        {!isAdminPage && (
          <>
            {/* 1. NAVBAR UTAMA */}
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

              {/* Menu Navigasi Desktop */}
              <div className="hidden md:flex items-center space-x-8 font-medium">
                <NavLink
                  to="/"
                  className="hover:text-amber-300 transition-colors"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/AboutUs"
                  className="hover:text-amber-300 transition-colors"
                >
                  About Us
                </NavLink>
                <a
                  href="#packages"
                  className="hover:text-amber-300 transition-colors"
                >
                  Packages
                </a>

                {/* Tombol Admin versi Desktop */}
                <Link
                  to="/admin"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg"
                >
                  Admin Panel
                </Link>
              </div>

              {/* Tombol Hamburger Garis Tiga (Hanya HP) */}
              <button
                type="button"
                className="md:hidden text-white block z-[70] focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </nav>

            {/* 2. OVERLAY TIRAI MENU MOBILE */}
            {isMenuOpen && (
              <div className="fixed inset-0 bg-[#0f1d33] z-[60] flex flex-col items-center justify-center text-white space-y-8 text-2xl font-medium md:hidden">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-amber-300"
                >
                  {t("nav_home") || "Home"}
                </Link>
                <Link
                  to="/AboutUs"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-amber-300"
                >
                  {t("nav_about") || "About Us"}
                </Link>
                <a
                  href="#packages"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-amber-300"
                >
                  {t("nav_packages") || "Our Packages"}
                </a>

                {/* Tombol Admin versi Mobile */}
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-6 bg-teal-600 hover:bg-teal-700 text-white px-10 py-3 rounded-full text-lg font-bold transition-all shadow-md active:scale-95 text-center w-64 block"
                >
                  Admin Panel
                </Link>
              </div>
            )}
          </>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>
                    {i18n.language === "id"
                      ? "Wayan at Ubud - Tur Bali"
                      : "Wayan at Ubud - Bali Custom Tours"}
                  </title>
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
            element={<AboutUs language={i18n.language} />}
          />
          <Route path="/admin" element={<AdminContainer />} />
        </Routes>

        {/* --- FOOTER UTAMA --- */}
        {!isAdminPage && (
          <footer className="bg-[#0b1629] text-gray-400 py-16 px-6 md:px-16 border-t border-gray-800">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                {/* <div className="space-y-4">
                  <h4 className="text-white font-bold text-lg">Language</h4>
                  <select
                    onChange={changeLanguage}
                    value={i18n.language}
                    className="w-full bg-[#162235] text-white p-3 rounded-md border border-gray-700"
                  >
                    <option value="en">🇬🇧 English (UK)</option>
                    <option value="id">🇮🇩 Indonesia</option>
                  </select>
                </div> */}
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
                  </ul>
                </div>
              </div>
              <div className="pt-8 border-t border-gray-800 text-center text-sm">
                <p>Copyright 2026 ByO.Digital. All Rights Reserved</p>
              </div>
            </div>
          </footer>
        )}
      </div>
    </HelmetProvider>
  );
};

export default App;
