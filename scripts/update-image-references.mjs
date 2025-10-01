import fs from 'node:fs/promises';
import path from 'node:path';

// Configuration
const SRC_DIR = 'src';
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.tiff', '.bmp'];
const WEBP_EXTENSION = '.webp';

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Statistiques
let stats = {
  filesProcessed: 0,
  referencesUpdated: 0,
  errors: 0
};

/**
 * Parcourt récursivement un dossier et retourne tous les fichiers
 */
async function* walkDirectory(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        yield* walkDirectory(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
        yield fullPath;
      }
    }
  } catch (error) {
    console.error(`${colors.red}Erreur lors de la lecture du dossier ${dir}:${colors.reset}`, error.message);
  }
}

/**
 * Met à jour les références d'images dans un fichier
 */
async function updateImageReferences(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    let updatedContent = content;
    let fileUpdates = 0;
    
    // Patterns pour détecter les références d'images
    const patterns = [
      // URLs dans les chaînes
      /(['"`])([^'"`]*\/images\/[^'"`]*\.(jpg|jpeg|png|tiff|bmp))(['"`])/gi,
      // URLs dans les styles
      /url\(['"]?([^'"`]*\/images\/[^'"`]*\.(jpg|jpeg|png|tiff|bmp))['"]?\)/gi,
      // URLs dans les imports
      /import.*from\s+['"`]([^'"`]*\.(jpg|jpeg|png|tiff|bmp))['"`]/gi,
      // URLs dans les require
      /require\(['"`]([^'"`]*\.(jpg|jpeg|png|tiff|bmp))['"`]\)/gi
    ];
    
    patterns.forEach((pattern, index) => {
      updatedContent = updatedContent.replace(pattern, (match, ...groups) => {
        if (index === 0) {
          // Pattern pour les chaînes
          const [quote1, imagePath, extension, quote2] = groups;
          const webpPath = imagePath.replace(/\.(jpg|jpeg|png|tiff|bmp)$/i, WEBP_EXTENSION);
          fileUpdates++;
          return `${quote1}${webpPath}${quote2}`;
        } else if (index === 1) {
          // Pattern pour url()
          const [imagePath, extension] = groups;
          const webpPath = imagePath.replace(/\.(jpg|jpeg|png|tiff|bmp)$/i, WEBP_EXTENSION);
          fileUpdates++;
          return `url('${webpPath}')`;
        } else {
          // Patterns pour import/require
          const [imagePath, extension] = groups;
          const webpPath = imagePath.replace(/\.(jpg|jpeg|png|tiff|bmp)$/i, WEBP_EXTENSION);
          fileUpdates++;
          return match.replace(imagePath, webpPath);
        }
      });
    });
    
    // Si des modifications ont été apportées, sauvegarder le fichier
    if (fileUpdates > 0) {
      await fs.writeFile(filePath, updatedContent, 'utf8');
      console.log(`${colors.green}✅ Mis à jour:${colors.reset} ${path.relative('.', filePath)} (${fileUpdates} références)`);
      stats.referencesUpdated += fileUpdates;
    }
    
    stats.filesProcessed++;
    
  } catch (error) {
    console.error(`${colors.red}❌ Erreur lors de la mise à jour de ${filePath}:${colors.reset}`, error.message);
    stats.errors++;
  }
}

/**
 * Affiche les statistiques finales
 */
function displayStats() {
  console.log('\n' + '='.repeat(60));
  console.log(`${colors.bright}${colors.cyan}📊 STATISTIQUES DE MISE À JOUR${colors.reset}`);
  console.log('='.repeat(60));
  console.log(`${colors.green}📁 Fichiers traités:${colors.reset} ${stats.filesProcessed}`);
  console.log(`${colors.blue}🔄 Références mises à jour:${colors.reset} ${stats.referencesUpdated}`);
  console.log(`${colors.red}❌ Erreurs:${colors.reset} ${stats.errors}`);
  console.log('='.repeat(60));
  console.log(`${colors.green}🎉 Mise à jour terminée !${colors.reset}`);
  console.log('='.repeat(60) + '\n');
}

/**
 * Fonction principale
 */
async function main() {
  console.log(`${colors.bright}${colors.blue}🔄 MISE À JOUR DES RÉFÉRENCES D'IMAGES${colors.reset}\n`);
  
  try {
    // Collecter tous les fichiers à traiter
    console.log(`${colors.cyan}🔍 Recherche des fichiers à traiter...${colors.reset}\n`);
    const filesToProcess = [];
    
    for await (const filePath of walkDirectory(SRC_DIR)) {
      filesToProcess.push(filePath);
    }
    
    if (filesToProcess.length === 0) {
      console.log(`${colors.yellow}⚠️  Aucun fichier à traiter trouvé.${colors.reset}`);
      return;
    }
    
    console.log(`${colors.green}📋 ${filesToProcess.length} fichiers trouvés à traiter${colors.reset}\n`);
    
    // Traiter chaque fichier
    for (const filePath of filesToProcess) {
      await updateImageReferences(filePath);
    }
    
    // Afficher les statistiques
    displayStats();
    
  } catch (error) {
    console.error(`${colors.red}💥 Erreur fatale:${colors.reset}`, error.message);
    process.exit(1);
  }
}

// Lancer la mise à jour
main().catch(console.error);
