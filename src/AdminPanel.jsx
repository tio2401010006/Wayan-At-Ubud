import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import {
  Plus,
  Trash2,
  Edit2,
  Upload,
  Package,
  Image as ImageIcon,
  Sliders,
  X,
} from "lucide-react";

const AdminPanel = () => {
  // State Tours
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form State Tours
  const [titleEn, setTitleEn] = useState("");
  const [titleId, setTitleId] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(5);
  const [imageFile, setImageFile] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [placesInput, setPlacesInput] = useState("");
  const [duration, setDuration] = useState("Full Day Tour"); // State Durasi / Kategori Utama

  // State pelacak untuk manajemen Edit Paket Wisata (Tours)
  const [editTourId, setEditTourId] = useState(null);
  const [existingTourImgUrl, setExistingTourImgUrl] = useState("");

  // State Gallery
  const [galleryName, setGalleryName] = useState("");
  const [galleryFile, setGalleryFile] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  // State Khusus Slideshow Utama
  const [slideshows, setSlideshows] = useState([]);
  const [slideTitleEn, setSlideTitleEn] = useState("");
  const [slideTitleId, setSlideTitleId] = useState("");
  const [slidePrice, setSlidePrice] = useState("");
  const [slideDuration, setSlideDuration] = useState("Full Day Tour"); // State Durasi Slideshow
  const [slideFile, setSlideFile] = useState(null);
  const [isUploadingSlide, setIsUploadingSlide] = useState(false);

  // State pelacak untuk manajemen Edit Slideshow
  const [editSlideId, setEditSlideId] = useState(null);
  const [existingSlideImgUrl, setExistingSlideImgUrl] = useState("");

  useEffect(() => {
    fetchTours();
    fetchGalleries();
    fetchSlideshows();
  }, []);

  const fetchTours = async () => {
    const { data, error } = await supabase
      .from("tours")
      .select("*")
      .order("id", { ascending: false });
    if (!error) setTours(data || []);
  };

  const fetchGalleries = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("id", { ascending: false });
    if (!error) setGalleries(data || []);
  };

  const fetchSlideshows = async () => {
    const { data, error } = await supabase
      .from("slideshow")
      .select("*")
      .order("id", { ascending: false });
    if (!error) setSlideshows(data || []);
  };

  // ==========================================
  // LOGIKA PAKET WISATA (TOURS)
  // ==========================================

  const handleEditTourTrigger = (tour) => {
    setEditTourId(tour.id);
    setTitleEn(tour.title_en || "");
    setTitleId(tour.title_id || "");
    setPrice(tour.price || "");
    setRating(tour.rating || 5);
    setIsFeatured(tour.is_featured || false);
    setDuration(tour.duration || "Full Day Tour");
    setPlacesInput(tour.places ? tour.places.join(", ") : "");
    setExistingTourImgUrl(tour.img || "");
    setImageFile(null);
  };

  const handleCancelEditTour = () => {
    setEditTourId(null);
    setExistingTourImgUrl("");
    resetForm();
  };

  const handleSaveTour = async (e) => {
    e.preventDefault();
    if (!editTourId && !imageFile)
      return alert("Silakan pilih gambar terlebih dahulu!");

    setLoading(true);
    try {
      const placesArray = placesInput
        ? placesInput
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "")
        : [];

      let imgUrl = existingTourImgUrl;

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `tours/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("tour-images")
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("tour-images").getPublicUrl(filePath);

        imgUrl = publicUrl;
      }

      const tourPayload = {
        title_en: titleEn,
        title_id: titleId,
        price: price,
        rating: parseInt(rating),
        img: imgUrl,
        is_featured: isFeatured,
        places: placesArray,
        duration: duration, // Menyimpan label utama durasi (misal: Full Day Tour)
      };

      if (editTourId) {
        const { error: updateError } = await supabase
          .from("tours")
          .update(tourPayload)
          .eq("id", editTourId);

        if (updateError) throw updateError;
        alert("Paket wisata berhasil diperbarui!");
      } else {
        const { error: insertError } = await supabase
          .from("tours")
          .insert([{ ...tourPayload, reviews: 0 }]);

        if (insertError) throw insertError;
        alert("Paket wisata berhasil ditambahkan!");
      }

      handleCancelEditTour();
      fetchTours();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTour = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus paket ini?")) {
      const { error } = await supabase.from("tours").delete().eq("id", id);
      if (!error) {
        if (editTourId === id) handleCancelEditTour();
        fetchTours();
      } else {
        alert(error.message);
      }
    }
  };

  const resetForm = () => {
    setTitleEn("");
    setTitleId("");
    setPrice("");
    setRating(5);
    setImageFile(null);
    setIsFeatured(false);
    setPlacesInput("");
    setDuration("Full Day Tour");
  };

  // ==========================================
  // LOGIKA KELOLA SLIDESHOW UTAMA
  // ==========================================
  const handleEditSlideshowTrigger = (slide) => {
    setEditSlideId(slide.id);
    setSlideTitleEn(slide.title_en || "");
    setSlideTitleId(slide.title_id || "");
    setSlidePrice(slide.price || "");
    setSlideDuration(slide.duration || "Full Day Tour");
    setExistingSlideImgUrl(slide.img || "");
    setSlideFile(null);
  };

  const handleCancelEditSlideshow = () => {
    setEditSlideId(null);
    setSlideTitleEn("");
    setSlideTitleId("");
    setSlidePrice("");
    setSlideDuration("Full Day Tour");
    setExistingSlideImgUrl("");
    setSlideFile(null);
  };

  const handleSaveSlideshow = async (e) => {
    e.preventDefault();
    if (!editSlideId && !slideFile)
      return alert("Gambar slideshow wajib diunggah!");
    setIsUploadingSlide(true);

    try {
      let imgUrl = existingSlideImgUrl;

      if (slideFile) {
        const fileExt = slideFile.name.split(".").pop();
        const fileName = `slide-${Date.now()}.${fileExt}`;
        const filePath = `slideshow/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("tour-images")
          .upload(filePath, slideFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("tour-images")
          .getPublicUrl(filePath);
        imgUrl = publicUrlData.publicUrl;
      }

      const slideshowPayload = {
        title_en: slideTitleEn,
        title_id: slideTitleId,
        price: slidePrice,
        duration: slideDuration,
        img: imgUrl,
      };

      if (editSlideId) {
        const { error: dbError } = await supabase
          .from("slideshow")
          .update(slideshowPayload)
          .eq("id", editSlideId);

        if (dbError) throw dbError;
        alert("Gambar slideshow berhasil diperbarui!");
      } else {
        const { error: dbError } = await supabase
          .from("slideshow")
          .insert([slideshowPayload]);

        if (dbError) throw dbError;
        alert("Gambar slideshow berhasil ditambahkan!");
      }

      handleCancelEditSlideshow();
      fetchSlideshows();
    } catch (error) {
      alert("Gagal menyimpan slideshow: " + error.message);
    } finally {
      setIsUploadingSlide(false);
    }
  };

  const handleDeleteSlideshow = async (id) => {
    if (!window.confirm("Hapus gambar slideshow ini?")) return;
    try {
      const { error } = await supabase.from("slideshow").delete().eq("id", id);
      if (error) throw error;
      if (editSlideId === id) handleCancelEditSlideshow();
      fetchSlideshows();
    } catch (error) {
      alert("Gagal menghapus slideshow: " + error.message);
    }
  };

  // ==========================================
  // LOGIKA GALERI FOTO
  // ==========================================
  const handleSaveGallery = async (e) => {
    e.preventDefault();
    if (!galleryName || !galleryFile)
      return alert("Nama dan gambar wajib diisi!");
    setIsUploadingGallery(true);

    try {
      const fileExt = galleryFile.name.split(".").pop();
      const fileName = `gallery-${Date.now()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("tour-images")
        .upload(filePath, galleryFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("tour-images")
        .getPublicUrl(filePath);
      const imgUrl = publicUrlData.publicUrl;

      const { error: dbError } = await supabase
        .from("gallery")
        .insert([{ name: galleryName, img: imgUrl }]);

      if (dbError) throw dbError;

      alert("Foto galeri berhasil ditambahkan!");
      setGalleryName("");
      setGalleryFile(null);
      fetchGalleries();
    } catch (error) {
      alert("Gagal: " + error.message);
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm("Hapus foto galeri ini?")) return;
    try {
      await supabase.from("gallery").delete().eq("id", id);
      fetchGalleries();
    } catch (error) {
      alert("Gagal menghapus: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 text-left text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Package className="text-teal-600" /> Wayan at Ubud - Admin Dashboard
        </h1>

        {/* --- SEKSI 1: PAKET WISATA --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Create/Edit Tour */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1 h-fit">
            <h2 className="text-xl font-bold mb-4">
              {editTourId ? "Edit Paket Wisata" : "Tambah Paket Baru"}
            </h2>
            <form onSubmit={handleSaveTour} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Judul (English)
                </label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  required
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Judul (Indonesia)
                </label>
                <input
                  type="text"
                  value={titleId}
                  onChange={(e) => setTitleId(e.target.value)}
                  required
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Harga
                </label>
                <input
                  type="text"
                  placeholder="e.g. IDR 900.000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Keterangan Waktu / Durasi Utama
                </label>
                <input
                  type="text"
                  placeholder="Cth: Full Day Tour, Half Day Tour, 2 Hours"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg outline-none focus:border-teal-500 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Destinasi / Kategori Penanda (Koma)
                </label>
                <input
                  type="text"
                  placeholder="Cth: Tibumana Waterfall, Waterfall Trip, Nature"
                  value={placesInput}
                  onChange={(e) => setPlacesInput(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg outline-none focus:border-teal-500 text-sm"
                />
                <small className="text-[10px] text-gray-400 mt-1 block">
                  *Gunakan kolom ini untuk mengelompokkan jenis trip atau nama
                  tempat.
                </small>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Rating Star
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-200 rounded-lg outline-none focus:border-teal-500"
                  />
                </div>
                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label
                    htmlFor="featured"
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    Masuk Slideshow
                  </label>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Upload Gambar
                </label>
                <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-teal-500 cursor-pointer relative bg-gray-50">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="flex text-sm text-gray-600 mt-2">
                      <span className="text-teal-600 font-medium text-xs text-center">
                        {imageFile
                          ? imageFile.name
                          : editTourId
                            ? "Pilih gambar baru jika ingin diganti"
                            : "Pilih file gambar"}
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${editTourId ? "bg-blue-600 hover:bg-blue-700" : "bg-teal-600 hover:bg-teal-700"}`}
                >
                  {editTourId ? <Edit2 size={18} /> : <Plus size={18} />}
                  {loading
                    ? "Menyimpan..."
                    : editTourId
                      ? "Perbarui Paket"
                      : "Simpan Paket"}
                </button>
                {editTourId && (
                  <button
                    type="button"
                    onClick={handleCancelEditTour}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <X size={14} /> Batal Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Table Tours */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">
              Daftar Paket Wisata Aktif ({tours.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-sm">
                    <th className="pb-3 font-semibold">Gambar</th>
                    <th className="pb-3 font-semibold">Nama Tur & Tagging</th>
                    <th className="pb-3 font-semibold">Harga</th>
                    <th className="pb-3 font-semibold text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {tours.map((tour) => (
                    <tr
                      key={tour.id}
                      className={`transition-all ${editTourId === tour.id ? "bg-blue-50/50 hover:bg-blue-50" : "hover:bg-gray-50/50"}`}
                    >
                      <td className="py-4 align-top">
                        <img
                          src={tour.img}
                          alt=""
                          className="w-20 h-16 object-cover rounded-lg shadow-sm"
                        />
                      </td>
                      <td className="py-4 pr-2 align-top">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-bold text-sm text-gray-900">
                            {tour.title_id}
                          </p>
                          <span className="text-[9px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-md">
                            {tour.duration || "Full Day Tour"}
                          </span>
                          {tour.is_featured && (
                            <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md">
                              Slideshow
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 italic mb-2">
                          {tour.title_en}
                        </p>
                        {tour.places && tour.places.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {tour.places.map((place, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full text-[10px] font-medium"
                              >
                                {place}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="py-4 font-medium text-sm text-teal-600 align-top whitespace-nowrap">
                        {tour.price}
                      </td>
                      <td className="py-4 align-top">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleDeleteTour(tour.id)}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button
                            onClick={() => handleEditTourTrigger(tour)}
                            className={`p-1.5 rounded-lg transition-colors ${editTourId === tour.id ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                          >
                            <Edit2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- SEKSI 2: KELOLA SLIDESHOW HERO UTAMA --- */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-t pt-10 border-gray-200">
            <Sliders className="text-teal-600" /> Kelola Gambar Slideshow
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {editSlideId
                  ? "Edit Gambar Slideshow"
                  : "Tambah Slideshow Hero"}
              </h3>
              <form onSubmit={handleSaveSlideshow} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                    Judul Utama (English)
                  </label>
                  <input
                    type="text"
                    value={slideTitleEn}
                    onChange={(e) => setSlideTitleEn(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-2 outline-none focus:border-teal-500 text-sm"
                    placeholder="Cth: Explore the Beauty of Bali"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                    Judul Utama (Indonesia)
                  </label>
                  <input
                    type="text"
                    value={slideTitleId}
                    onChange={(e) => setSlideTitleId(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-2 outline-none focus:border-teal-500 text-sm"
                    placeholder="Cth: Jelajahi Keindahan Bali"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                    Harga Slideshow
                  </label>
                  <input
                    type="text"
                    value={slidePrice}
                    onChange={(e) => setSlidePrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-2 outline-none focus:border-teal-500 text-sm"
                    placeholder="Cth: IDR 750.000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                    Durasi / Label Kategori Slideshow
                  </label>
                  <input
                    type="text"
                    value={slideDuration}
                    onChange={(e) => setSlideDuration(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-2 outline-none focus:border-teal-500 text-sm"
                    placeholder="Cth: Full Day Tour"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                    Upload Foto Slide
                  </label>
                  <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-teal-500 cursor-pointer relative bg-gray-50">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <div className="flex text-sm text-gray-600 mt-2">
                        <span className="text-teal-600 font-medium text-xs text-center">
                          {slideFile
                            ? slideFile.name
                            : editSlideId
                              ? "Pilih gambar baru jika ingin diganti"
                              : "Pilih file gambar slide"}
                        </span>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSlideFile(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={isUploadingSlide}
                    className={`w-full text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${editSlideId ? "bg-blue-600 hover:bg-blue-700" : "bg-teal-600 hover:bg-teal-700"}`}
                  >
                    {editSlideId ? <Edit2 size={18} /> : <Plus size={18} />}
                    {isUploadingSlide
                      ? "Mengunggah..."
                      : editSlideId
                        ? "Perbarui Slideshow"
                        : "Simpan ke Slideshow"}
                  </button>
                  {editSlideId && (
                    <button
                      type="button"
                      onClick={handleCancelEditSlideshow}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-1"
                    >
                      <X size={14} /> Batal Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Daftar Gambar Slideshow Aktif */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Gambar Slideshow Aktif ({slideshows.length})
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {slideshows.map((slide) => (
                  <div
                    key={slide.id}
                    className={`min-w-[280px] max-w-[280px] bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col justify-between transition-all ${editSlideId === slide.id ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-100"}`}
                  >
                    <div className="relative h-40 w-full bg-gray-100">
                      <img
                        src={slide.img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-teal-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-md tracking-wider">
                        {slide.duration || "Full Day Tour"}
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2 py-1 rounded-md">
                        {slide.price}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm line-clamp-1">
                          {slide.title_en || "No English Title"}
                        </h4>
                        <p className="text-[11px] text-gray-400 line-clamp-1 mb-2 italic">
                          {slide.title_id || "Tidak ada judul Indonesia"}
                        </p>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-amber-400 text-xs">
                              ⭐
                            </span>
                          ))}
                          <span className="text-gray-400 text-[11px] ml-1">
                            (584)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-2">
                        <button className="text-teal-600 font-bold text-xs uppercase tracking-wider hover:underline">
                          Lihat Detail
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDeleteSlideshow(slide.id)}
                            className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                          <button
                            onClick={() => handleEditSlideshowTrigger(slide)}
                            className={`p-1.5 rounded-lg transition-colors ${editSlideId === slide.id ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
                          >
                            <Edit2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- SEKSI 3: GALERI FOTO --- */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-t pt-10 border-gray-200">
            <ImageIcon className="text-teal-600" /> Kelola Galeri Foto
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Tambah Foto Galeri
              </h3>
              <form onSubmit={handleSaveGallery} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                    Nama Tempat / Deskripsi
                  </label>
                  <input
                    type="text"
                    value={galleryName}
                    onChange={(e) => setGalleryName(e.target.value)}
                    required
                    className="w-full mt-1 p-2 border border-gray-200 rounded-lg outline-none focus:border-teal-500 text-sm"
                    placeholder="Cth: Tukad Cepung Waterfall"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                    Upload Gambar Galeri
                  </label>
                  <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-teal-500 cursor-pointer relative bg-gray-50">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <div className="flex text-sm text-gray-600 mt-2">
                        <span className="text-teal-600 font-medium text-xs text-center">
                          {galleryFile ? galleryFile.name : "Pilih file gambar"}
                        </span>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setGalleryFile(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isUploadingGallery}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  {isUploadingGallery ? "Mengunggah..." : "Simpan ke Galeri"}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Koleksi Galeri ({galleries.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {galleries.map((item) => (
                  <div
                    key={item.id}
                    className="relative group rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 aspect-video"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                      <p className="text-white font-medium text-xs truncate">
                        {item.name}
                      </p>
                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="self-end p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
