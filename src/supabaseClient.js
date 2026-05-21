// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Mengunci URL dan Anon Key asli milikmu langsung di dalam kode
const supabaseUrl = "https://fetveqokusjqoxhaupzl.supabase.co";
const supabaseAnonKey = "sb_publishable_wqy1uBOAlMoIOG1yAFX02w_3U7O6Fsh";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
