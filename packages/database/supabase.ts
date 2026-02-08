import { createClient } from '@supabase/supabase-js';

// We expect environment variables to be provided by the consuming app (Vite/Nuxt)
const getEnv = (name: string) => {
    // Check for Vite/Nuxt env patterns
    if (typeof process !== 'undefined' && process.env && process.env[name]) return process.env[name];
    // @ts-ignore - for Vite/Nuxt
    if (import.meta.env && import.meta.env[name]) return import.meta.env[name];
    return '';
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const auth = {
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  getUser: async () => {
    return await supabase.auth.getUser();
  },
  getSession: async () => {
    return await supabase.auth.getSession();
  }
};
