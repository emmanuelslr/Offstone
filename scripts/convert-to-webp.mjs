import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Configuration
const IMAGES_DIR = '.'; // Tout le repo
const BACKUP_DIR = 'images-backup';
const SUPPORTED_FORMATS = new Set(['.jpg', '.jpeg', '.png', '.tiff', '.bmp']);
const WEBP_QUALITY = 85; // Qualité optimale pour WebP
const MAX_CONCURRENT = 5; // Limite de conversions simultanées
const EXCLUDE_PATHS = [
  'node_modules',
  '.next',
  'images-backup',
  'offstone/node_modules'
];

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Statistiques
let stats = {
  total: 0,
  converted: 0,
  skipped: 0,
  errors: 0,
  savedBytes: 0
};

/**
 * Vérifie si un chemin doit être exclu
 */
function shouldExcludePath(filePath) {
  return EXCLUDE_PATHS.some(excludePath => filePath.includes(excludePath));
}

/**
 * Parcourt récursivement un dossier et retourne tous les fichiers
 */
async function* walkDirectory(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      // Exclure les dossiers spécifiés
      if (entry.isDirectory() && !shouldExcludePath(fullPath)) {
        yield* walkDirectory(fullPath);
      } else if (entry.isFile()) {
        yield fullPath;
      }
    }
  } catch (error) {
    console.error(`${colors.red}Erreur lors de la lecture du dossier ${dir}:${colors.reset}`, error.message);
  }
}

/**
 * Vérifie si un fichier doit être converti
 */
function shouldConvert(filePath) {
  // Exclure les fichiers dans les dossiers interdits
  if (shouldExcludePath(filePath)) {
    return false;
  }
  
  const ext = path.extname(filePath).toLowerCase();
  return SUPPORTED_FORMATS.has(ext);
}

/**
 * Sauvegarde un fichier original
 */
async function backupFile(filePath) {
  const relativePath = path.relative('.', filePath);
  const backupPath = path.join(BACKUP_DIR, relativePath);
  const backupDir = path.dirname(backupPath);
  
  await fs.mkdir(backupDir, { recursive: true });
  await fs.copyFile(filePath, backupPath);
}

/**
 * Convertit une image en WebP
 */
async function convertToWebP(filePath) {
  const startTime = Date.now();
  const originalSize = (await fs.stat(filePath)).size;
  
  try {
    // Chemin de sortie WebP
    const webpPath = filePath.replace(/\.[^.]+$/, '.webp');
    
    // Vérifier si le fichier WebP existe déjà
    try {
      await fs.access(webpPath);
      console.log(`${colors.yellow}⚠️  WebP existe déjà:${colors.reset} ${path.relative(IMAGES_DIR, webpPath)}`);
      stats.skipped++;
      return;
    } catch {
      // Le fichier n'existe pas, on peut continuer
    }
    
    // Sauvegarder l'original
    await backupFile(filePath);
    
    // Convertir avec Sharp
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Optimiser selon le type d'image
    let webpOptions = {
      quality: WEBP_QUALITY,
      effort: 6, // Effort de compression (0-6)
    };
    
    // Ajuster la qualité selon la taille
    if (metadata.width > 2000 || metadata.height > 2000) {
      webpOptions.quality = 80; // Qualité légèrement réduite pour les grandes images
    }
    
    // Convertir
    await image.webp(webpOptions).toFile(webpPath);
    
    // Calculer les statistiques
    const newSize = (await fs.stat(webpPath)).size;
    const savedBytes = originalSize - newSize;
    const compressionRatio = ((savedBytes / originalSize) * 100).toFixed(1);
    const duration = Date.now() - startTime;
    
    // Supprimer l'original si la conversion est réussie
    await fs.unlink(filePath);
    
    stats.converted++;
    stats.savedBytes += savedBytes;
    
    console.log(`${colors.green}✅ Converti:${colors.reset} ${path.relative('.', filePath)}`);
    console.log(`   ${colors.cyan}→${colors.reset} ${path.relative('.', webpPath)}`);
    console.log(`   ${colors.blue}Taille:${colors.reset} ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${compressionRatio}% économisé)`);
    console.log(`   ${colors.magenta}Durée:${colors.reset} ${duration}ms`);
    console.log(`   ${colors.yellow}🗑️  Original supprimé${colors.reset}\n`);
    
  } catch (error) {
    console.error(`${colors.red}❌ Erreur lors de la conversion de ${filePath}:${colors.reset}`, error.message);
    stats.errors++;
  }
}

/**
 * Formate les bytes en unités lisibles
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Traite les fichiers par lots pour éviter la surcharge
 */
async function processBatch(files, batchSize = MAX_CONCURRENT) {
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    await Promise.all(batch.map(convertToWebP));
  }
}

/**
 * Affiche les statistiques finales
 */
function displayStats() {
  console.log('\n' + '='.repeat(60));
  console.log(`${colors.bright}${colors.cyan}📊 STATISTIQUES DE CONVERSION${colors.reset}`);
  console.log('='.repeat(60));
  console.log(`${colors.green}✅ Images converties:${colors.reset} ${stats.converted}`);
  console.log(`${colors.yellow}⚠️  Images ignorées:${colors.reset} ${stats.skipped}`);
  console.log(`${colors.red}❌ Erreurs:${colors.reset} ${stats.errors}`);
  console.log(`${colors.blue}📁 Total traité:${colors.reset} ${stats.total}`);
  console.log(`${colors.magenta}💾 Espace économisé:${colors.reset} ${formatBytes(stats.savedBytes)}`);
  
  if (stats.converted > 0) {
    const avgSavings = (stats.savedBytes / stats.converted);
    console.log(`${colors.cyan}📈 Économie moyenne par image:${colors.reset} ${formatBytes(avgSavings)}`);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`${colors.green}🎉 Conversion terminée !${colors.reset}`);
  console.log(`${colors.yellow}💡 Les originaux sont sauvegardés dans: ${BACKUP_DIR}${colors.reset}`);
  console.log('='.repeat(60) + '\n');
}

/**
 * Fonction principale
 */
async function main() {
  console.log(`${colors.bright}${colors.blue}🚀 DÉMARRAGE DE LA CONVERSION WEBP${colors.reset}\n`);
  
  try {
    // Créer le dossier de sauvegarde
    await fs.mkdir(BACKUP_DIR, { recursive: true });
    
    // Collecter tous les fichiers à convertir
    console.log(`${colors.cyan}🔍 Recherche des images à convertir dans tout le repo...${colors.reset}\n`);
    const filesToConvert = [];
    
    for await (const filePath of walkDirectory('.')) {
      if (shouldConvert(filePath)) {
        filesToConvert.push(filePath);
        stats.total++;
      }
    }
    
    if (filesToConvert.length === 0) {
      console.log(`${colors.yellow}⚠️  Aucune image à convertir trouvée.${colors.reset}`);
      return;
    }
    
    console.log(`${colors.green}📋 ${filesToConvert.length} images trouvées à convertir${colors.reset}\n`);
    
    // Convertir par lots
    await processBatch(filesToConvert);
    
    // Afficher les statistiques
    displayStats();
    
  } catch (error) {
    console.error(`${colors.red}💥 Erreur fatale:${colors.reset}`, error.message);
    process.exit(1);
  }
}

// Gestion des signaux d'interruption
process.on('SIGINT', () => {
  console.log(`\n${colors.yellow}⚠️  Conversion interrompue par l'utilisateur${colors.reset}`);
  displayStats();
  process.exit(0);
});

// Lancer la conversion
main().catch(console.error);
