-- =====================================================
-- SUPABASE SECURITY FIX FOR LEADS TABLE
-- =====================================================
-- This script fixes the Row Level Security (RLS) issue
-- in your public.leads table

-- Ensure pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Step 1: Enable Row Level Security on the leads table
-- This is non-destructive and will deny all access until policies are added
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Step 2: Create policies for different access patterns
-- Choose the appropriate policy based on your access model

-- OPTION A: Service Role Only (Recommended for your current setup)
-- Since you're using service role for all operations, this is the safest approach
-- This allows only the service role to access the table

-- Policy for service role to have full access
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'leads' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON public.leads
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);
  END IF;
END $$;

-- Policy to deny all other roles (including authenticated users)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'leads' AND policyname = 'Deny all other roles'
  ) THEN
    CREATE POLICY "Deny all other roles" ON public.leads
    FOR ALL TO authenticated, anon
    USING (false)
    WITH CHECK (false);
  END IF;
END $$;

-- OPTION B: If you want to allow authenticated users to access their own leads
-- (Uncomment this section if you want user-specific access)
/*
-- First, you would need a user_id column in your leads table
-- ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Policy for users to access their own leads
CREATE POLICY "Users can access own leads" ON public.leads
FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert own leads" ON public.leads
FOR INSERT TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own leads" ON public.leads
FOR UPDATE TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete own leads" ON public.leads
FOR DELETE TO authenticated
USING ((SELECT auth.uid()) = user_id);
*/

-- Step 3: Create indexes for performance (if using user-based policies)
-- CREATE INDEX IF NOT EXISTS idx_leads_user_id ON public.leads(user_id);

-- =====================================================
-- Additional hardening: constraints, trigger and indexes
-- These ensure data stays bounded and consistent even if API validations evolve
-- =====================================================

-- Make sure required columns exist (no-op if already present)
-- Note: Adjust column types only if needed; here we assume typical columns exist
--
-- ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS id uuid primary key default gen_random_uuid();
-- ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS email text not null;
-- ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS status text default 'open'::text not null;
-- ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS created_at timestamptz default now() not null;
-- ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS updated_at timestamptz default now() not null;

-- Email format (case-insensitive basic RFC-like check)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'leads_email_format'
  ) THEN
    ALTER TABLE public.leads
    ADD CONSTRAINT leads_email_format CHECK (
      email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    );
  END IF;
END $$;

-- Track deployment environment (production/preview/development) for analytics and separation
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'vercel_env'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN vercel_env text NOT NULL DEFAULT 'production';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'leads_vercel_env_values'
  ) THEN
    ALTER TABLE public.leads
    ADD CONSTRAINT leads_vercel_env_values CHECK (
      vercel_env IN ('production','preview','development')
    );
  END IF;
END $$;

-- Restrict status to known states
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'leads_status_values'
  ) THEN
    ALTER TABLE public.leads
    ADD CONSTRAINT leads_status_values CHECK (
      status IN ('open','completed')
    );
  END IF;
END $$;

-- Length constraints to bound storage (adapt as needed)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'leads_lengths_basic'
  ) THEN
    ALTER TABLE public.leads
    ADD CONSTRAINT leads_lengths_basic CHECK (
      char_length(coalesce(ref, '')) <= 255 AND
      char_length(coalesce(utm_source, '')) <= 255 AND
      char_length(coalesce(utm_medium, '')) <= 255 AND
      char_length(coalesce(utm_campaign, '')) <= 255 AND
      char_length(coalesce(utm_content, '')) <= 255 AND
      char_length(coalesce(utm_term, '')) <= 255 AND
      char_length(coalesce(asset_class, '')) <= 64 AND
      char_length(coalesce(page_url, '')) <= 2048 AND
      char_length(coalesce(first_name, '')) <= 128 AND
      char_length(coalesce(last_name, '')) <= 128 AND
      char_length(coalesce(phone, '')) <= 64
    );
  END IF;
END $$;

-- Discovery (free-text) bounded to 4000 chars
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'leads_discovery_maxlen'
  ) THEN
    ALTER TABLE public.leads
    ADD CONSTRAINT leads_discovery_maxlen CHECK (
      char_length(coalesce(discovery, '')) <= 4000
    );
  END IF;
END $$;

-- Auto-update updated_at timestamp on each update
CREATE OR REPLACE FUNCTION public.leads_set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'leads_set_updated_at'
  ) THEN
    CREATE TRIGGER leads_set_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW EXECUTE FUNCTION public.leads_set_updated_at();
  END IF;
END $$;

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email_lower ON public.leads((lower(email)));
CREATE INDEX IF NOT EXISTS idx_leads_vercel_env ON public.leads(vercel_env);

-- Step 4: Verify the setup
-- You can run these queries to verify the security is working:

-- Check if RLS is enabled:
-- SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE tablename = 'leads';

-- Check existing policies:
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
-- FROM pg_policies WHERE tablename = 'leads';

-- Test access (should fail for authenticated users):
-- SET ROLE authenticated;
-- SELECT * FROM public.leads LIMIT 1; -- This should fail
-- RESET ROLE;

-- Test service role access (should work):
-- SET ROLE service_role;
-- SELECT * FROM public.leads LIMIT 1; -- This should work
-- RESET ROLE;
