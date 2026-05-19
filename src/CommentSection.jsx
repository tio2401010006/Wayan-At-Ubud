import React, { useState, useEffect } from "react";
// Import Trash2 untuk ikon hapus yang modern
import { Trash2 } from "lucide-react";

export default function CommentSection() {
  const defaultComments = [
    {
      id: 1,
      name: "Sarah Jenkins",
      rating: 5,
      comment:
        "Pelayanan sangat memuaskan! Supirnya ramah dan tahu jalan tikus jadi bebas macet ke Ubud. Sangat direkomendasikan!",
      date: "12 Mei 2026",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 4,
      comment:
        "Tour ke Tukad Cepung sangat indah. Penataan jadwalnya pas, hanya saja waktu makan siang agak sedikit terburu-buru. Overall bagus!",
      date: "15 Mei 2026",
    },
  ];

  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem("wayan_tour_comments");
    return savedComments ? JSON.parse(savedComments) : defaultComments;
  });

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    localStorage.setItem("wayan_tour_comments", JSON.stringify(comments));
  }, [comments]);

 const handleDelete = (id) => {
    // Masukkan password rahasia yang Anda inginkan di sini
    const PASSWORD_ADMIN = "wayan123";

    const inputPassword = prompt(
      "Masukkan Password Admin untuk menghapus ulasan:",
    );

    if (inputPassword === null) return; // Jika admin menekan tombol 'Cancel'

    if (inputPassword === PASSWORD_ADMIN) {
      const updatedComments = comments.filter((comment) => comment.id !== id);
      setComments(updatedComments);
      alert("Ulasan berhasil dihapus!");
    } else {
      alert(
        "Password salah! Anda tidak memiliki akses untuk menghapus ulasan ini.",
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !commentText)
      return alert("Mohon isi nama dan komentar Anda!");

    const newComment = {
      id: Date.now(), // ID unik menggunakan timestamp
      name: name,
      rating: rating,
      comment: commentText,
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    setComments([newComment, ...comments]);
    setName("");
    setCommentText("");
    setRating(5);
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
                    <div className="text-amber-400">
                      {"★".repeat(item.rating)}
                      {"☆".repeat(5 - item.rating)}
                    </div>

                    {/* TOMBOL HAPUS (Hanya muncul/lebih jelas saat kartu di-hover) */}
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
