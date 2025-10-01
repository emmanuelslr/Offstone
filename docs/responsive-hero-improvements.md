# Améliorations Responsive - Hero Section "Pourquoi Offstone"

## Problème identifié
La hero section de la page "Pourquoi Offstone" présentait des problèmes d'affichage sur les écrans 14 pouces et autres tailles d'écran desktop, avec un responsive qui ne s'adaptait pas correctement.

## Solutions implémentées

### 1. Amélioration du calcul de taille du carousel
**Fichier**: `src/app/pourquoi-offstone/components/HeroPourquoiOffstone.tsx`

**Avant**:
```javascript
if (w < 400) {
  s = Math.max(300, Math.min(340, w - 32));
} else if (w < 640) {
  s = Math.max(320, Math.min(380, w - 40));
} else if (w < 1024) {
  s = 520;
} else {
  s = 700;
}
```

**Après**:
```javascript
if (w < 400) {
  s = Math.max(300, Math.min(340, w - 32));
} else if (w < 640) {
  s = Math.max(320, Math.min(380, w - 40));
} else if (w < 768) {
  s = 480;
} else if (w < 1024) {
  s = 520;
} else if (w < 1280) {
  // Écrans 14 pouces et tablettes en mode paysage
  s = 580;
} else if (w < 1440) {
  s = 620;
} else {
  s = 700;
}
```

### 2. Amélioration du layout responsive
**Changements**:
- Passage de `lg:flex-row` à `md:flex-row` pour un meilleur affichage sur les écrans moyens
- Ajout de breakpoints intermédiaires pour les paddings et marges
- Optimisation des espacements pour chaque taille d'écran

### 3. Ajout de classes CSS personnalisées
**Classes ajoutées**:
- `.hero-pourquoi-offstone` - Classe principale
- `.hero-content` - Conteneur du contenu
- `.hero-text` - Section texte
- `.hero-title` - Titre principal
- `.hero-description` - Description
- `.hero-form` - Formulaire
- `.hero-carousel` - Carousel d'images

### 4. Media queries optimisées pour tous les écrans desktop
**Fichier**: `src/app/globals.css`

#### Breakpoints ajoutés:
- **1024px - 1280px**: Petits écrans desktop
- **1280px - 1440px**: Écrans desktop moyens
- **1440px - 1680px**: Écrans desktop larges
- **1680px+**: Écrans desktop très larges
- **2560px+**: Écrans 4K

#### Optimisations spécifiques:
- **Écrans 14 pouces (1366x768)**: Media query spéciale avec `max-height: 768px`
- **Ajustements de taille de police**: Progression fluide de 3rem à 6rem
- **Espacements adaptatifs**: Marges et paddings optimisés pour chaque taille
- **Gaps responsifs**: Espacement entre les colonnes adapté

## Résultats attendus

### Écrans 14 pouces (1366x768)
- Titre: 3rem
- Espacement réduit pour s'adapter à la hauteur limitée
- Carousel: 580px

### Écrans 15-17 pouces (1920x1080)
- Titre: 4rem
- Espacement équilibré
- Carousel: 620px

### Écrans larges (1440px+)
- Titre: 4.5rem+
- Espacement généreux
- Carousel: 700px

### Écrans 4K (2560px+)
- Titre: 6rem
- Largeur maximale: 1400px
- Centrage automatique

## Tests recommandés

1. **Test sur différents navigateurs**:
   - Chrome, Firefox, Safari, Edge

2. **Test sur différentes résolutions**:
   - 1366x768 (14 pouces)
   - 1920x1080 (15-17 pouces)
   - 2560x1440 (27 pouces)
   - 3840x2160 (4K)

3. **Test de redimensionnement**:
   - Redimensionner la fenêtre du navigateur
   - Vérifier les transitions fluides entre breakpoints

## Maintenance

Les classes CSS utilisent `!important` pour s'assurer que les styles responsive prennent le dessus sur les styles Tailwind par défaut. Si des modifications sont nécessaires, il est recommandé de:

1. Modifier les media queries dans `globals.css`
2. Tester sur plusieurs tailles d'écran
3. Vérifier la cohérence visuelle

## Compatibilité

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile responsive (inchangé)
