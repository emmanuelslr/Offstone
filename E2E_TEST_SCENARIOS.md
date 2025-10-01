# Tests E2E - Offstone Tracking Integration

## Scénarios de test à exécuter

### 🔧 Prérequis
1. Variables d'environnement configurées
2. Table Supabase `prospects` créée
3. HubSpot form configuré avec PORTAL_ID et FORM_GUID
4. Application déployée en staging

---

## Test A: Même email (meeting → formulaire)

### Objectif
Vérifier la déduplication par email principal

### Étapes
1. **Réserver un meeting**
   - Aller sur `/rdv`
   - Prendre rendez-vous avec `test-a@example.com`
   - Vérifier que le cookie `hubspotutk` est créé

2. **Compléter le profil**
   - Aller sur `/merci`
   - Remplir le formulaire avec le même email `test-a@example.com`
   - Vérifier la normalisation téléphone (ex: `06 12 34 56 78` → `+33612345678`)

### Résultats attendus
- ✅ 1 seul contact créé dans Supabase
- ✅ 1 seul contact dans HubSpot (même email)
- ✅ 1 deal créé (workflow HubSpot déclenché)
- ✅ Téléphone et capacité d'investissement présents
- ✅ UTM parameters transmis

---

## Test B: Email différent, même navigateur (dédupe hutk)

### Objectif
Vérifier la déduplication par cookie `hubspotutk`

### Étapes
1. **Réserver un meeting**
   - Aller sur `/rdv`
   - Prendre rendez-vous avec `test-b1@example.com`

2. **Compléter avec email différent**
   - Dans le même navigateur, aller sur `/merci`
   - Remplir avec `test-b2@example.com`
   - Le cookie `hubspotutk` doit être le même

### Résultats attendus
- ✅ 1 seul contact dans HubSpot (dédupe via hutk)
- ✅ Contact mis à jour avec le nouvel email `test-b2@example.com`
- ✅ 1 deal créé
- ✅ Données du formulaire priorisées

---

## Test C: Emails et navigateurs différents

### Objectif
Vérifier qu'il n'y a pas de déduplication incorrecte

### Étapes
1. **Réserver un meeting**
   - Navigateur A: `/rdv` avec `test-c1@example.com`

2. **Compléter avec email différent**
   - Navigateur B (différent): `/merci` avec `test-c2@example.com`
   - Pas de cookie `hubspotutk` partagé

### Résultats attendus
- ✅ 2 contacts séparés dans HubSpot
- ✅ 2 contacts dans Supabase
- ✅ 2 deals créés
- ✅ Pas de déduplication incorrecte

---

## Test D: Persistance UTM

### Objectif
Vérifier la persistance des UTM parameters

### Étapes
1. **Arriver avec UTM**
   - URL: `https://offstone.fr/merci?utm_source=google&utm_medium=cpc&utm_campaign=test`
   - Vérifier que les UTM sont stockées dans localStorage

2. **Navigation sans UTM**
   - Recharger la page sans paramètres UTM
   - Vérifier que les UTM sont toujours disponibles

3. **Soumettre le formulaire**
   - Remplir et soumettre
   - Vérifier que les UTM sont transmises aux APIs

### Résultats attendus
- ✅ UTM stockées dans localStorage
- ✅ UTM persistées après refresh
- ✅ UTM transmises à Supabase et HubSpot
- ✅ `first_touch_ts` et `last_touch_ts` corrects

---

## Test E: Validation téléphone

### Objectif
Vérifier la validation et normalisation des numéros

### Étapes
1. **Tester numéros invalides**
   - `123` → doit bloquer
   - `abc` → doit bloquer
   - Numéro vide → doit bloquer

2. **Tester numéros valides**
   - `06 12 34 56 78` → `+33612345678`
   - `+33 6 12 34 56 78` → `+33612345678`
   - `0612345678` → `+33612345678`

### Résultats attendus
- ✅ Numéros invalides bloquent la soumission
- ✅ Messages d'erreur clairs affichés
- ✅ Numéros valides normalisés en E.164
- ✅ Validation temps réel

---

## Test F: Résilience HubSpot

### Objectif
Vérifier que l'UX n'est pas bloquée par des erreurs HubSpot

### Étapes
1. **Simuler erreur HubSpot**
   - Modifier temporairement le FORM_GUID
   - Soumettre le formulaire

2. **Vérifier le comportement**
   - Supabase doit fonctionner normalement
   - Erreur HubSpot doit être loggée
   - UX doit continuer (message de succès)

### Résultats attendus
- ✅ Supabase UPSERT réussi
- ✅ Erreur HubSpot loggée (non-bloquante)
- ✅ Message de succès affiché à l'utilisateur
- ✅ Données sauvegardées malgré l'erreur HubSpot

---

## Test G: Consents RGPD

### Objectif
Vérifier la gestion des consentements

### Étapes
1. **Soumettre avec consentement**
   - Cocher "consentement_marketing"
   - Soumettre le formulaire

2. **Soumettre sans consentement**
   - Ne pas cocher le consentement
   - Soumettre le formulaire

### Résultats attendus
- ✅ Consentement transmis aux deux APIs
- ✅ Valeur booléenne correcte stockée
- ✅ Conformité RGPD respectée

---

## Test H: Identify HubSpot (Bonus)

### Objectif
Vérifier l'identification post-submit

### Étapes
1. **Soumettre le formulaire**
2. **Vérifier dans la console**
   - `window._hsq` doit contenir l'identify call

### Résultats attendus
- ✅ Identify HubSpot exécuté
- ✅ Contact identifié avec email, prénom, nom

---

## Checklist de validation

### ✅ Critères techniques
- [ ] Script HubSpot chargé sur toutes les pages
- [ ] Cookie `hubspotutk` disponible sur `/merci`
- [ ] UTM parameters persistés et transmis
- [ ] Téléphone normalisé en E.164
- [ ] Supabase UPSERT fonctionnel
- [ ] HubSpot Forms API fonctionnel
- [ ] Déduplication par email + hutk
- [ ] Gestion d'erreurs robuste

### ✅ Critères UX
- [ ] Formulaire intuitif et responsive
- [ ] Validation temps réel
- [ ] Messages d'erreur clairs
- [ ] États de chargement
- [ ] UX préservée en cas d'erreur HubSpot

### ✅ Critères business
- [ ] Workflows HubSpot déclenchés
- [ ] Deals créés selon les règles
- [ ] Données complètes transmises
- [ ] Conformité RGPD

---

## Outils de debug

### Console navigateur
```javascript
// Vérifier UTM
console.log(localStorage.getItem('offstone_utm_params'));

// Vérifier cookie HubSpot
console.log(document.cookie.includes('hubspotutk'));

// Vérifier HubSpot tracking
console.log(window._hsq);
```

### API de test
```
GET /api/test-integration?email=test@example.com&phone=0612345678
```

### Logs serveur
- Vérifier les logs Supabase
- Vérifier les logs HubSpot
- Vérifier les erreurs d'API

















