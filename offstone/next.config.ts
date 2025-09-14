import type { NextConfig } from "next";
import dotenv from "dotenv";

// Load env from the repo root so offstone/ can consume SUPABASE_* and NEXT_PUBLIC_SITE_URL
dotenv.config({ path: "../.env.local" });

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
