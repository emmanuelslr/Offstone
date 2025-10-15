# Guide de Déploiement - Offstone Tracking Integration

## 🚀 Étapes de déploiement

### 1. Configuration des variables d'environnement

#### Supabase
```bash
# Obtenir depuis Supabase Dashboard > Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

#### HubSpot
```bash
# Obtenir depuis HubSpot > Settings > Integrations > API
HUBSPOT_PORTAL_ID=12345678
HUBSPOT_FORM_GUID=your-form-guid-here
HUBSPOT_FORMS_API=https://api.hsforms.com/submissions/v3/integration/submit
```

#### Submit Lead API
```bash
# Origins autoris�es (production + staging)
SUBMIT_LEAD_ALLOWED_ORIGINS=https://offstone.fr,https://www.offstone.fr
```

#### Comment obtenir le FORM_GUID HubSpot
1. Aller dans HubSpot > Marketing > Lead Capture > Forms
2. Créer un nouveau formulaire "Offstone - Compléter profil"
3. Ajouter les champs : email, firstname, lastname, phone, capacite_investissement
4. Ajouter les champs UTM : utm_source, utm_medium, utm_campaign, utm_term, utm_content
5. Publier le formulaire
6. Dans l'URL du formulaire, copier le GUID après `/form/`

### 2. Setup Supabase

#### Créer la table prospects
```sql
-- Exécuter le script create_prospects_table.sql dans Supabase SQL Editor
-- Ou copier-coller le contenu du fichier
```

#### Configurer les permissions
```sql
-- Donner les permissions appropriées à votre utilisateur d'application
GRANT SELECT, INSERT, UPDATE ON prospects TO your_app_user;
GRANT USAGE ON SEQUENCE prospects_id_seq TO your_app_user;
```

#### Vérifier la table
```sql
-- Tester l'insertion
INSERT INTO prospects (email, first_name, last_name, phone_e164, capacite_investissement, submitted_at, ip, user_agent)
VALUES ('test@example.com', 'Test', 'User', '+33612345678', '100_500k', NOW(), '127.0.0.1', 'Test Agent');

-- Vérifier l'insertion
SELECT * FROM prospects WHERE email = 'test@example.com';
```

### 3. Configuration HubSpot

#### Créer le formulaire
1. **Champs requis**:
   - email (Email)
   - firstname (Prénom)
   - lastname (Nom)
   - phone (Téléphone)
   - capacite_investissement (Capacité d'investissement)

2. **Champs UTM** (optionnels):
   - utm_source
   - utm_medium
   - utm_campaign
   - utm_term
   - utm_content

3. **Champs bonus**:
   - consentement_marketing (Consentement marketing)

#### Configurer les workflows
1. **Workflow 1**: Création de deal
   - Déclencheur : Soumission formulaire
   - Action : Créer un deal
   - Logique : Si meeting pris → deal "Meeting programmé", sinon "Candidature reçue"

2. **Workflow 2**: Tâche d'appel
   - Déclencheur : Deal créé
   - Condition : Deal = "Candidature reçue"
   - Action : Créer tâche d'appel J+1

### 4. Tests de validation

#### Test API
```bash
# Tester l'endpoint de test
curl "https://your-domain.com/api/test-integration?email=test@example.com&phone=0612345678"

# Tester l'endpoint submit-lead
curl -X POST "https://your-domain.com/api/submit-lead" \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "Alice",
    "lastname": "Test",
    "email": "alice@example.com",
    "phone": "+33612345678",
    "capacite_investissement": "100_500k",
    "utm_source": "manual",
    "utm_medium": "cli",
    "pageUri": "https://your-domain.com/merci",
    "pageName": "Merci"
  }'
```


> La r�ponse JSON inclut `supabaseStored`. Si HubSpot r�pond 502 mais que cette valeur est `true`, la ligne est d�j� contr�l�e c�t� Supabase : rejouez simplement l'appel HubSpot pour r�alimenter le CRM.

#### Test formulaire
1. Aller sur `/merci`
2. Remplir le formulaire de test
3. Vérifier les logs serveur
4. Vérifier dans Supabase et HubSpot

### 5. Monitoring et alertes

#### Logs à surveiller
```bash
# Logs Supabase
grep "Supabase UPSERT" /var/log/application.log

# Logs HubSpot
grep "HubSpot" /var/log/application.log

# Erreurs
grep "❌" /var/log/application.log
```

#### Métriques importantes
- Taux de succès Supabase (doit être 100%)
- Taux de succès HubSpot (acceptable < 100%)
- Temps de réponse des APIs
- Erreurs de validation téléphone

### 6. Checklist de déploiement

#### ✅ Pré-déploiement
- [ ] Variables d'environnement configurées
- [ ] Table Supabase créée et testée
- [ ] Formulaire HubSpot configuré
- [ ] Scripts de test exécutés
- [ ] Documentation à jour

#### ✅ Déploiement
- [ ] Code déployé en staging
- [ ] Tests E2E exécutés
- [ ] Validation avec l'équipe business
- [ ] Déploiement en production
- [ ] Monitoring activé

#### ✅ Post-déploiement
- [ ] Tests de production
- [ ] Validation des workflows HubSpot
- [ ] Vérification des données Supabase
- [ ] Formation de l'équipe
- [ ] Documentation mise à jour

## 🔧 Dépannage

### Problèmes courants

#### 1. Cookie hubspotutk absent
```javascript
// Vérifier dans la console
console.log(document.cookie.includes('hubspotutk'));
```
**Solution**: Vérifier que le script HubSpot est chargé

#### 2. Erreur Supabase
```
❌ Supabase UPSERT error: permission denied
```
**Solution**: Vérifier les permissions de la table prospects

#### 3. Erreur HubSpot
```
❌ HubSpot API error: 400 Bad Request
```
**Solution**: Vérifier le FORM_GUID et les champs du formulaire

#### 4. UTM non persistées
```javascript
// Vérifier localStorage
console.log(localStorage.getItem('offstone_utm_params'));
```
**Solution**: Vérifier que UTMTracker est initialisé

### Commandes utiles

```bash
# Vérifier les variables d'environnement
echo $NEXT_PUBLIC_SUPABASE_URL
echo $HUBSPOT_PORTAL_ID

# Tester la connexion Supabase
curl -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
     "$NEXT_PUBLIC_SUPABASE_URL/rest/v1/prospects?select=*"

# Tester l'API HubSpot
curl -X POST "https://api.hsforms.com/submissions/v3/integration/submit/$HUBSPOT_PORTAL_ID/$HUBSPOT_FORM_GUID" \
     -H "Content-Type: application/json" \
     -d '{"fields":[{"name":"email","value":"test@example.com"}]}'
```

## 📊 Métriques de succès

### KPIs techniques
- **Uptime API**: > 99.5%
- **Temps de réponse**: < 2s
- **Taux d'erreur**: < 1%
- **Déduplication**: 100% par email

### KPIs business
- **Taux de conversion**: Meeting → Formulaire
- **Qualité des données**: Téléphones valides > 95%
- **Workflows déclenchés**: 100% des soumissions
- **Conformité RGPD**: 100% des consentements

## 🔄 Maintenance

### Tâches régulières
- [ ] Vérification des logs d'erreur (quotidienne)
- [ ] Validation des données Supabase (hebdomadaire)
- [ ] Test des workflows HubSpot (mensuelle)
- [ ] Mise à jour des dépendances (trimestrielle)

### Évolutions prévues
- [ ] Intégration Slack pour notifications
- [ ] Dashboard de monitoring
- [ ] Analytics avancées
- [ ] A/B testing des formulaires



































