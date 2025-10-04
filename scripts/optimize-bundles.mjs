#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🔍 Analyse des bundles JavaScript...\n');

// Analyser les imports dynamiques
function analyzeDynamicImports() {
  const srcDir = path.join(projectRoot, 'src');
  const files = getAllFiles(srcDir, ['.tsx', '.ts', '.jsx', '.js']);
  
  let dynamicImports = 0;
  let staticImports = 0;
  let largeImports = [];
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Compter les imports dynamiques
    const dynamicMatches = content.match(/import\s*\(/g);
    if (dynamicMatches) {
      dynamicImports += dynamicMatches.length;
    }
    
    // Compter les imports statiques
    const staticMatches = content.match(/import\s+.*\s+from\s+['"]/g);
    if (staticMatches) {
      staticImports += staticMatches.length;
    }
    
    // Identifier les gros imports
    const largeImportMatches = content.match(/import\s+.*\s+from\s+['"][^'"]*['"]/g);
    if (largeImportMatches) {
      largeImportMatches.forEach(match => {
        if (match.includes('framer-motion') || 
            match.includes('swiper') || 
            match.includes('prismic') ||
            match.includes('react-icons')) {
          largeImports.push({
            file: path.relative(projectRoot, file),
            import: match.trim()
          });
        }
      });
    }
  });
  
  console.log('📊 Analyse des imports:');
  console.log(`  Imports dynamiques: ${dynamicImports}`);
  console.log(`  Imports statiques: ${staticImports}`);
  console.log(`  Ratio dynamique: ${((dynamicImports / (dynamicImports + staticImports)) * 100).toFixed(1)}%`);
  
  if (largeImports.length > 0) {
    console.log('\n⚠️  Gros imports détectés:');
    largeImports.forEach(({ file, import: importStatement }) => {
      console.log(`  ${file}: ${importStatement}`);
    });
  }
  
  return { dynamicImports, staticImports, largeImports };
}

// Analyser les composants lourds
function analyzeHeavyComponents() {
  const srcDir = path.join(projectRoot, 'src');
  const files = getAllFiles(srcDir, ['.tsx', '.ts']);
  
  let heavyComponents = [];
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n').length;
    
    if (lines > 200) {
      heavyComponents.push({
        file: path.relative(projectRoot, file),
        lines: lines,
        size: fs.statSync(file).size
      });
    }
  });
  
  if (heavyComponents.length > 0) {
    console.log('\n📦 Composants lourds détectés:');
    heavyComponents
      .sort((a, b) => b.lines - a.lines)
      .forEach(({ file, lines, size }) => {
        console.log(`  ${file}: ${lines} lignes (${(size / 1024).toFixed(1)} KB)`);
      });
  }
  
  return heavyComponents;
}

// Recommandations d'optimisation
function generateOptimizationRecommendations(analysis) {
  console.log('\n💡 Recommandations d\'optimisation:');
  
  const { dynamicImports, staticImports, largeImports } = analysis;
  
  if (dynamicImports < 5) {
    console.log('  ✅ Augmenter les imports dynamiques pour réduire la taille du bundle initial');
  }
  
  if (largeImports.length > 0) {
    console.log('  ✅ Optimiser les imports de bibliothèques lourdes:');
    largeImports.forEach(({ file, import: importStatement }) => {
      if (importStatement.includes('framer-motion')) {
        console.log(`    - ${file}: Utiliser des imports spécifiques de framer-motion`);
      }
      if (importStatement.includes('react-icons')) {
        console.log(`    - ${file}: Importer seulement les icônes nécessaires`);
      }
    });
  }
  
  console.log('  ✅ Utiliser React.lazy() pour les composants lourds');
  console.log('  ✅ Implémenter le code splitting par route');
  console.log('  ✅ Optimiser les images avec next/image');
}

// Fonction utilitaire pour récupérer tous les fichiers
function getAllFiles(dir, extensions) {
  let files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files = files.concat(getAllFiles(fullPath, extensions));
    } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  });
  
  return files;
}

// Exécuter l'analyse
try {
  const analysis = analyzeDynamicImports();
  const heavyComponents = analyzeHeavyComponents();
  generateOptimizationRecommendations(analysis);
  
  console.log('\n✅ Analyse terminée !');
} catch (error) {
  console.error('❌ Erreur lors de l\'analyse:', error.message);
  process.exit(1);
}
