import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Login from "./Login";
import AdminPanel from "./AdminPanel";
import { LogOut } from "lucide-react";

const AdminContainer = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Ambil status session login saat ini
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Dengarkan perubahan status login (login/logout otomatis)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (!session) {
    return <Login onLoginSuccess={(user) => setSession(user)} />;
  }

  return (
    <div className="relative">
      {/* Tombol Logout mengambang yang aman di pojok kanan atas */}
      <button
        onClick={handleLogout}
        className="fixed top-6 right-6 z-50 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
      >
        <LogOut size={14} /> Keluar Panel
      </button>

      <AdminPanel />
    </div>
  );
};

export default AdminContainer;