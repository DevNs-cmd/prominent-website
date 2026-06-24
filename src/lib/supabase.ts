import { createClient } from '@supabase/supabase-js';

// Get environment variables or fallback to placeholders to prevent compile errors.
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://placeholder.supabase.co';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
