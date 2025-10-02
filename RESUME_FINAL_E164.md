# ✅ Formulaire de Candidature Spontanée - HubSpot avec CV et Format E.164

## 🎯 Configuration Finale

### **1 nouvelle variable d'environnement requise**
```bash
# Nouveau: Token d'accès HubSpot pour l'upload de fichiers
HUBSPOT_ACCESS_TOKEN=your_hubspot_access_token_here
```

### Variables déjà configurées
- ✅ **Portal ID** : `146846899` (déjà configuré)
- ✅ **Form ID** : `9a180dcb-636b-476b-bb8f-cede80cda623` (déjà configuré)

## 📁 Fichiers créés/modifiés

### Nouveaux fichiers
1. **`src/components/forms/SpontaneousApplicationModal.tsx`** - Formulaire avec design identique + CV + validation E.164
2. **`src/app/api/spontaneous-application/route.ts`** - API HubSpot avec upload de CV + formatage E.164
3. **`SPONTANEOUS_APPLICATION_SETUP.md`** - Documentation complète
4. **`test_spontaneous_application.md`** - Guide de test complet
5. **`RESUME_FINAL_E164.md`** - Ce résumé

### Fichiers modifiés
1. **`src/app/notre-histoire/components/CustomersShowcaseSection.tsx`** - Intégration du formulaire

## 🎨 Fonctionnalités

### Formulaire
- ✅ **Design identique** au formulaire "Accédez aux opportunités exclusives"
- ✅ **Tous les champs demandés** : Prénom, Nom, Email, **Téléphone E.164**, Poste, Disponibilité, **CV**, Message, LinkedIn
- ✅ **Upload de CV** : PDF, DOC, DOCX (max 10MB)
- ✅ **Validation et formatage E.164** du téléphone
- ✅ **Validation complète** côté client et serveur
- ✅ **Gestion des erreurs** avec messages explicites
- ✅ **États de chargement** et de succès

### Intégration HubSpot
- ✅ **Formulaire HubSpot** - Utilise le formulaire existant
- ✅ **Upload de CV** - Stockage dans HubSpot Files
- ✅ **Téléphone E.164** - Formatage automatique vers E.164
- ✅ **Tracking UTM complet** - Toutes les métadonnées transmises
- ✅ **Analytics** - Événement `spontaneous_application_submitted` tracké

### Sécurité
- ✅ **Validation des types de fichiers** - PDF, DOC, DOCX uniquement
- ✅ **Limitation de taille** - 10MB maximum
- ✅ **Validation et formatage E.164** des numéros de téléphone
- ✅ **Sanitisation des données** - Protection contre les injections
- ✅ **Validation des URLs** - LinkedIn URL validée
- ✅ **Gestion des erreurs** - Pas d'exposition d'informations sensibles

## 📱 Formatage E.164

### Formats acceptés en entrée
- `+33 6 12 34 56 78` (format français avec espaces)
- `+33612345678` (format E.164)
- `06 12 34 56 78` (format français sans indicatif)
- `0612345678` (format français compact)

### Format de sortie
- **Toujours E.164** : `+33612345678`
- **Validation automatique** avec `libphonenumber-js`
- **France par défaut** si pas d'indicatif pays

## 🚀 Configuration requise

### 1. Créer un token d'accès HubSpot
1. Aller dans HubSpot > Settings > Integrations > Private Apps
2. Créer une nouvelle Private App
3. Donner les permissions suivantes :
   - **Files** : `files.ui_hidden.read`, `files.ui_hidden.write`
4. Copier le token généré
5. L'ajouter comme variable d'environnement `HUBSPOT_ACCESS_TOKEN`

### 2. Déployer le code
- Tous les fichiers sont prêts
- Aucune table de base de données à créer
- Aucun bucket de stockage à configurer

### 3. Tester
1. Aller sur `/notre-histoire`
2. Cliquer sur "Postuler" dans "Rejoindre notre équipe"
3. Remplir et soumettre le formulaire avec un CV
4. Vérifier dans HubSpot que le contact est créé avec le CV et le téléphone E.164

## 🎉 Résumé

- **1 nouvelle variable d'environnement** : `HUBSPOT_ACCESS_TOKEN`
- **0 nouvelle table de base de données**
- **0 nouveau bucket de stockage**
- **1 formulaire HubSpot existant** utilisé
- **Upload de CV** dans HubSpot Files
- **Formatage E.164** automatique du téléphone
- **Design identique** aux autres formulaires
- **Sécurités identiques** aux autres formulaires
- **Prêt à déployer** après configuration du token

Le formulaire est maintenant entièrement fonctionnel avec HubSpot, l'upload de CV et le formatage E.164 du téléphone !



