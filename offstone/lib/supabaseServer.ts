import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client using Service Role key
export const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { db: { schema: "public" } }
);

