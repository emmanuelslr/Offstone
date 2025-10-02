# Configuration - Formulaire de Candidature Spontanée

## 🚀 Variables d'environnement

### Variables d'environnement requises
```bash
# HubSpot Portal ID (déjà existant)
HUBSPOT_PORTAL_ID=146846899

# Formulaire de candidature spontanée (déjà configuré)
HUBSPOT_SPONTANEOUS_APPLICATION_FORM_GUID=9a180dcb-636b-476b-bb8f-cede80cda623

# Nouveau: Token d'accès HubSpot pour l'upload de fichiers
HUBSPOT_ACCESS_TOKEN=your_hubspot_access_token_here
```

## 📋 Configuration

### 1. Formulaire HubSpot
✅ **Le formulaire HubSpot existe déjà** avec l'ID `9a180dcb-636b-476b-bb8f-cede80cda623`
- Portal ID: `146846899`
- Region: `eu1`
- Script: `https://js-eu1.hsforms.net/forms/embed/146846899.js`

### 2. Token d'accès HubSpot
Pour permettre l'upload des CV, vous devez créer un token d'accès HubSpot :
1. Aller dans HubSpot > Settings > Integrations > Private Apps
2. Créer une nouvelle Private App
3. Donner les permissions suivantes :
   - **Files** : `files.ui_hidden.read`, `files.ui_hidden.write`
4. Copier le token généré
5. L'ajouter comme variable d'environnement `HUBSPOT_ACCESS_TOKEN`

### 3. Intégration
✅ **Intégration HubSpot uniquement** - Aucune configuration Supabase requise

### 4. Tester l'intégration
1. Aller sur la page "Notre histoire"
2. Cliquer sur le bouton "Postuler" dans la section "Rejoindre notre équipe"
3. Remplir et soumettre le formulaire
4. Vérifier dans HubSpot que le contact est bien créé

## 🔧 Structure des données

### Formulaire HubSpot
Le formulaire utilise uniquement HubSpot pour stocker les données :
- **email**: Email (requis)
- **firstname**: Prénom (requis)
- **lastname**: Nom (requis)
- **phone**: Téléphone au format E.164 (requis, ex: +33612345678)
- **position**: Poste recherché (requis)
- **availability**: Disponibilité (optionnel)
- **motivation_message**: Message de motivation (optionnel)
- **linkedin_url**: URL LinkedIn (requis)
- **cv_url**: URL du CV uploadé (requis)
- **utm_source, utm_medium, utm_campaign, utm_content, utm_term**: Tracking UTM
- **page_url, referrer, cta_id**: Contexte de la page

## 🎯 Fonctionnalités

### Formulaire
- ✅ Design identique au formulaire "Accédez aux opportunités exclusives"
- ✅ Validation côté client et serveur
- ✅ Upload de CV (PDF, DOC, DOCX, max 10MB)
- ✅ Validation et formatage E.164 du téléphone
- ✅ Validation de l'URL LinkedIn
- ✅ Gestion des erreurs avec messages explicites
- ✅ États de chargement et de succès

### Intégrations
- ✅ Envoi vers HubSpot uniquement
- ✅ Upload des CV dans HubSpot Files
- ✅ Tracking UTM complet
- ✅ Analytics avec événements personnalisés

### Sécurité
- ✅ Validation des types de fichiers
- ✅ Limitation de taille des fichiers
- ✅ Validation et formatage E.164 des numéros de téléphone
- ✅ Sanitisation des données
- ✅ Gestion des erreurs sans exposer d'informations sensibles

## 📊 Analytics

L'événement `spontaneous_application_submitted` est tracké avec :
- `position`: Poste recherché
- `page_url`: URL de la page
- `utm_campaign`: Campagne UTM
- `cta_id`: ID du CTA cliqué

## 🔍 Monitoring

### Logs à surveiller
- Erreurs d'upload de CV
- Échecs d'envoi HubSpot

### Métriques importantes
- Taux de conversion du bouton "Postuler"
- Taux de soumission du formulaire
- Taux d'erreur par type
- Volume de candidatures par jour/semaine
