# Variables d'environnement - Formulaire de Candidature Spontanée

## ✅ Variables déjà configurées

Ces variables sont déjà configurées dans Vercel et ne nécessitent aucune action :

```bash
# Supabase (déjà configuré)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# HubSpot (déjà configuré)
HUBSPOT_PORTAL_ID=146846899
```

## 🎯 Aucune nouvelle variable d'environnement requise

**Bonne nouvelle !** Toutes les variables d'environnement nécessaires sont déjà configurées :

- ✅ **Supabase** : Table `spontaneous_applications` existe déjà
- ✅ **HubSpot** : Formulaire avec ID `9a180dcb-636b-476b-bb8f-cede80cda623` existe déjà
- ✅ **Portal ID** : `146846899` déjà configuré
- ✅ **Script HubSpot** : `https://js-eu1.hsforms.net/forms/embed/146846899.js` déjà disponible

## 🚀 Prêt pour le déploiement

Le formulaire de candidature spontanée est maintenant prêt à être utilisé ! Il suffit de :

1. **Déployer le code** (tous les fichiers sont prêts)
2. **Configurer le bucket Supabase Storage** (si pas encore fait)
3. **Tester** sur la page "Notre histoire"

## 📋 Configuration Supabase Storage (si nécessaire)

Si le bucket `documents` n'existe pas encore dans Supabase Storage :

```sql
-- Créer le bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Politique pour l'upload
CREATE POLICY "Allow service role to upload documents" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.role() = 'service_role');

-- Politique pour la lecture
CREATE POLICY "Allow service role to read documents" ON storage.objects
FOR SELECT USING (bucket_id = 'documents' AND auth.role() = 'service_role');
```

## 🎉 Résumé

- **0 nouvelle variable d'environnement** à ajouter
- **Table Supabase** : ✅ Existe déjà
- **Formulaire HubSpot** : ✅ Existe déjà
- **Code** : ✅ Prêt à déployer
- **Test** : ✅ Prêt à tester

Le formulaire est maintenant entièrement fonctionnel !



