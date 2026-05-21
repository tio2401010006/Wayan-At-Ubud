import "./i18n"; // Tetap di paling atas
import "./index.css"; // PINDAH KE SINI (Di atas App dan komponen lainnya)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // 1. Impor komponen di sini

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        {" "}
        {/* 2. Bungkus App dengan HelmetProvider */}
        <App />
      </HelmetProvider>{" "}
      {/* 3. Jangan lupa tutup tag-nya */}
    </BrowserRouter>
  </React.StrictMode>,
);
