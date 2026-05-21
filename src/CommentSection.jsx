import React, { useState, useEffect } from "react";
// Import Trash2 untuk ikon hapus yang modern
import { Trash2 } from "lucide-react";
// Import client supabase
import { supabase } from "./supabaseClient";

export default function CommentSection() {
  // Menggunakan array kosong di awal agar tidak memicu error layar putih saat fetch data
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
      "Masukkan Password Admin untuk menghapus ulasan:",
    );

    if (inputPassword === null) return; // Jika admin menekan tombol 'Cancel'

    if (inputPassword === PASSWORD_ADMIN) {
      try {
        const { error } = await supabase.from("reviews").delete().eq("id", id);

        if (error) {
          alert("Gagal menghapus ulasan dari server database.");
          console.error(error);
        } else {
          fetchComments(); // Ambil ulang data terupdate dari cloud
          alert("Ulasan berhasil dihapus!");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert(
        "Password salah! Anda tidak memiliki akses untuk menghapus ulasan ini.",
      );
    }
  };
  // 3. FUNGSI KIRIM ULASAN KE DATABASE CLOUD
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !commentText)
      return alert("Mohon isi nama dan komentar Anda!");

    const formattedDate = new Date().toLocaleDateString("id-ID", {
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
        // MENAMPILKAN PESAN ERROR ASLI DARI SUPABASE
        alert(
          "Gagal dari Supabase: " +
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
        alert("Ulasan berhasil terkirim!");
      }
    } catch (err) {
      alert("Error Sistem: " + err.message);
      console.error(err);
    }
  };

  return (
    <section id="reviews" className="py-16 bg-white text-left">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
          Ulasan Wisatawan
        </h2>
        <p className="text-gray-500 text-center mb-10">
          Apa kata mereka yang sudah berlibur bersama Wayan at Ubud
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* FORM INPUT */}
          <div className="md:col-span-1 bg-gray-50 p-6 rounded-2xl h-fit shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Tulis Ulasan Anda
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  placeholder="Nama Anda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
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
                  Komentar
                </label>
                <textarea
                  rows="4"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-amber-400 focus:outline-none resize-none"
                  placeholder="Ceritakan pengalaman liburan Anda..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2.5 px-4 rounded-xl transition duration-200 shadow-md"
              >
                Kirim Ulasan
              </button>
            </form>
          </div>

          {/* DAFTAR KOMENTAR */}
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
                    {/* TOMBOL HAPUS */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
                      title="Hapus Ulasan"
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
