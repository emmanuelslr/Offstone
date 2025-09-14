# Prismic + Next.js Minimal Starter

Want to quickly get started building your own project with [Prismic][prismic] and [Next.js][nextjs]? This project includes basic configurations and nothing else. The project includes one Rich Text slice, a homepage, and a dynamic page.

- **Demo**: [Open live demo][live-demo]
- **Learn more about Prismic and Next.js**: [Prismic Next.js Documentation][prismic-docs]

&nbsp;

![Website screenshot](https://user-images.githubusercontent.com/31219208/228821412-fdde92b2-c13c-4287-b799-611fa96a5fd6.png)

&nbsp;

## 🚀 Quick Start

To start a new project using this starter:

1. Visit <https://prismic.io/dashboard>.
2. Create a new Prismic repository by selecting **Next.js**.
3. Select the **Minimal starter**.
4. Fill out your repository details and continue with the steps given in Prismic.

When you're ready to start your project, run the following command:

```sh
npm run dev
```

## How to use your project

To edit the content of this project, go to [prismic.io/dashboard](https://prismic.io/dashboard), click on the repository for this website, and start editing.

### Create a page

To create a page, click on the green pencil icon, then select **Page**.

Pages are made of Slices. You can add and rearrange Slices to your pages.

Your new page will be accessible by its URL, but it won't appear on the website automatically. To let users discover it, add it to the navigation.

### Preview documents

If you chose this starter when you created a new repository from the Prismic Dashboard, then your repository is preconfigured with previews on localhost. To change the preview configuration or add previews to your production or staging environments, see [Preview Drafts in Next.js](https://prismic.io/docs/technologies/preview-content-nextjs) in the Prismic documentation.

### Customize this website

This website is preconfigured with Prismic. It has three Prismic packages installed:

- `@prismicio/client` provides helpers for fetching content from Prismic
- `@prismicio/react` provides React components for rendering content from Prismic
- `@prismicio/next` provides a wrapper component to configure Prismic previews

These packages are already integrated and employed in this app. Take a look at the code to see how they're used.

### Edit the code

There are two steps to rendering content from Prismic in your Next.js project:

1. Fetch content from the Prismic API using `@prismicio/client`.
2. Template the content using components from `@prismicio/react`.

Here are some of the files in your project that you can edit:

- `prismicio.ts` - This file includes configuration for `@prismicio/client` and exports useful API helpers.
- `app/layout.tsx` - This is your layout component, which includes configuration for `@prismicio/react` and `@prismicio/next`.
- `app/page.tsx` - This is the app homepage. It queries and renders a page document with the UID (unique identifier) "home" from the Prismic API.
- `app/[uid]/page.tsx` - This is the page component, which queries and renders a page document from your Prismic repository based on the UID.
- `slices/*/index.tsx` - Each Slice in your project has an index.tsx file that renders the Slice component. Edit this file to customize your Slices.

These are important files that you should leave as-is:

- `app/api/exit-preview/route.ts` - Do not edit or delete this file. This is the API endpoint to close a Prismic preview session.
- `app/api/preview/route.ts` - Do not edit or delete this file. This is the API endpoint to launch a Prismic preview session.
- `app/slice-simulator/page.tsx` - Do not edit or delete this file. This file simulates your Slice components in development.
- `slices/` - This directory contains Slice components, which are generated programmatically by Slice Machine. To customize a Slice template, you can edit the Slice's index.tsx file. To add Slices, delete Slices, or edit Slice models, use Slice Machine (more info below).

Learn more about how to edit your components with [Fetch Data in Next.js](https://prismic.io/docs/technologies/fetch-data-nextjs) and [Template Content in Next.js](https://prismic.io/docs/technologies/template-content-nextjs).

Learn more about how to use [TypeScript with Prismic](https://prismic.io/docs/typescript-nextjs).

### Deploy to the web

To put your project online, see [Deploy your Next.js App](https://prismic.io/docs/technologies/deploy-nextjs).

### Edit content models with Slice Machine

This project includes an application called Slice Machine, which generates models for your Custom Types and Slices. Slice Machine stores the models locally in your codebase, so you can save and version them. It also syncs your models to Prismic. To learn how to use Slice Machine, read [Model Content in Next.js](https://prismic.io/docs/technologies/model-content-nextjs).

If you change or add to your Custom Types, you'll need to update your route handling to match. To learn how to do that, read [Define Paths in Next.js](https://prismic.io/docs/technologies/define-paths-nextjs).

## Documentation

For the official Prismic documentation, see [Prismic's guide for Next.js][prismic-docs] or the [technical references for the installed Prismic packages](https://prismic.io/docs/technologies/technical-references).

## License

```
Copyright 2013-2022 Prismic <contact@prismic.io> (https://prismic.io)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[prismic]: https://prismic.io/
[prismic-docs]: https://prismic.io/docs/technologies/nextjs
[prismic-sign-up]: https://prismic.io/dashboard/signup
[nextjs]: https://nextjs.org/
[live-demo]: https://nextjs-starter-prismic-minimal.vercel.app/

---

# Leads API (Supabase)

ENV attendues (dans le `.env.local` à la racine du repo)
- SUPABASE_URL=...
- SUPABASE_SERVICE_ROLE_KEY=...
- NEXT_PUBLIC_SITE_URL=https://mon-domaine.fr
 - NEXT_PUBLIC_GA_ID=G-XXXX (optionnel; GA4)

Flux côté produit
- L’email provient du premier écran (« Entrez votre adresse mail »).
- Au submit: POST `/api/leads/start` immédiatement, avec UTM & contexte en querystring.
- Ensuite: PATCH `/api/leads/update` à chaque étape (auto‑save) de la modale multi‑étapes.

Exemples curl (QA)
- A. Démarrer / upsert un lead (POST /api/leads/start)
  - Local (dev):
    ```sh
    curl -X POST "http://localhost:3000/api/leads/start?utm_source=tv&utm_medium=offline&utm_campaign=m6&page_url=http://localhost:3000/ressources&asset_class=bureaux&article_uid=exemple-uid" \
      -H "content-type: application/json" \
      -d '{"email":"test+lead@offstone.fr"}'
    ```
  - Prod (remplacer le domaine):
    ```sh
    curl -X POST "https://MON-DOMAINE.FR/api/leads/start?utm_source=tv&utm_medium=offline&utm_campaign=m6&page_url=https://MON-DOMAINE.FR/ressources&asset_class=bureaux&article_uid=exemple-uid" \
      -H "content-type: application/json" \
      -d '{"email":"test+lead@offstone.fr"}'
    ```
  - Réponse attendue:
    ```json
    { "ok": true, "lead_id": "uuid" }
    ```

- B. Mise à jour progressive (PATCH /api/leads/update)
  - Remplacer `LEAD_ID` par l’UUID retourné ci‑dessus.
  - Ticket:
    ```sh
    curl -X PATCH "http://localhost:3000/api/leads/update" \
      -H "content-type: application/json" \
      -d '{"lead_id":"LEAD_ID","patch":{"ticket_target":"50k"}}'
    ```
  - Découverte:
    ```sh
    curl -X PATCH "http://localhost:3000/api/leads/update" \
      -H "content-type: application/json" \
      -d '{"lead_id":"LEAD_ID","patch":{"discovery":"tv"}}'
    ```
  - Appel maintenant:
    ```sh
    curl -X PATCH "http://localhost:3000/api/leads/update" \
      -H "content-type: application/json" \
      -d '{"lead_id":"LEAD_ID","patch":{"wants_call":true}}'
    ```
  - Coordonnées:
    ```sh
    curl -X PATCH "http://localhost:3000/api/leads/update" \
      -H "content-type: application/json" \
      -d '{"lead_id":"LEAD_ID","patch":{"first_name":"Alice","last_name":"Martin","phone":"+33600000000"}}'
    ```
  - Consentement + terminé:
    ```sh
    curl -X PATCH "http://localhost:3000/api/leads/update" \
      -H "content-type: application/json" \
      -d '{"lead_id":"LEAD_ID","patch":{"consent":true,"status":"completed"}}'
    ```
  - Réponse attendue à chaque PATCH:
    ```json
    { "ok": true }
    ```

Rappels contractuels
- `/api/leads/start` : dédoublonnage par email pour les leads `status='open'` de moins de 30 jours ; sinon création. Capture `page_url`, `ref`, `utm_*`, `asset_class`, `article_uid` via querystring. Retour toujours `{ ok: true, lead_id }`.
- `/api/leads/update` : met à jour uniquement les champs fournis dans `patch`. Normalise `ticket_target` en "<10k" | "20k" | "50k" | "100k+". Accepte `status`: "open" | "completed". Met toujours `updated_at` à `now()`.
- Service Role utilisé uniquement côté serveur via `offstone/lib/supabaseServer.ts`.
- Les routes montent sous `/api/leads/...` (même en `src/app`).

## Database schema (Supabase)
Exécuter ce snippet dans le SQL Editor si la table n'existe pas :

```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  status text default 'open',
  email text not null,
  ticket_target text,         -- '<10k' | '20k' | '50k' | '100k+'
  discovery text,             -- 'tv' | 'linkedin' | 'google' | ...
  wants_call boolean,
  first_name text,
  last_name text,
  phone text,
  consent boolean default false,
  asset_class text,
  article_uid text,
  page_url text,
  ref text,
  utm_source text, utm_medium text, utm_campaign text, utm_content text, utm_term text
);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);
```

## QA script (end-to-end)

1) Parcours utilisateur (UI)
- Ouvrir la modale via le bouton « Investir à nos côtés » → événement GA `lead_view`.
- Saisir un email valide et soumettre → POST `/api/leads/start` OK → événement GA `lead_start`.
- Choisir ticket `<10k` → `lead_progress` (step=2, ticket="<10k") → saute l’étape RDV → coordonnées → consentement → `lead_submit` → redirection `/merci`.
- Refaire avec ticket `50k` → étape RDV:
  - « Plus tard » → coordonnées → consentement → `/merci`.
  - « Oui, maintenant » → panneau Calendly visible → coordonnées → consentement → `/rdv`.

2) Vérifs base Supabase
- Après start : une ligne est créée ou réutilisée (dédoublonnage `status='open'` <30j), avec `page_url`, `ref`, `utm_*`, `asset_class`, `article_uid` bien enregistrés.
- Après chaque étape : chaque PATCH `/api/leads/update` ne remplit que les colonnes présentes dans `patch`.
- Au final : `status='completed'` et `updated_at` mis à jour.

3) Vérifs GA4 (événements)
- `lead_view` (ouverture overlay)
- `lead_start` (email validé)
- `lead_progress` (steps 2–4 avec paramètres `step`, `ticket`, `discovery`, `wantsCall` selon l’étape)
- `lead_submit` (final : `ticket`, `discovery`, `wantsCall`, `source:"overlay"`)

4) cURL rapides (rappel)
- POST `/api/leads/start` (avec querystring UTM) → renvoie `{ ok:true, lead_id }`.
- PATCH `/api/leads/update` pour `ticket_target`, `discovery`, `wants_call`, `first_name/last_name/phone`, `consent`, `status:"completed"`.
  - Local (dev) et Prod: voir exemples plus haut dans ce README.

5) Cas limites
- Email invalide → 400 `bad_email`.
- Re-soumission du même email <30j → même `lead_id` (pas de doublon).
- Fermeture de la modale au milieu → données partielles présentes en DB.
- Ticket non normalisé (ex.: `"50K"`, `"100 K +"`) → enregistré normalisé (`"50k"`, `"100k+"`).

6) Accessibilité / UX
- Overlay : `Esc` ferme, scroll du body verrouillé.
- Boutons : focus visible, libellés FR, rôle/aria OK.
- CLS : pas de reflow violent à l’ouverture.

## UI Notes
- Robustesse PATCH: en cas d’erreur réseau, un toast non‑bloquant apparaît (« Sauvegarde interrompue, réessai automatique ») et un ré‑essai silencieux est lancé après 2s. L’utilisateur n’est jamais bloqué.
- Feedback final: lors du consentement (dernier envoi), le bouton passe en état « Envoi… » avec un petit spinner jusqu’à la réponse de l’API, puis redirige vers `/merci` ou `/rdv`.

## Admin (Codex-native, sans MCP)
- Mini CLI côté offstone/ pour manipuler Supabase avec vos env.
- Prérequis: `.env.local` à la racine contient `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY`.
- Commandes (depuis `offstone/`):
  - `npm run supabase:check` → vérifie `public.leads` (retourne JSON `{ ok, exists }`).
  - `npm run supabase:insert` → insère un lead test (modifiez l’email via `--email`).
  - `npm run supabase:update` → met à jour un lead (remplacez l’ID et le patch JSON).

Notes:
- La création de la table se fait via le SQL Editor Supabase (voir “Database schema”). L’API PostgREST ne permet pas le DDL.
- Le script charge automatiquement `../.env.local` et `../../.env.local` si présents.
