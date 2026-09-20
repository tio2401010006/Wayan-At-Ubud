import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { Lock, Mail } from "lucide-react";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(`Login Gagal: ${error.message}`);
    } else if (data.user) {
      onLoginSuccess(data.user);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-left">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Portal</h2>
        <p className="text-gray-500 text-sm mb-6">
          Wayan at Ubud - Content Manager
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase flex items-center gap-2">
              <Mail size={14} /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl outline-none focus:border-teal-500 bg-gray-50 text-gray-800"
              placeholder="admin@wayanatubud.com"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 uppercase flex items-center gap-2">
              <Lock size={14} /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl outline-none focus:border-teal-500 bg-gray-50 text-gray-800"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-teal-600/20"
          >
            {loading ? "Memverifikasi..." : "Masuk ke Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
