-- =====================================================
-- AJOUTER CONTRAINTE UNIQUE SUR EMAIL
-- =====================================================
-- Cette contrainte permet à resolution=merge-duplicates de fonctionner
-- Elle empêche aussi les doublons d'emails dans la base

-- Vérifier d'abord s'il y a des doublons existants
-- (optionnel - pour information seulement)
-- SELECT email, COUNT(*) as count 
-- FROM public.leads_candidature 
-- GROUP BY email 
-- HAVING COUNT(*) > 1;

-- Ajouter la contrainte UNIQUE sur email
-- ATTENTION: Cette commande échouera s'il y a déjà des emails en double
-- Dans ce cas, nettoyez d'abord les doublons manuellement
DO $$
BEGIN
  -- Vérifier si la contrainte existe déjà
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_constraint 
    WHERE conname = 'leads_candidature_email_unique'
  ) THEN
    -- Ajouter la contrainte UNIQUE
    ALTER TABLE public.leads_candidature
    ADD CONSTRAINT leads_candidature_email_unique UNIQUE (email);
    
    RAISE NOTICE 'Contrainte UNIQUE sur email ajoutée avec succès';
  ELSE
    RAISE NOTICE 'La contrainte UNIQUE sur email existe déjà';
  END IF;
END $$;

-- Vérifier que la contrainte a été créée
SELECT conname, contype 
FROM pg_constraint 
WHERE conrelid = 'public.leads_candidature'::regclass 
  AND conname = 'leads_candidature_email_unique';
