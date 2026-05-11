import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Globe,
  Send,
  Instagram,
  Facebook,
} from "lucide-react";

const ContactUs = () => {
  const [language, setLanguage] = useState("id");

  const translations = {
    id: {
      heroTitle: "Hubungi Kami",
      heroSub:
        "Siap membantu merencanakan liburan impian Anda di Bali. Jangan ragu untuk menyapa!",
      infoTitle: "Informasi Kontak",
      formTitle: "Kirim Pesan",
      nameLabel: "Nama Lengkap",
      emailLabel: "Alamat Email",
      messageLabel: "Pesan Anda",
      sendBtn: "Kirim Sekarang",
      waMessage: "Halo Wayan, saya ingin bertanya mengenai ketersediaan tour.",
      waSub: "Respon cepat via WhatsApp",
      address: "Jl. Raya Ubud, Gianyar, Bali - Indonesia",
      workingHours: "Setiap Hari: 08:00 - 22:00 WITA",
    },
    en: {
      heroTitle: "Contact Us",
      heroSub:
        "Ready to help plan your dream Bali holiday. Feel free to say hello!",
      infoTitle: "Contact Information",
      formTitle: "Send a Message",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      messageLabel: "Your Message",
      sendBtn: "Send Now",
      waMessage: "Hi Wayan, I would like to inquire about tour availability.",
      waSub: "Fast response via WhatsApp",
      address: "Jl. Raya Ubud, Gianyar, Bali - Indonesia",
      workingHours: "Daily: 08:00 AM - 10:00 PM WITA",
    },
  };

  const t = translations[language];
  const phoneNumber = "6287762023292";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(t.waMessage)}`;

  return (
    <div className="pt-24 pb-20 bg-slate-50 font-sans transition-all duration-500">
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
      <section className="bg-teal-700 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-teal-50 text-lg max-w-2xl mx-auto opacity-90">
            {t.heroSub}
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 -mt-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <h3 className="text-xl font-bold text-gray-900 mb-8">
                {t.infoTitle}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 p-3 rounded-2xl text-teal-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Alamat</p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {t.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 p-3 rounded-2xl text-teal-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Jam Operasional
                    </p>
                    <p className="text-gray-500 text-sm">{t.workingHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 p-3 rounded-2xl text-teal-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-500 text-sm text-wrap">
                      info@wayanatubud.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-10 pt-8 border-t border-slate-100 flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition-all"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition-all"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            {/* Direct WhatsApp Card */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-amber-400 p-8 rounded-3xl shadow-xl hover:bg-amber-300 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-teal-900 font-bold text-xl mb-1">
                    WhatsApp Chat
                  </h4>
                  <p className="text-teal-800 text-sm opacity-80">{t.waSub}</p>
                </div>
                <MessageCircle
                  size={40}
                  className="text-teal-900 group-hover:scale-110 transition-transform"
                />
              </div>
            </a>
          </div>

          {/* Contact Form & Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Form */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                {t.formTitle}
              </h3>
              <form className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-teal-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-teal-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    {t.messageLabel}
                  </label>
                  <textarea
                    rows="4"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-teal-500 transition-all resize-none"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button className="flex items-center justify-center gap-2 bg-teal-600 text-white w-full md:w-auto px-10 py-4 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg">
                    <Send size={18} />
                    {t.sendBtn}
                  </button>
                </div>
              </form>
            </div>

           
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
