# Instructions de restauration QVEMA

## Vue d'ensemble
Le contenu "Qui veut être mon associé" (QVEMA) a été temporairement masqué du site. Toutes les références ont été commentées pour permettre une restauration facile.

## Fichiers modifiés

### 1. Pages QVEMA
- `src/app/ressources/jonathan-anguelov/qui-veut-etre-mon-associe/page.tsx`
- `src/app/ressources/jonathan-anguelov/qui-veut-etre-mon-associe/episodes/[uid]/page.tsx`

**Action de restauration :** Décommenter tout le contenu entre `/*` et `*/` et supprimer les fonctions de remplacement.

### 2. Navigation
- `src/components/resources/TaxonomyNav.tsx`

**Action de restauration :** Décommenter la ligne :
```typescript
{ href: "/ressources/jonathan-anguelov/qui-veut-etre-mon-associe", label: "Qui veut être mon associé ?" },
```

### 3. Page Jonathan Anguelov
- `src/app/ressources/jonathan-anguelov/page.tsx`

**Action de restauration :** Décommenter la section QVEMA entre `{/* TEMPORAIREMENT MASQUÉ - SECTION QVEMA` et `*/}`

### 4. Configuration Prismic
- `src/lib/prismicio.ts`
- `src/lib/link-resolver.ts`

**Action de restauration :** Décommenter les lignes QVEMA dans les deux fichiers.

### 5. Sitemap
- `next-sitemap.config.js`

**Action de restauration :** Décommenter les lignes QVEMA dans la configuration du sitemap.

## Types Prismic
Le type `qvema_episode` dans `customtypes/qvema_episode/index.json` est conservé et n'a pas besoin d'être modifié.

## Vérification après restauration
1. Vérifier que les pages QVEMA sont accessibles
2. Vérifier que les liens de navigation fonctionnent
3. Vérifier que le sitemap inclut les pages QVEMA
4. Tester la génération des types Prismic si nécessaire

## Notes importantes
- Tous les commentaires de masquage sont préfixés par "TEMPORAIREMENT MASQUÉ - QVEMA"
- Le contenu original est préservé dans les commentaires
- Aucune donnée n'a été supprimée définitivement















