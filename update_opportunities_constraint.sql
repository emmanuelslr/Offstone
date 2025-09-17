-- =====================================================
-- UPDATE OPPORTUNITIES INVESTMENT AMOUNT CONSTRAINT
-- =====================================================
-- Mettre à jour la contrainte pour accepter les valeurs actuelles du formulaire

-- Supprimer l'ancienne contrainte
ALTER TABLE public.opportunities_exclusives 
DROP CONSTRAINT IF EXISTS opportunities_investment_amount_values;

-- Ajouter la nouvelle contrainte avec les valeurs actuelles
ALTER TABLE public.opportunities_exclusives
ADD CONSTRAINT opportunities_investment_amount_values CHECK (
  investment_amount IN ('lt_20k', '20k_50k', '50k_100k', '100k_500k', '500k_1m', 'gt_1m')
);

-- Vérifier que la contrainte a été mise à jour
SELECT conname, consrc 
FROM pg_constraint 
WHERE conname = 'opportunities_investment_amount_values';
