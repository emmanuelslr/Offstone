# 🏢 Offstone Website

Site web officiel d'Offstone - Plateforme d'investissement immobilier.

**🌐 Live Site:** [offstone.vercel.app](https://offstone.vercel.app)

## 🚀 Getting Started

### Prérequis
- Node.js 18+ 
- Variables d'environnement configurées (voir [SECURITY_SETUP.md](./SECURITY_SETUP.md))

### Installation

1. Clonez le repository :
```bash
git clone https://github.com/emmanuelslr/Offstone.git
cd Offstone
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
```bash
cp env.example .env.local
# Éditez .env.local avec vos vraies valeurs
```

4. Lancez le serveur de développement :

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Ouvrez [http://localhost:3001](http://localhost:3001) dans votre navigateur.

## 🛠️ Technologies

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS
- **CMS:** Prismic
- **Database:** Supabase
- **Deployment:** Vercel

## 🔒 Sécurité

Ce projet utilise Row Level Security (RLS) sur Supabase pour protéger les données sensibles.

**⚠️ IMPORTANT:** Consultez [SECURITY_SETUP.md](./SECURITY_SETUP.md) pour la configuration des variables d'environnement.

## 📁 Structure du Projet

```
src/
├── app/                 # Pages et API routes
│   ├── api/leads/      # API pour la gestion des leads
│   └── home-page/      # Page d'accueil
├── components/         # Composants React
├── lib/               # Utilitaires et configurations
└── slices/            # Composants Prismic
```

## 🚀 Déploiement

Le site est automatiquement déployé sur Vercel à chaque push sur la branche `main`.

### Configuration Vercel

Assurez-vous d'avoir configuré les variables d'environnement dans votre dashboard Vercel :
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## 📞 Support

Pour toute question ou problème, consultez la documentation ou contactez l'équipe de développement.
