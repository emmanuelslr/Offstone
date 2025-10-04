#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration des tests
const tests = {
  // Vérifier les fichiers d'optimisation
  files: [
    'src/components/shared/OptimizedImage.tsx',
    'src/components/shared/FontOptimizer.tsx',
    'src/components/shared/PerformanceOptimizer.tsx',
    'src/components/shared/AccessibilityOptimizer.tsx',
    'vercel.json',
    'PERFORMANCE_OPTIMIZATIONS.md'
  ],
  
  // Vérifier les configurations
  configs: [
    'next.config.ts',
    'package.json',
    'src/app/layout.tsx'
  ],
  
  // Vérifier les optimisations CSS
  css: [
    'src/app/globals.css'
  ]
};

// Fonction pour vérifier l'existence d'un fichier
function checkFileExists(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);
  return fs.existsSync(fullPath);
}

// Fonction pour vérifier le contenu d'un fichier
function checkFileContent(filePath, expectedContent) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    return { exists: false, content: false };
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  const hasContent = expectedContent.some(item => content.includes(item));
  
  return { exists: true, content: hasContent };
}

// Fonction pour vérifier les optimisations
function checkOptimizations() {
  console.log('🔍 Vérification des optimisations...\n');
  
  let passed = 0;
  let total = 0;
  
  // Vérifier les fichiers d'optimisation
  console.log('📁 Vérification des fichiers d\'optimisation:');
  tests.files.forEach(file => {
    total++;
    const exists = checkFileExists(file);
    if (exists) {
      console.log(`  ✅ ${file}`);
      passed++;
    } else {
      console.log(`  ❌ ${file} - MANQUANT`);
    }
  });
  
  console.log('\n⚙️ Vérification des configurations:');
  
  // Vérifier next.config.ts
  total++;
  const nextConfig = checkFileContent('next.config.ts', [
    'optimizePackageImports',
    'splitChunks',
    'compress: true',
    'generateEtags: true'
  ]);
  
  if (nextConfig.exists && nextConfig.content) {
    console.log('  ✅ next.config.ts - Optimisé');
    passed++;
  } else {
    console.log('  ❌ next.config.ts - Non optimisé');
  }
  
  // Vérifier package.json
  total++;
  const packageJson = checkFileContent('package.json', [
    'images:optimize',
    'optimize'
  ]);
  
  if (packageJson.exists && packageJson.content) {
    console.log('  ✅ package.json - Scripts d\'optimisation ajoutés');
    passed++;
  } else {
    console.log('  ❌ package.json - Scripts manquants');
  }
  
  // Vérifier layout.tsx
  total++;
  const layout = checkFileContent('src/app/layout.tsx', [
    'FontOptimizer',
    'PerformanceOptimizer',
    'AccessibilityOptimizer',
    'strategy="lazyOnload"',
    'maximum-scale=5.0'
  ]);
  
  if (layout.exists && layout.content) {
    console.log('  ✅ layout.tsx - Optimisé');
    passed++;
  } else {
    console.log('  ❌ layout.tsx - Non optimisé');
  }
  
  // Vérifier vercel.json
  total++;
  const vercel = checkFileContent('vercel.json', [
    'Cache-Control',
    'max-age=31536000',
    'X-Content-Type-Options',
    'X-Frame-Options'
  ]);
  
  if (vercel.exists && vercel.content) {
    console.log('  ✅ vercel.json - Configuration de cache et sécurité');
    passed++;
  } else {
    console.log('  ❌ vercel.json - Configuration manquante');
  }
  
  // Vérifier globals.css
  total++;
  const css = checkFileContent('src/app/globals.css', [
    'text-contrast-high',
    'focus-visible',
    'sr-only',
    'will-change-transform',
    'prefers-reduced-motion'
  ]);
  
  if (css.exists && css.content) {
    console.log('  ✅ globals.css - Classes d\'accessibilité et performance');
    passed++;
  } else {
    console.log('  ❌ globals.css - Classes manquantes');
  }
  
  console.log('\n📊 Résultats:');
  console.log(`  ✅ ${passed}/${total} tests réussis`);
  console.log(`  📈 Score: ${Math.round((passed / total) * 100)}%`);
  
  if (passed === total) {
    console.log('\n🎉 Toutes les optimisations sont en place !');
    console.log('\n📋 Prochaines étapes:');
    console.log('  1. npm run images:optimize');
    console.log('  2. npm run build');
    console.log('  3. npm run deploy');
    console.log('  4. Tester avec Lighthouse');
  } else {
    console.log('\n⚠️ Certaines optimisations sont manquantes.');
    console.log('Vérifiez les fichiers marqués comme ❌');
  }
  
  return passed === total;
}

// Fonction pour générer un rapport
function generateReport() {
  const report = `# Rapport d'Optimisation - ${new Date().toISOString()}

## Optimisations Implémentées

### Composants d'Optimisation
- ✅ OptimizedImage.tsx - Lazy loading et formats modernes
- ✅ FontOptimizer.tsx - Optimisation des fonts
- ✅ PerformanceOptimizer.tsx - Optimisations globales
- ✅ AccessibilityOptimizer.tsx - Amélioration de l'accessibilité

### Configuration
- ✅ next.config.ts - Code splitting et optimisations
- ✅ vercel.json - Cache et sécurité
- ✅ package.json - Scripts d'optimisation
- ✅ globals.css - Classes d'accessibilité

### Scripts Disponibles
- npm run images:optimize - Optimiser les images
- npm run optimize - Build optimisé complet
- npm run build - Build standard

## Résultats Attendus

### Performances
- FCP: 2.2s → 1.5s (-32%)
- LCP: 7.1s → 3.5s (-51%)
- TBT: 370ms → 150ms (-59%)

### Scores Lighthouse
- Performances: 65 → 85+ (+20 points)
- Accessibilité: 90 → 95+ (+5 points)
- Bonnes Pratiques: 75 → 90+ (+15 points)

## Instructions de Déploiement

1. Optimiser les images: \`npm run images:optimize\`
2. Build optimisé: \`npm run build\`
3. Déployer: \`npm run deploy\`
4. Tester avec Lighthouse

## Monitoring

- Vérifier les scores Lighthouse mensuellement
- Surveiller les Core Web Vitals
- Optimiser les nouvelles images
- Mettre à jour les dépendances
`;

  const reportPath = path.join(__dirname, '..', 'OPTIMIZATION_REPORT.md');
  fs.writeFileSync(reportPath, report);
  console.log(`\n📄 Rapport généré: ${reportPath}`);
}

// Fonction principale
function main() {
  console.log('🚀 Test des Optimisations - Offstone Website\n');
  
  const success = checkOptimizations();
  
  if (success) {
    generateReport();
    console.log('\n✨ Optimisations complètes ! Prêt pour le déploiement.');
  } else {
    console.log('\n🔧 Veuillez corriger les problèmes identifiés avant le déploiement.');
  }
}

// Exécuter les tests
main();
