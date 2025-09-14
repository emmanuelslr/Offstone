-- =====================================================
-- SUPABASE SECURITY FIX FOR LEADS TABLE
-- =====================================================
-- This script fixes the Row Level Security (RLS) issue
-- in your public.leads table

-- Step 1: Enable Row Level Security on the leads table
-- This is non-destructive and will deny all access until policies are added
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Step 2: Create policies for different access patterns
-- Choose the appropriate policy based on your access model

-- OPTION A: Service Role Only (Recommended for your current setup)
-- Since you're using service role for all operations, this is the safest approach
-- This allows only the service role to access the table

-- Policy for service role to have full access
CREATE POLICY "Service role full access" ON public.leads
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

-- Policy to deny all other roles (including authenticated users)
CREATE POLICY "Deny all other roles" ON public.leads
FOR ALL TO authenticated, anon
USING (false)
WITH CHECK (false);

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
