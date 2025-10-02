# Test du Formulaire de Candidature Spontanée

## 🧪 Tests à effectuer

### 1. Test de l'interface utilisateur
- [ ] Aller sur la page "Notre histoire" (`/notre-histoire`)
- [ ] Vérifier que le bouton "Postuler" est visible dans la section "Rejoindre notre équipe"
- [ ] Cliquer sur le bouton "Postuler"
- [ ] Vérifier que le modal s'ouvre avec le formulaire
- [ ] Vérifier que le design est identique au formulaire "Accédez aux opportunités exclusives"

### 2. Test de validation du formulaire
- [ ] Essayer de soumettre le formulaire vide
- [ ] Vérifier que les messages d'erreur s'affichent pour les champs obligatoires
- [ ] Remplir un email invalide
- [ ] Vérifier que le message d'erreur "Format d'email invalide" s'affiche
- [ ] Remplir un numéro de téléphone invalide (ex: "123")
- [ ] Vérifier que le message d'erreur "Numéro de téléphone invalide" s'affiche
- [ ] Remplir une URL LinkedIn invalide
- [ ] Vérifier que le message d'erreur "URL LinkedIn invalide" s'affiche
- [ ] Essayer d'uploader un fichier non autorisé (ex: .txt)
- [ ] Vérifier que le message d'erreur "Le CV doit être un fichier PDF, DOC ou DOCX" s'affiche

### 3. Test de soumission réussie
- [ ] Remplir tous les champs obligatoires avec des données valides
- [ ] Uploader un CV valide (PDF, DOC ou DOCX)
- [ ] Soumettre le formulaire
- [ ] Vérifier que l'état de chargement s'affiche
- [ ] Vérifier que le message de succès s'affiche
- [ ] Vérifier que le modal se ferme après succès

### 4. Test de l'intégration HubSpot
- [ ] Vérifier dans HubSpot que le contact est créé
- [ ] Vérifier que tous les champs sont correctement mappés
- [ ] Vérifier que le CV est uploadé dans HubSpot Files
- [ ] Vérifier que l'URL du CV est correctement stockée
- [ ] Vérifier que les données UTM sont transmises

### 5. Test des données de tracking
- [ ] Vérifier que les données UTM sont correctement capturées
- [ ] Vérifier que l'événement analytics `spontaneous_application_submitted` est tracké
- [ ] Vérifier que les métadonnées de la page sont correctement enregistrées

## 🔧 Données de test

### Données valides pour le test
```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean.dupont@example.com",
  "phone": "+33 6 12 34 56 78",
  "position": "Développeur Full-Stack",
  "availability": "Immédiate",
  "motivationMessage": "Je suis passionné par l'immobilier et souhaite rejoindre une équipe dynamique.",
  "linkedinUrl": "https://linkedin.com/in/jean-dupont"
}
```

### Formats de téléphone acceptés
- `+33 6 12 34 56 78` (format français avec espaces)
- `+33612345678` (format E.164)
- `06 12 34 56 78` (format français sans indicatif)
- `0612345678` (format français compact)


## 🚨 Points d'attention

### Variables d'environnement
Vérifier que toutes les variables d'environnement sont configurées :
- `HUBSPOT_PORTAL_ID` (déjà configuré)
- `HUBSPOT_SPONTANEOUS_APPLICATION_FORM_GUID` (déjà configuré)
- `HUBSPOT_ACCESS_TOKEN` (nouveau - pour l'upload de CV)

### Configuration HubSpot
Vérifier que :
- ✅ Le formulaire HubSpot existe avec l'ID `9a180dcb-636b-476b-bb8f-cede80cda623` (déjà configuré)
- ✅ Tous les champs sont configurés (déjà configuré)
- ✅ Le formulaire est publié (déjà publié)

## 📊 Métriques de succès

- ✅ Formulaire s'ouvre sans erreur
- ✅ Validation fonctionne correctement
- ✅ Soumission réussie dans 100% des cas avec données valides
- ✅ Sauvegarde Supabase réussie dans 100% des cas
- ✅ Envoi HubSpot réussi dans >95% des cas
- ✅ Upload de CV réussi dans >95% des cas
- ✅ Analytics tracké correctement
- ✅ UX fluide sans erreurs JavaScript

## 🐛 Dépannage

### Erreurs courantes
1. **Erreur 500 lors de la soumission**
   - Vérifier les logs du serveur
   - Vérifier la connectivité avec HubSpot
   - Vérifier le token d'accès HubSpot

2. **CV non uploadé**
   - Vérifier le token d'accès HubSpot
   - Vérifier les permissions de la Private App
   - Vérifier la taille du fichier (max 10MB)

3. **HubSpot non synchronisé**
   - Vérifier le GUID du formulaire
   - Vérifier que le formulaire est publié
   - Vérifier les logs de l'API HubSpot

4. **Modal ne s'ouvre pas**
   - Vérifier la console JavaScript
   - Vérifier que le composant est correctement importé
   - Vérifier que l'état `isApplicationModalOpen` est géré
