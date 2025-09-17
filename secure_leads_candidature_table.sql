-- =====================================================
-- SÉCURISATION DE LA TABLE leads_candidature
-- =====================================================
-- Ce script applique les politiques de sécurité Row Level Security (RLS)
-- sur votre table leads_candidature pour la protéger contre les accès non autorisés

-- Ensure pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Step 1: Enable Row Level Security on the leads_candidature table
-- This is non-destructive and will deny all access until policies are added
ALTER TABLE public.leads_candidature ENABLE ROW LEVEL SECURITY;

-- Step 2: Create policies for different access patterns
-- OPTION A: Service Role Only (Recommandé pour votre configuration actuelle)
-- Puisque vous utilisez le service role pour toutes les opérations, c'est l'approche la plus sûre

-- Policy pour que le service role ait un accès complet
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'leads_candidature' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON public.leads_candidature
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);
  END IF;
END $$;

-- Policy pour refuser tous les autres rôles (y compris les utilisateurs authentifiés)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'leads_candidature' AND policyname = 'Deny all other roles'
  ) THEN
    CREATE POLICY "Deny all other roles" ON public.leads_candidature
    FOR ALL TO authenticated, anon
    USING (false)
    WITH CHECK (false);
  END IF;
END $$;

-- =====================================================
-- CONTRAINTES DE VALIDATION POUR LA SÉCURITÉ DES DONNÉES
-- =====================================================

-- Validation du format email
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'leads_candidature_email_format'
  ) THEN
    ALTER TABLE public.leads_candidature
    ADD CONSTRAINT leads_candidature_email_format CHECK (
      email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    );
  END IF;
END $$;

-- Validation des valeurs de statut
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'leads_candidature_status_values'
  ) THEN
    ALTER TABLE public.leads_candidature
    ADD CONSTRAINT leads_candidature_status_values CHECK (
      status IN ('open','completed')
    );
  END IF;
END $$;

-- Contraintes de longueur pour limiter le stockage
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'leads_candidature_lengths_basic'
  ) THEN
    ALTER TABLE public.leads_candidature
    ADD CONSTRAINT leads_candidature_lengths_basic CHECK (
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
      char_length(coalesce(phone, '')) <= 64 AND
      char_length(coalesce(ticket_target, '')) <= 255
    );
  END IF;
END $$;

-- Contrainte pour le champ discovery (texte libre) limité à 4000 caractères
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'leads_candidature_discovery_maxlen'
  ) THEN
    ALTER TABLE public.leads_candidature
    ADD CONSTRAINT leads_candidature_discovery_maxlen CHECK (
      char_length(coalesce(discovery, '')) <= 4000
    );
  END IF;
END $$;

-- =====================================================
-- TRIGGERS ET FONCTIONS POUR LA COHÉRENCE DES DONNÉES
-- =====================================================

-- Auto-update updated_at timestamp on each update
CREATE OR REPLACE FUNCTION public.leads_candidature_set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'leads_candidature_set_updated_at'
  ) THEN
    CREATE TRIGGER leads_candidature_set_updated_at
    BEFORE UPDATE ON public.leads_candidature
    FOR EACH ROW EXECUTE FUNCTION public.leads_candidature_set_updated_at();
  END IF;
END $$;

-- =====================================================
-- INDEX POUR LES PERFORMANCES
-- =====================================================

-- Index pour les requêtes courantes
CREATE INDEX IF NOT EXISTS idx_leads_candidature_created_at ON public.leads_candidature(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_candidature_email_lower ON public.leads_candidature((lower(email)));
CREATE INDEX IF NOT EXISTS idx_leads_candidature_status ON public.leads_candidature(status);
CREATE INDEX IF NOT EXISTS idx_leads_candidature_utm_campaign ON public.leads_candidature(utm_campaign);

-- Index composite pour l'analytics
CREATE INDEX IF NOT EXISTS idx_leads_candidature_analytics ON public.leads_candidature(utm_campaign, utm_source, created_at);

-- =====================================================
-- VÉRIFICATION DE LA CONFIGURATION
-- =====================================================

-- Vérifier que RLS est activé:
-- SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE tablename = 'leads_candidature';

-- Vérifier les politiques existantes:
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
-- FROM pg_policies WHERE tablename = 'leads_candidature';

-- Test d'accès (devrait échouer pour les utilisateurs authentifiés):
-- SET ROLE authenticated;
-- SELECT * FROM public.leads_candidature LIMIT 1; -- Ceci devrait échouer
-- RESET ROLE;

-- Test d'accès service role (devrait fonctionner):
-- SET ROLE service_role;
-- SELECT * FROM public.leads_candidature LIMIT 1; -- Ceci devrait fonctionner
-- RESET ROLE;
