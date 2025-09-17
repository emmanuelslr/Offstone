-- =====================================================
-- CREATE OPPORTUNITIES EXCLUSIVES TABLE
-- =====================================================
-- Table pour stocker les candidatures aux opportunités exclusives

-- Ensure pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the opportunities_exclusives table
CREATE TABLE IF NOT EXISTS public.opportunities_exclusives (
    -- Primary key
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Personal information (from form)
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    phone_country text NOT NULL DEFAULT 'FR', -- 'FR', 'BE', 'CH', etc.
    investment_amount text NOT NULL, -- '100k-250k', '250k-500k', etc.
    message text, -- optional message
    
    -- Status tracking
    status text NOT NULL DEFAULT 'new'::text,
    
    -- UTM tracking parameters
    utm_source text,
    utm_medium text,
    utm_campaign text,
    utm_content text,
    utm_term text,
    
    -- Page context
    page_url text,
    referrer text,
    
    -- Additional context
    cta_id text, -- identifier for the specific CTA clicked
    asset_class text, -- 'commercial', 'mixte', 'residential', etc.
    
    -- Environment tracking
    vercel_env text NOT NULL DEFAULT 'production',
    
    -- Timestamps
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.opportunities_exclusives ENABLE ROW LEVEL SECURITY;

-- Policy for service role to have full access
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'opportunities_exclusives' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON public.opportunities_exclusives
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);
  END IF;
END $$;

-- Policy to deny all other roles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'opportunities_exclusives' AND policyname = 'Deny all other roles'
  ) THEN
    CREATE POLICY "Deny all other roles" ON public.opportunities_exclusives
    FOR ALL TO authenticated, anon
    USING (false)
    WITH CHECK (false);
  END IF;
END $$;

-- =====================================================
-- CONSTRAINTS AND VALIDATIONS
-- =====================================================

-- Email format validation
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'opportunities_email_format'
  ) THEN
    ALTER TABLE public.opportunities_exclusives
    ADD CONSTRAINT opportunities_email_format CHECK (
      email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    );
  END IF;
END $$;

-- Status validation
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'opportunities_status_values'
  ) THEN
    ALTER TABLE public.opportunities_exclusives
    ADD CONSTRAINT opportunities_status_values CHECK (
      status IN ('new', 'contacted', 'qualified', 'rejected', 'converted')
    );
  END IF;
END $$;

-- Investment amount validation
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'opportunities_investment_amount_values'
  ) THEN
    ALTER TABLE public.opportunities_exclusives
    ADD CONSTRAINT opportunities_investment_amount_values CHECK (
      investment_amount IN ('100k-250k', '250k-500k', '500k-1M', '1M-2M', '2M+')
    );
  END IF;
END $$;

-- Phone country validation
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'opportunities_phone_country_values'
  ) THEN
    ALTER TABLE public.opportunities_exclusives
    ADD CONSTRAINT opportunities_phone_country_values CHECK (
      phone_country IN ('FR', 'BE', 'CH', 'LU', 'DE', 'ES', 'IT', 'GB')
    );
  END IF;
END $$;

-- Environment validation
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'opportunities_vercel_env_values'
  ) THEN
    ALTER TABLE public.opportunities_exclusives
    ADD CONSTRAINT opportunities_vercel_env_values CHECK (
      vercel_env IN ('production','preview','development')
    );
  END IF;
END $$;

-- Length constraints
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'opportunities_lengths_basic'
  ) THEN
    ALTER TABLE public.opportunities_exclusives
    ADD CONSTRAINT opportunities_lengths_basic CHECK (
      char_length(coalesce(first_name, '')) <= 128 AND
      char_length(coalesce(last_name, '')) <= 128 AND
      char_length(coalesce(phone, '')) <= 64 AND
      char_length(coalesce(utm_source, '')) <= 255 AND
      char_length(coalesce(utm_medium, '')) <= 255 AND
      char_length(coalesce(utm_campaign, '')) <= 255 AND
      char_length(coalesce(utm_content, '')) <= 255 AND
      char_length(coalesce(utm_term, '')) <= 255 AND
      char_length(coalesce(asset_class, '')) <= 64 AND
      char_length(coalesce(page_url, '')) <= 2048 AND
      char_length(coalesce(referrer, '')) <= 2048 AND
      char_length(coalesce(cta_id, '')) <= 128
    );
  END IF;
END $$;

-- Message length constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'opportunities_message_maxlen'
  ) THEN
    ALTER TABLE public.opportunities_exclusives
    ADD CONSTRAINT opportunities_message_maxlen CHECK (
      char_length(coalesce(message, '')) <= 4000
    );
  END IF;
END $$;

-- =====================================================
-- TRIGGERS AND FUNCTIONS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.opportunities_set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'opportunities_set_updated_at'
  ) THEN
    CREATE TRIGGER opportunities_set_updated_at
    BEFORE UPDATE ON public.opportunities_exclusives
    FOR EACH ROW EXECUTE FUNCTION public.opportunities_set_updated_at();
  END IF;
END $$;

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_opportunities_created_at ON public.opportunities_exclusives(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_opportunities_email_lower ON public.opportunities_exclusives((lower(email)));
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON public.opportunities_exclusives(status);
CREATE INDEX IF NOT EXISTS idx_opportunities_vercel_env ON public.opportunities_exclusives(vercel_env);
CREATE INDEX IF NOT EXISTS idx_opportunities_investment_amount ON public.opportunities_exclusives(investment_amount);
CREATE INDEX IF NOT EXISTS idx_opportunities_utm_campaign ON public.opportunities_exclusives(utm_campaign);

-- Composite index for analytics
CREATE INDEX IF NOT EXISTS idx_opportunities_analytics ON public.opportunities_exclusives(utm_campaign, utm_source, created_at);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if table was created successfully:
-- SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE tablename = 'opportunities_exclusives';

-- Check existing policies:
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
-- FROM pg_policies WHERE tablename = 'opportunities_exclusives';

-- Test insert (should work with service role):
-- INSERT INTO public.opportunities_exclusives (first_name, last_name, email, phone, investment_amount, utm_source, utm_campaign) 
-- VALUES ('Test', 'User', 'test@example.com', '0123456789', '100k-250k', 'website', 'opportunities_test');
