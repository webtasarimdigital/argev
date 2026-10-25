import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://ilsqcdgawevpjphdxjqi.supabase.co';
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'sb_publishable_6dlX9Ykh94SX7a8PYbNE3g_WWY8ETa2';

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  try {
    return createBrowserClient(supabaseUrl, supabaseKey);
  } catch {
    return null;
  }
}
