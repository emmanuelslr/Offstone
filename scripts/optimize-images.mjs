#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration des optimisations
const imageOptimizations = {
  // Formats supportés
  supportedFormats: ['.jpg', '.jpeg', '.png', '.webp', '.avif'],
  
  // Tailles optimisées
  sizes: [
    { width: 320, suffix: '-sm' },
    { width: 640, suffix: '-md' },
    { width: 1024, suffix: '-lg' },
    { width: 1920, suffix: '-xl' },
  ],
  
  // Qualité de compression
  quality: {
    webp: 85,
    avif: 80,
    jpeg: 90,
    png: 95,
  }
};

// Fonction pour optimiser une image
async function optimizeImage(inputPath, outputPath, options = {}) {
  try {
    const sharp = await import('sharp');
    
    const {
      width,
      height,
      format = 'webp',
      quality = imageOptimizations.quality[format] || 85
    } = options;

    let pipeline = sharp.default(inputPath);

    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    switch (format) {
      case 'webp':
        pipeline = pipeline.webp({ quality });
        break;
      case 'avif':
        pipeline = pipeline.avif({ quality });
        break;
      case 'jpeg':
        pipeline = pipeline.jpeg({ quality });
        break;
      case 'png':
        pipeline = pipeline.png({ quality });
        break;
    }

    await pipeline.toFile(outputPath);
    console.log(`✅ Optimisé: ${inputPath} -> ${outputPath}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Erreur lors de l'optimisation de ${inputPath}:`, error.message);
    return false;
  }
}

// Fonction pour scanner et optimiser les images
async function scanAndOptimizeImages(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      // Récursion pour les sous-dossiers
      await scanAndOptimizeImages(fullPath);
    } else if (file.isFile()) {
      const ext = path.extname(file.name).toLowerCase();
      
      if (imageOptimizations.supportedFormats.includes(ext)) {
        const baseName = path.basename(file.name, ext);
        const dirName = path.dirname(fullPath);
        
        // Créer le dossier d'optimisation s'il n'existe pas
        const optimizedDir = path.join(dirName, 'optimized');
        if (!fs.existsSync(optimizedDir)) {
          fs.mkdirSync(optimizedDir, { recursive: true });
        }
        
        // Optimiser en WebP
        const webpPath = path.join(optimizedDir, `${baseName}.webp`);
        await optimizeImage(fullPath, webpPath, { format: 'webp' });
        
        // Optimiser en AVIF (format le plus moderne)
        const avifPath = path.join(optimizedDir, `${baseName}.avif`);
        await optimizeImage(fullPath, avifPath, { format: 'avif' });
        
        // Créer des versions responsive
        for (const size of imageOptimizations.sizes) {
          const responsiveWebpPath = path.join(optimizedDir, `${baseName}${size.suffix}.webp`);
          await optimizeImage(fullPath, responsiveWebpPath, {
            width: size.width,
            format: 'webp'
          });
          
          const responsiveAvifPath = path.join(optimizedDir, `${baseName}${size.suffix}.avif`);
          await optimizeImage(fullPath, responsiveAvifPath, {
            width: size.width,
            format: 'avif'
          });
        }
      }
    }
  }
}

// Fonction principale
async function main() {
  console.log('🚀 Début de l\'optimisation des images...');
  
  const publicDir = path.join(__dirname, '..', 'public');
  const imagesDir = path.join(publicDir, 'images');
  
  if (!fs.existsSync(imagesDir)) {
    console.error('❌ Le dossier images n\'existe pas:', imagesDir);
    process.exit(1);
  }
  
  try {
    await scanAndOptimizeImages(imagesDir);
    console.log('✅ Optimisation des images terminée !');
    
    // Générer un rapport
    const reportPath = path.join(publicDir, 'image-optimization-report.txt');
    const report = `Rapport d'optimisation des images
Généré le: ${new Date().toISOString()}

Formats générés:
- WebP (qualité 85%)
- AVIF (qualité 80%)
- Versions responsive (320px, 640px, 1024px, 1920px)

Dossiers optimisés:
- ${imagesDir}

Instructions d'utilisation:
1. Utilisez les images optimisées dans le dossier 'optimized'
2. Privilégiez AVIF pour les navigateurs modernes
3. Utilisez WebP comme fallback
4. Implémentez le lazy loading pour les images non critiques
`;
    
    fs.writeFileSync(reportPath, report);
    console.log(`📊 Rapport généré: ${reportPath}`);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation:', error);
    process.exit(1);
  }
}

// Vérifier si Sharp est installé
try {
  await import('sharp');
  main();
} catch (error) {
  console.error('❌ Sharp n\'est pas installé. Installez-le avec: npm install sharp');
  process.exit(1);
}
