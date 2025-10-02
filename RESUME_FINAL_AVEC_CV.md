# ✅ Formulaire de Candidature Spontanée - HubSpot avec CV

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
1. **`src/components/forms/SpontaneousApplicationModal.tsx`** - Formulaire avec design identique + CV
2. **`src/app/api/spontaneous-application/route.ts`** - API HubSpot avec upload de CV
3. **`SPONTANEOUS_APPLICATION_SETUP.md`** - Documentation complète
4. **`test_spontaneous_application.md`** - Guide de test complet
5. **`RESUME_FINAL_AVEC_CV.md`** - Ce résumé

### Fichiers modifiés
1. **`src/app/notre-histoire/components/CustomersShowcaseSection.tsx`** - Intégration du formulaire

## 🎨 Fonctionnalités

### Formulaire
- ✅ **Design identique** au formulaire "Accédez aux opportunités exclusives"
- ✅ **Tous les champs demandés** : Prénom, Nom, Email, Téléphone, Poste, Disponibilité, **CV**, Message, LinkedIn
- ✅ **Upload de CV** : PDF, DOC, DOCX (max 10MB)
- ✅ **Validation complète** côté client et serveur
- ✅ **Gestion des erreurs** avec messages explicites
- ✅ **États de chargement** et de succès

### Intégration HubSpot
- ✅ **Formulaire HubSpot** - Utilise le formulaire existant
- ✅ **Upload de CV** - Stockage dans HubSpot Files
- ✅ **Tracking UTM complet** - Toutes les métadonnées transmises
- ✅ **Analytics** - Événement `spontaneous_application_submitted` tracké

### Sécurité
- ✅ **Validation des types de fichiers** - PDF, DOC, DOCX uniquement
- ✅ **Limitation de taille** - 10MB maximum
- ✅ **Sanitisation des données** - Protection contre les injections
- ✅ **Validation des URLs** - LinkedIn URL validée
- ✅ **Gestion des erreurs** - Pas d'exposition d'informations sensibles

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
4. Vérifier dans HubSpot que le contact est créé avec le CV

## 🎉 Résumé

- **1 nouvelle variable d'environnement** : `HUBSPOT_ACCESS_TOKEN`
- **0 nouvelle table de base de données**
- **0 nouveau bucket de stockage**
- **1 formulaire HubSpot existant** utilisé
- **Upload de CV** dans HubSpot Files
- **Design identique** aux autres formulaires
- **Sécurités identiques** aux autres formulaires
- **Prêt à déployer** après configuration du token

Le formulaire est maintenant entièrement fonctionnel avec HubSpot et l'upload de CV !



