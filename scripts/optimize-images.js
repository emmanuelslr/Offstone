#!/usr/bin/env node

/**
 * Script d'optimisation des images pour Offstone
 * 
 * Ce script analyse les images du projet et fournit des recommandations d'optimisation.
 * 
 * Usage: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const MAX_FILE_SIZE = 500 * 1024; // 500KB
const LARGE_FILE_SIZE = 200 * 1024; // 200KB

const OPTIMAL_FORMATS = {
  '.jpg': 'Considérer WebP/AVIF',
  '.jpeg': 'Considérer WebP/AVIF', 
  '.png': 'Considérer WebP/AVIF',
  '.gif': 'Considérer WebP pour images statiques',
  '.webp': '✅ Format optimisé',
  '.avif': '✅ Format optimisé',
  '.svg': '✅ Format optimal pour icônes'
};

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeImages(dir, results = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      analyzeImages(fullPath, results);
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'].includes(ext)) {
        const size = getFileSize(fullPath);
        const relativePath = path.relative(path.join(__dirname, '..'), fullPath);
        
        results.push({
          path: relativePath,
          name: item,
          extension: ext,
          size: size,
          sizeFormatted: formatFileSize(size),
          recommendation: OPTIMAL_FORMATS[ext] || 'Format non reconnu',
          isLarge: size > LARGE_FILE_SIZE,
          isTooLarge: size > MAX_FILE_SIZE,
          category: path.basename(path.dirname(fullPath))
        });
      }
    }
  }
  
  return results;
}

function generateReport(images) {
  console.log('\n🖼️  RAPPORT D\'OPTIMISATION DES IMAGES - OFFSTONE\n');
  console.log('═'.repeat(60));
  
  // Statistiques générales
  const totalImages = images.length;
  const totalSize = images.reduce((sum, img) => sum + img.size, 0);
  const largeImages = images.filter(img => img.isLarge);
  const tooLargeImages = images.filter(img => img.isTooLarge);
  const nonOptimalImages = images.filter(img => !img.recommendation.includes('✅'));
  
  console.log(`📊 STATISTIQUES GÉNÉRALES`);
  console.log(`   • Total d'images: ${totalImages}`);
  console.log(`   • Taille totale: ${formatFileSize(totalSize)}`);
  console.log(`   • Images > 200KB: ${largeImages.length}`);
  console.log(`   • Images > 500KB: ${tooLargeImages.length}`);
  console.log(`   • Images non optimisées: ${nonOptimalImages.length}`);
  console.log('');
  
  // Images problématiques
  if (tooLargeImages.length > 0) {
    console.log('🚨 IMAGES TROP LOURDES (> 500KB)');
    tooLargeImages.forEach(img => {
      console.log(`   ❌ ${img.path} (${img.sizeFormatted})`);
    });
    console.log('');
  }
  
  // Images grandes mais acceptables
  if (largeImages.filter(img => !img.isTooLarge).length > 0) {
    console.log('⚠️  IMAGES GRANDES (200-500KB)');
    largeImages.filter(img => !img.isTooLarge).forEach(img => {
      console.log(`   🟡 ${img.path} (${img.sizeFormatted})`);
    });
    console.log('');
  }
  
  // Recommandations par format
  console.log('🎯 RECOMMANDATIONS PAR FORMAT');
  const formatGroups = {};
  images.forEach(img => {
    if (!formatGroups[img.extension]) {
      formatGroups[img.extension] = [];
    }
    formatGroups[img.extension].push(img);
  });
  
  Object.entries(formatGroups).forEach(([format, imgs]) => {
    console.log(`   ${format.toUpperCase()}: ${imgs.length} fichier(s) - ${OPTIMAL_FORMATS[format]}`);
  });
  console.log('');
  
  // Recommandations d'optimisation
  console.log('🔧 ACTIONS RECOMMANDÉES');
  console.log('');
  
  console.log('1. 🏃‍♂️ ACTIONS IMMÉDIATES');
  if (tooLargeImages.length > 0) {
    console.log('   • Compresser les images > 500KB');
    console.log('   • Utiliser des outils comme TinyPNG, Squoosh, ou ImageOptim');
  }
  console.log('   • Next.js optimise maintenant automatiquement les images');
  console.log('   • Vérifier que sizes= est bien défini sur chaque <Image>');
  console.log('');
  
  console.log('2. 📈 OPTIMISATIONS AVANCÉES');
  console.log('   • Convertir JPG/PNG en WebP/AVIF pour les navigateurs modernes');
  console.log('   • Implémenter le lazy loading (déjà fait avec Next.js)');
  console.log('   • Utiliser blur placeholder pour éviter CLS');
  console.log('   • Définir width/height ou aspect-ratio sur tous les <Image>');
  console.log('');
  
  console.log('3. 🎨 CONVERSION DE FORMATS');
  nonOptimalImages.forEach(img => {
    if (img.size > LARGE_FILE_SIZE) {
      console.log(`   • ${img.path} → Convertir en WebP/AVIF`);
    }
  });
  console.log('');
  
  console.log('4. 🔍 COMMANDES UTILES');
  console.log('   • Convertir en WebP: npx @squoosh/cli --webp {}');
  console.log('   • Convertir en AVIF: npx @squoosh/cli --avif {}');
  console.log('   • Optimiser PNG: npx imagemin-cli "**/*.png" --plugin=pngquant');
  console.log('   • Optimiser JPG: npx imagemin-cli "**/*.jpg" --plugin=mozjpeg');
  console.log('');
  
  console.log('═'.repeat(60));
  console.log('✨ Next.js optimise automatiquement les images maintenant !');
  console.log('   Les formats WebP/AVIF sont servis automatiquement');
  console.log('   Le cache est configuré pour 1 an');
  console.log('   Les tailles responsives sont gérées par deviceSizes');
}

// Exécution du script
try {
  console.log('🔍 Analyse des images en cours...');
  const images = analyzeImages(IMAGES_DIR);
  generateReport(images);
} catch (error) {
  console.error('❌ Erreur lors de l\'analyse:', error.message);
  process.exit(1);
}







