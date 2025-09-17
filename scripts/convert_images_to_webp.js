#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Vérifier si ImageMagick est installé
function checkImageMagick() {
  try {
    execSync('magick -version', { stdio: 'ignore' });
    return true;
  } catch {
    try {
      execSync('convert -version', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }
}

// Convertir une image en WebP
function convertToWebP(inputPath, outputPath, quality = 85) {
  try {
    const command = `magick "${inputPath}" -quality ${quality} -define webp:lossless=false "${outputPath}"`;
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch {
    try {
      const command = `convert "${inputPath}" -quality ${quality} -define webp:lossless=false "${outputPath}"`;
      execSync(command, { stdio: 'ignore' });
      return true;
    } catch (error) {
      console.error(`❌ Erreur conversion ${inputPath}:`, error.message);
      return false;
    }
  }
}

// Parcourir récursivement les dossiers d'images
function processImages(dir) {
  const files = fs.readdirSync(dir);
  let converted = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const result = processImages(filePath);
      converted += result.converted;
      skipped += result.skipped;
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      // Vérifier si le WebP existe déjà
      if (fs.existsSync(webpPath)) {
        console.log(`⏭️  WebP existe déjà: ${file}`);
        skipped++;
        continue;
      }

      console.log(`🔄 Conversion: ${file} → ${path.basename(webpPath)}`);
      
      if (convertToWebP(filePath, webpPath)) {
        console.log(`✅ Converti: ${file}`);
        converted++;
      } else {
        skipped++;
      }
    }
  }

  return { converted, skipped };
}

// Script principal
console.log('🚀 Conversion des images en WebP...\n');

if (!checkImageMagick()) {
  console.log('❌ ImageMagick n\'est pas installé.');
  console.log('📥 Installez-le avec:');
  console.log('   - Windows: choco install imagemagick');
  console.log('   - macOS: brew install imagemagick');
  console.log('   - Ubuntu: sudo apt-get install imagemagick');
  process.exit(1);
}

const imagesDir = './public/images';
if (!fs.existsSync(imagesDir)) {
  console.log('❌ Dossier images non trouvé:', imagesDir);
  process.exit(1);
}

const result = processImages(imagesDir);

console.log(`\n✨ Conversion terminée !`);
console.log(`✅ ${result.converted} images converties`);
console.log(`⏭️  ${result.skipped} images ignorées`);
console.log('\n💡 Les images WebP sont automatiquement utilisées par Next.js !');
