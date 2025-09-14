# 🔒 SUPABASE SECURITY FIX - MANUAL STEPS

## 🚨 URGENT: Fix Row Level Security Issue

Your `public.leads` table currently has **Row Level Security (RLS) disabled**, which is a critical security vulnerability. This means any authenticated user could potentially access all lead data.

## 📋 What You Need to Do

### Step 1: Access Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** (in the left sidebar)
3. Create a new query

### Step 2: Run This SQL Code

Copy and paste the following SQL code into the SQL Editor and execute it:

```sql
-- =====================================================
-- SUPABASE SECURITY FIX FOR LEADS TABLE
-- =====================================================

-- Step 1: Enable Row Level Security on the leads table
-- This is non-destructive and will deny all access until policies are added
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Step 2: Create policy for service role to have full access
-- This allows your API endpoints to continue working
CREATE POLICY "Service role full access" ON public.leads
FOR ALL TO service_role
USING (true)
WITH CHECK (true);

-- Step 3: Create policy to deny all other roles
-- This prevents unauthorized access from authenticated users
CREATE POLICY "Deny all other roles" ON public.leads
FOR ALL TO authenticated, anon
USING (false)
WITH CHECK (false);
```

### Step 3: Verify the Fix

After running the SQL, verify the security is working by running these queries:

```sql
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'leads' AND schemaname = 'public';

-- Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'leads';
```

You should see:
- `rowsecurity = true` for the leads table
- Two policies: "Service role full access" and "Deny all other roles"

## ✅ What This Fix Does

1. **Enables RLS**: Row Level Security is now active on your leads table
2. **Service Role Access**: Your API endpoints will continue to work (they use the service role key)
3. **Blocks Unauthorized Access**: Regular authenticated users cannot access lead data
4. **Maintains Functionality**: Your existing application will continue to work normally

## 🧪 Test Your Application

After applying the fix:

1. **Test Lead Creation**: Try creating a new lead through your waitlist modal
2. **Test Lead Updates**: Try updating an existing lead
3. **Check API Endpoints**: Verify `/api/leads` and `/api/leads/[id]` still work

## 🔍 Why This Happened

- Supabase tables are public by default
- Without RLS, any authenticated user can access all data
- Your application uses the service role key, which bypasses RLS
- This is a common security oversight in Supabase projects

## 🛡️ Security Best Practices Going Forward

1. **Always enable RLS** on tables containing sensitive data
2. **Use service role key** only on the server side (never expose to clients)
3. **Create specific policies** for different user roles if needed
4. **Regular security audits** of your database policies

## 🚨 If Something Goes Wrong

If your application stops working after applying this fix:

1. **Check the policies**: Make sure the "Service role full access" policy exists
2. **Verify service role**: Ensure your API is using the service role key
3. **Check logs**: Look at Supabase logs for any permission errors

## 📞 Need Help?

If you encounter any issues:
1. Check the Supabase logs in your dashboard
2. Verify your environment variables are correct
3. Test with a simple query first

---

**⚠️ IMPORTANT**: This fix is safe and non-destructive. Your existing data and application functionality will remain intact.
