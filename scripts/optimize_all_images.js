#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Fonction pour optimiser un fichier
function optimizeFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Remplacer les balises img par Image de Next.js
    const imgRegex = /<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)>/g;
    
    content = content.replace(imgRegex, (match, beforeSrc, src, afterSrc) => {
      // Vérifier si c'est déjà un composant Image
      if (content.includes('import Image from "next/image"') || content.includes("import Image from 'next/image'")) {
        // Remplacer par le composant Image optimisé
        const altMatch = afterSrc.match(/alt=["']([^"']*)["']/);
        const alt = altMatch ? altMatch[1] : '';
        const classNameMatch = (beforeSrc + afterSrc).match(/className=["']([^"']*)["']/);
        const className = classNameMatch ? classNameMatch[1] : '';
        
        modified = true;
        return `<Image
                src="${src}"
                alt="${alt}"
                fill
                className="${className}"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />`;
      }
      return match;
    });

    // Ajouter l'import Image si nécessaire
    if (modified && !content.includes('import Image from "next/image"') && !content.includes("import Image from 'next/image'")) {
      const importMatch = content.match(/import\s+.*?from\s+["']react["']/);
      if (importMatch) {
        content = content.replace(importMatch[0], importMatch[0] + '\nimport Image from "next/image";');
      } else {
        // Ajouter en haut du fichier
        content = 'import Image from "next/image";\n' + content;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Optimisé: ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Erreur avec ${filePath}:`, error.message);
  }
  return false;
}

// Fonction récursive pour parcourir les dossiers
function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      walkDir(filePath, callback);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      callback(filePath);
    }
  }
}

// Optimiser tous les fichiers
console.log('🚀 Optimisation des images en cours...\n');

let totalOptimized = 0;
walkDir('./src', (filePath) => {
  if (optimizeFile(filePath)) {
    totalOptimized++;
  }
});

console.log(`\n✨ Optimisation terminée ! ${totalOptimized} fichiers optimisés.`);
