-- =====================================================
-- NETTOYER LES EMAILS EN DOUBLE AVANT D'AJOUTER LA CONTRAINTE UNIQUE
-- =====================================================

-- 1. Identifier les doublons (pour vérification)
SELECT email, COUNT(*) as count, array_agg(id ORDER BY created_at DESC) as ids
FROM public.leads_candidature 
GROUP BY email 
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- 2. Garder uniquement la ligne la plus récente pour chaque email
-- (Cette requête supprime les anciennes lignes en double)
WITH duplicates AS (
  SELECT id,
         email,
         ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at DESC) as rn
  FROM public.leads_candidature
)
DELETE FROM public.leads_candidature
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- 3. Vérifier qu'il n'y a plus de doublons
SELECT 'Doublons restants: ' || COUNT(*) as status
FROM (
  SELECT email, COUNT(*) as count
  FROM public.leads_candidature 
  GROUP BY email 
  HAVING COUNT(*) > 1
) as remaining_duplicates;
