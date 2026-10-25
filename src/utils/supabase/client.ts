import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://ilsqcdgawevpjphdxjqi.supabase.co";

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_6dlX9Ykh94SX7a8PYbNE3g_WWY8ETa2";

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
