import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // 1. Tambahkan import ini

// import translationID from "./locales/id.json";
import translationEN from "./locales/en.json";

const resources = {
  en: { translation: translationEN },
  // id: { translation: translationID },
};

i18n
  .use(LanguageDetector) // 2. Tambahkan ini agar deteksi otomatis aktif
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    // lng: 'en', <--- 3. HAPUS BARIS INI! Jangan hardcode bahasa awalnya
    fallbackLng: "en", // Jika browser bukan ID atau EN, default ke EN

    // 4. Tambahkan aturan deteksi dan penyimpanan ke localStorage
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    interpolation: { escapeValue: false },
  });

export default i18n;
