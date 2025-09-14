# 🔒 Configuration de Sécurité Supabase

## ⚠️ IMPORTANT : Variables d'Environnement Requises

Pour que l'application fonctionne correctement, vous devez configurer ces variables d'environnement :

### Variables Requises

```bash
SUPABASE_URL=https://bnwvykqvxwycammsnnue.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJud3Z5a3F2eHd5Y2FtbXNubnVlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjQ1OTAzMSwiZXhwIjoyMDcyMDM1MDMxfQ.iIA_eZn4YSW4arajtaOyYuSUx6YwoUYPytL4qPQeSDM
```

## 🚀 Configuration Vercel

### 1. Allez sur votre Dashboard Vercel
- Connectez-vous à [vercel.com](https://vercel.com)
- Sélectionnez votre projet "Offstone"

### 2. Ajoutez les Variables d'Environnement
- Allez dans **Settings** → **Environment Variables**
- Ajoutez les 2 variables ci-dessus
- Assurez-vous qu'elles sont activées pour **Production**, **Preview**, et **Development**

### 3. Redéployez
- Après avoir ajouté les variables, **redéployez** votre projet
- Vercel va automatiquement redéployer avec les nouvelles variables

## 🛡️ Sécurité Row Level Security (RLS)

La table `public.leads` est configurée avec Row Level Security activé :

- ✅ **Service Role** : Accès complet (pour les API)
- ❌ **Authenticated/Anon** : Accès bloqué (sécurité)

## 🧪 Test de Fonctionnement

Après configuration, testez :
1. Création de lead via le formulaire
2. Mise à jour de lead via l'API
3. Vérification des logs Vercel

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les variables d'environnement dans Vercel
2. Consultez les logs de déploiement
3. Testez les endpoints API
