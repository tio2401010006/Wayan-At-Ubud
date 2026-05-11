import React, { useState } from "react";
import { Camera, MapPin, Calendar, ShieldCheck, MessageCircle, Star, Award, Users, Globe } from 'lucide-react';

const AboutUs = () => {
  const [language, setLanguage] = useState("id");

  const translations = {
    id: {
      heroTitle: "Dedikasi Kami untuk Petualangan Anda",
      storyTitle: "Siapa Kami?",
      storyDesc: "Wayan at Ubud merupakan sebuah usaha di bidang jasa travel dan tour guide yang telah beroperasi sejak tahun 2010. Berawal dari layanan transportasi wisata, usaha ini terus berkembang dengan mengutamakan kenyamanan, keamanan, dan kepuasan pelanggan selama berada di Bali, khususnya di kawasan Ubud dan sekitarnya.",
      guideTitle: "Kenali Pemandu Anda",
      guideName: "Wayan",
      guideRole: "Founder & Lead Guide",
      guideBio: "Dengan pengalaman lebih dari satu dekade, saya berkomitmen untuk menghadirkan sisi magis Bali yang tidak Anda temukan di peta biasa.",
      statsCustomer: "Pelanggan Puas",
      statsYears: "Tahun Pengalaman",
      statsTours: "Destinasi Tour",
      ctaTitle: "Siap Menjelajahi Bali?",
      waMessage: "Halo Wayan, saya ingin bertanya tentang paket tour di Bali.",
      ctaBtn: "Chat via WhatsApp",
      trustText: "Pemandu Terpercaya",
      trustSub: "di TripAdvisor & Google"
    },
    en: {
      heroTitle: "Our Dedication to Your Adventure",
      storyTitle: "Who We Are?",
      storyDesc: "Wayan at Ubud is a travel and tour guide service operating since 2010. Starting from tourism transportation, we have grown by prioritizing comfort, safety, and customer satisfaction in Bali, specifically in the Ubud area and its surroundings.",
      guideTitle: "Meet Your Guide",
      guideName: "Wayan",
      guideRole: "Founder & Lead Guide",
      guideBio: "With over a decade of experience, I am committed to bringing you the magical side of Bali that you won't find on a standard map.",
      statsCustomer: "Happy Customers",
      statsYears: "Years Experience",
      statsTours: "Tour Destinations",
      ctaTitle: "Ready to Explore Bali?",
      waMessage: "Hi Wayan, I would like to ask about your tour packages in Bali.",
      ctaBtn: "Chat via WhatsApp",
      trustText: "Top Rated Guide",
      trustSub: "on TripAdvisor & Google"
    }
  };

  const t = translations[language];

  // 1. Definisikan Nomor Telepon & URL Dinamis (Sudah termasuk pesan otomatis)
  const phoneNumber = "6287762023292";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(t.waMessage)}`;

  return (
    <div className="pt-24 pb-20 bg-white text-left font-sans transition-all duration-500">
      
      {/* Floating Language Switcher */}
      <div className="fixed top-28 right-6 z-50">
        <button 
          onClick={() => setLanguage(language === "id" ? "en" : "id")}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-slate-200 px-4 py-2 rounded-full shadow-lg hover:bg-slate-50 transition-all font-bold text-teal-600"
        >
          <Globe size={18} />
          {language === "id" ? "EN" : "ID"}
        </button>
      </div>

      {/* Hero Section */}
      <section className="px-6 md:px-10 mb-20">
        <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          <img src="./Tirta Empul3.jpg" className="w-full h-full object-cover object-bottom" alt="About Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 md:p-16">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight transition-opacity duration-300">
              {t.heroTitle}
            </h1>
          </div>
        </div>
      </section>

      {/* Story & Stats Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-4">{t.storyTitle}</h2>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-snug">
              {language === "id" ? "Membangun Kepercayaan Sejak 2010." : "Building Trust Since 2010."}
            </p>
            <p className="text-gray-600 leading-relaxed text-lg mb-8 text-justify">
              {t.storyDesc}
            </p>
            
            <div className="grid grid-cols-3 gap-4 border-t pt-8">
              <div>
                <p className="text-3xl font-bold text-gray-900">1K+</p>
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-tighter">{t.statsCustomer}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">14+</p>
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-tighter">{t.statsYears}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">50+</p>
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-tighter">{t.statsTours}</p>
              </div>
            </div>
          </div>
          
          <div className="relative order-1 md:order-2">
            <img src="./jeep tour.jpg" alt="Landscape" className="rounded-2xl shadow-lg w-full h-[400px] object-cover" />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl hidden md:block border border-gray-100">
               <div className="flex items-center gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                    <Star fill="currentColor" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{t.trustText}</p>
                    <p className="text-gray-500 text-sm">{t.trustSub}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile/Guide Section */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t.guideTitle}</h2>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-10">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg shrink-0">
              <img src="./Wayan.jpeg" alt="Wayan" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{t.guideName}</h3>
              <p className="text-teal-600 font-medium mb-4">{t.guideRole}</p>
              <p className="text-gray-600 text-lg italic mb-6 leading-relaxed">
                "{t.guideBio}"
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
                  <Award size={16} className="text-teal-600" /> Licensed Guide
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
                  <Users size={16} className="text-teal-600" /> Family Friendly
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-20 px-6">
        <div className="max-w-4xl mx-auto bg-teal-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.ctaTitle}</h2>
            <p className="text-teal-50 text-opacity-90 mb-10 text-lg">
              {language === "id" ? "Hubungi kami sekarang untuk rencana perjalanan terbaik." : "Contact us now for the best travel itinerary."}
            </p>
            
            {/* Tombol dengan Link WhatsApp Otomatis */}
            <a 
              href={whatsappUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-amber-400 text-teal-700 px-10 py-4 rounded-full font-extrabold text-lg hover:scale-105 hover:bg-amber-300 transition-all shadow-lg"
            >
              <MessageCircle size={24} />
              {t.ctaBtn}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;