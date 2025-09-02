# Offstone Preview

Prévisualisation isolée de la section Hero (sans navbar ni footer).

## Démarrer en local

- Prérequis: Node 18+ et npm
- Installation:

```bash
cd offstone-preview
npm install
npm run dev
```

L’interface est servie sur http://localhost:3010

## Déployer sur un nouveau dépôt Git

1) Initialiser le dépôt dans ce dossier:

```bash
cd offstone-preview
git init
git add .
git commit -m "Initial commit: Offstone Preview"
```

2) Créer un nouveau repo distant (GitHub/GitLab/Bitbucket) et l’ajouter, ex. GitHub:

```bash
git remote add origin https://github.com/<org_ou_user>/offstone-preview.git
git branch -M main
git push -u origin main
```

## Vercel + Domaine `offstone.eu`

Option A — via interface Vercel:
- New Project → Importer le repo `offstone-preview`
- Build & Output Settings par défaut (Next.js)
- Une fois déployé, aller dans Settings → Domains → Add → `offstone.eu`
- Si le domaine est déjà attaché à un autre projet Vercel, cliquer « Move » pour le basculer ici temporairement
- Si le domaine est chez un autre registrar, ajouter les entrées DNS indiquées par Vercel (ou changer les nameservers)

Option B — via Vercel CLI (si vous avez `vercel` configuré):

```bash
cd offstone-preview
vercel link
vercel deploy --prod
vercel domains add offstone.eu
```

Remettre le domaine sur le projet principal quand il sera prêt (Domains → Move/Remove).

## Notes
- Le projet embarque uniquement la section Hero et les assets nécessaires (vidéo + image + polices).
- Tailwind est configuré avec les mêmes breakpoints `xs/sm/...` pour un rendu identique.
