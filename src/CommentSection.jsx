import React, { useState, useEffect } from "react";
// Import Trash2 untuk ikon hapus yang modern
import { Trash2 } from "lucide-react";
// Import client supabase
import { supabase } from "./supabaseClient";
// Import hook language context
import { useTranslation } from "react-i18next";

// Pastikan defaultComments didefinisikan di luar komponen agar tidak memicu error jika database kosong
const defaultComments = [
  {
    id: "d1",
    name: "Maria julie",
    date: "22 Mei 2026",
    rating: 5,
    comment: "A very exciting holiday experience with Wayan, he is a very good and experienced driver."
  },
  {
    id: "d2",
    name: "Andrew smith",
    date: "21 Mei 2026",
    rating: 5,
    comment: "Excellent service! He is a very professional driver, knowledgeable about the local areas, and speaks good English. Highly recommended for anyone traveling around Bali!"
  },
  {
    id: "d3",
    name: "Ade Tio",
    date: "24 Desember 2026",
    rating: 5,
    comment: "Wayan at ubud adalah tour guide yang saya sangat sukai, pertama kali ke bali saya langsung tetarik dengan jasa wayan ubud"
  }
];

export default function CommentSection() {
  // Ambil fungsi 't' dan 'i18n' dari library
  const { t, i18n } = useTranslation();
  
  // Ambil bahasa yang aktif saat ini ('id' atau 'en')
  const locale = i18n.language; 

  // ... sisa kode handleSubmit, fetchComments, dan UI kamu tetap sama ...


  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [commentText, setCommentText] = useState("");

  // 1. FUNGSI AMBIL DATA DARI SUPABASE CLOUD
  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("id", { ascending: false }); // Ulasan terbaru berada di atas

      if (error) {
        console.error("Gagal mengambil data dari Supabase:", error);
        setComments(defaultComments);
      } else {
        // Jika database kosong, pakai ulasan default bawaan agar web tidak sepi
        setComments(data && data.length > 0 ? data : defaultComments);
      }
    } catch (err) {
      console.error("Error tidak terduga:", err);
      setComments(defaultComments);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // 2. FUNGSI HAPUS ULASAN DI DATABASE CLOUD
  const handleDelete = async (id) => {
    const PASSWORD_ADMIN = "wayan123";
    const inputPassword = prompt(
      locale === "id" 
        ? "Masukkan Password Admin untuk menghapus ulasan:" 
        : "Enter Admin Password to delete this review:"
    );

    if (inputPassword === null) return; // Jika admin menekan tombol 'Cancel'

    if (inputPassword === PASSWORD_ADMIN) {
      try {
        const { error } = await supabase.from("reviews").delete().eq("id", id);

        if (error) {
          alert(locale === "id" ? "Gagal menghapus ulasan dari server database." : "Failed to delete review from database server.");
          console.error(error);
        } else {
          fetchComments(); // Ambil ulang data terupdate dari cloud
          alert(locale === "id" ? "Ulasan berhasil dihapus!" : "Review deleted successfully!");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert(
        locale === "id"
          ? "Password salah! Anda tidak memiliki akses untuk menghapus ulasan ini."
          : "Incorrect password! You do not have access to delete this review."
      );
    }
  };

  // 3. FUNGSI KIRIM ULASAN KE DATABASE CLOUD
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !commentText) {
      return alert(locale === "id" ? "Mohon isi nama dan komentar Anda!" : "Please fill in your name and comment!");
    }

    // Format tanggal dinamis mengikuti bahasa aktif saat submit ulasan
    const formattedDate = new Date().toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const newComment = {
      name: name,
      rating: rating,
      comment: commentText,
      date: formattedDate,
    };

    try {
      const { error } = await supabase.from("reviews").insert([newComment]);

      if (error) {
        alert(
          (locale === "id" ? "Gagal dari Supabase: " : "Failed from Supabase: ") +
            error.message +
            " (Kode: " +
            error.code +
            ")",
        );
        console.error(error);
      } else {
        fetchComments(); // Ambil data ulasan terbaru agar langsung muncul di layar
        setName("");
        setCommentText("");
        setRating(5);
        alert(locale === "id" ? "Ulasan berhasil terkirim!" : "Review submitted successfully!");
      }
    } catch (err) {
      alert("Error Sistem: " + err.message);
      console.error(err);
    }
  };

  return (
    <section id="reviews" className="py-16 bg-white text-left">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* JUDUL UTAMA */}
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
          {t("reviews_title")}
        </h2>
        <p className="text-gray-500 text-center mb-10">
          {t("reviews_subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* FORM INPUT (KIRI) */}
          <div className="md:col-span-1 bg-gray-50 p-6 rounded-2xl h-fit shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {t("review_form_title")}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("review_name_label")}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  placeholder={t("review_name_placeholder")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("review_rating_label")}
                </label>
                <div className="flex gap-1 text-2xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={
                        star <= rating ? "text-amber-400" : "text-gray-300"
                      }
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("review_comment_label")}
                </label>
                <textarea
                  rows="4"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-amber-400 focus:outline-none resize-none"
                  placeholder={t("review_comment_placeholder")}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2.5 px-4 rounded-xl transition duration-200 shadow-md"
              >
                {t("review_submit_button")}
              </button>
            </form>
          </div>

          {/* DAFTAR KOMENTAR (KANAN) */}
          <div className="md:col-span-2 space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {comments.map((item) => (
              <div
                key={item.id}
                className="p-5 border border-gray-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition group relative"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Proteksi rating dengan Number() agar tidak memicu screen blank/putih */}
                    <div className="text-amber-400">
                      {"★".repeat(Number(item.rating) || 5)}
                      {"☆".repeat(5 - (Number(item.rating) || 5))}
                    </div>

                    {/* TOMBOL HAPUS */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
                      title={locale === "id" ? "Hapus Ulasan" : "Delete Review"}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed pr-6">
                  {item.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}