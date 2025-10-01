import fs from 'node:fs/promises';
import path from 'node:path';

// Configuration
const IMAGES_DIR = 'public/images';
const BACKUP_DIR = 'public/images-backup';

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
      } else {
        yield fullPath;
      }
    }
  } catch (error) {
    console.error(`${colors.red}Erreur lors de la lecture du dossier ${dir}:${colors.reset}`, error.message);
  }
}

/**
 * Sauvegarde un fichier
 */
async function backupFile(filePath) {
  const relativePath = path.relative(IMAGES_DIR, filePath);
  const backupPath = path.join(BACKUP_DIR, relativePath);
  const backupDir = path.dirname(backupPath);
  
  await fs.mkdir(backupDir, { recursive: true });
  await fs.copyFile(filePath, backupPath);
  return backupPath;
}

/**
 * Fonction principale
 */
async function main() {
  console.log(`${colors.bright}${colors.blue}💾 SAUVEGARDE DES IMAGES ORIGINALES${colors.reset}\n`);
  
  try {
    // Vérifier que le dossier images existe
    await fs.access(IMAGES_DIR);
    
    // Créer le dossier de sauvegarde
    await fs.mkdir(BACKUP_DIR, { recursive: true });
    
    let count = 0;
    
    // Sauvegarder tous les fichiers
    for await (const filePath of walkDirectory(IMAGES_DIR)) {
      const backupPath = await backupFile(filePath);
      console.log(`${colors.green}✅ Sauvegardé:${colors.reset} ${path.relative(IMAGES_DIR, filePath)} → ${path.relative(process.cwd(), backupPath)}`);
      count++;
    }
    
    console.log(`\n${colors.cyan}📊 ${count} fichiers sauvegardés dans ${BACKUP_DIR}${colors.reset}\n`);
    
  } catch (error) {
    console.error(`${colors.red}💥 Erreur:${colors.reset}`, error.message);
    process.exit(1);
  }
}

// Lancer la sauvegarde
main().catch(console.error);
