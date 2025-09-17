# Table des Opportunités Exclusives

## Vue d'ensemble

Cette table `opportunities_exclusives` stocke les candidatures des investisseurs intéressés par les opportunités exclusives d'Offstone.

## Structure de la table

### Champs principaux
- **id** : UUID unique (clé primaire)
- **first_name** : Prénom (requis, max 128 chars)
- **last_name** : Nom (requis, max 128 chars)
- **email** : Email (requis, format validé)
- **phone** : Téléphone (requis, max 64 chars)
- **investment_amount** : Montant d'investissement envisagé (requis)
- **message** : Message optionnel (max 4000 chars)
- **status** : Statut de la candidature

### Tracking UTM
- **utm_source** : Source du trafic (ex: 'website', 'google', 'linkedin')
- **utm_medium** : Medium (ex: 'internal_cta', 'social', 'email')
- **utm_campaign** : Campagne (ex: 'opportunities_exclusives')
- **utm_content** : Contenu spécifique (ex: 'contact_form')
- **utm_term** : Terme de recherche ou mot-clé

### Contexte de la page
- **page_url** : URL de la page où le formulaire a été soumis
- **referrer** : Page de référence
- **cta_id** : Identifiant du bouton CTA cliqué
- **asset_class** : Type d'actif (ex: 'commercial', 'mixte', 'residential')

### Métadonnées
- **vercel_env** : Environnement (production/preview/development)
- **created_at** : Date de création (automatique)
- **updated_at** : Date de dernière modification (automatique)

## Valeurs possibles

### Status
- `new` : Nouvelle candidature (défaut)
- `contacted` : Contacté par l'équipe
- `qualified` : Qualifié comme investisseur potentiel
- `rejected` : Rejeté
- `converted` : Converti en investisseur

### Investment Amount
- `100k-250k` : 100k€ - 250k€
- `250k-500k` : 250k€ - 500k€
- `500k-1M` : 500k€ - 1M€
- `1M-2M` : 1M€ - 2M€
- `2M+` : Plus de 2M€

## Installation

1. **Exécuter le script SQL** :
   ```bash
   # Dans Supabase SQL Editor ou via psql
   \i create_opportunities_table.sql
   ```

2. **Vérifier la création** :
   ```sql
   SELECT * FROM public.opportunities_exclusives LIMIT 1;
   ```

## API Endpoint

### POST /api/opportunities

**Body** (JSON) :
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "0123456789",
  "investmentAmount": "100k-250k",
  "message": "Message optionnel"
}
```

**Response** (succès) :
```json
{
  "success": true,
  "message": "Votre demande a été envoyée avec succès",
  "id": "uuid-here"
}
```

**Response** (erreur) :
```json
{
  "error": "Message d'erreur"
}
```

## Requêtes utiles

### Statistiques générales
```sql
-- Nombre total de candidatures
SELECT COUNT(*) FROM public.opportunities_exclusives;

-- Candidatures par statut
SELECT status, COUNT(*) 
FROM public.opportunities_exclusives 
GROUP BY status;

-- Candidatures par montant d'investissement
SELECT investment_amount, COUNT(*) 
FROM public.opportunities_exclusives 
GROUP BY investment_amount 
ORDER BY investment_amount;
```

### Analytics UTM
```sql
-- Top sources de trafic
SELECT utm_source, COUNT(*) 
FROM public.opportunities_exclusives 
GROUP BY utm_source 
ORDER BY COUNT(*) DESC;

-- Performance par campagne
SELECT utm_campaign, utm_source, COUNT(*) 
FROM public.opportunities_exclusives 
GROUP BY utm_campaign, utm_source 
ORDER BY COUNT(*) DESC;
```

### Candidatures récentes
```sql
-- Dernières candidatures
SELECT first_name, last_name, email, investment_amount, created_at 
FROM public.opportunities_exclusives 
ORDER BY created_at DESC 
LIMIT 10;
```

## Sécurité

- **Row Level Security (RLS)** activé
- **Service Role uniquement** : Seul le service role peut accéder à la table
- **Validation des données** : Contraintes sur tous les champs
- **Format email** : Validation regex
- **Longueurs limitées** : Protection contre les attaques par déni de service

## Monitoring

### Logs à surveiller
- Erreurs d'insertion dans l'API
- Tentatives d'accès non autorisées
- Volume de candidatures par jour

### Alertes recommandées
- Plus de 50 candidatures par jour
- Erreurs d'API > 5%
- Tentatives d'accès non autorisées

## Maintenance

### Nettoyage périodique
```sql
-- Supprimer les candidatures rejetées de plus de 1 an
DELETE FROM public.opportunities_exclusives 
WHERE status = 'rejected' 
AND created_at < NOW() - INTERVAL '1 year';
```

### Sauvegarde
- La table est incluse dans les sauvegardes automatiques de Supabase
- Export manuel recommandé avant modifications importantes
