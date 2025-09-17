const fs = require('fs');
const path = require('path');

// Configuration
const NDJSON_FILE = path.join(__dirname, '..', 'public', 'data', 'resource_articles.ndjson');

async function createImportInstructions() {
  try {
    console.log('🚀 Creating comprehensive import instructions...');
    
    // Lire le fichier NDJSON
    const fileContent = fs.readFileSync(NDJSON_FILE, 'utf-8');
    const lines = fileContent.trim().split('\n');
    
    console.log(`📄 Processing ${lines.length} articles...`);
    
    // Créer un fichier d'instructions détaillées
    const instructionsFile = path.join(__dirname, '..', 'IMPORT_INSTRUCTIONS.md');
    
    let instructions = `# Instructions d'import des articles ressources

## Fichiers prêts pour l'import

- **Fichier NDJSON**: \`public/data/resource_articles.ndjson\`
- **Serveur SliceMachine**: http://localhost:9999 (déjà démarré)

## Articles à importer

`;

    lines.forEach((line, index) => {
      if (line.trim()) {
        const article = JSON.parse(line);
        instructions += `### ${index + 1}. ${article.data.title}

- **UID**: \`${article.uid}\`
- **Type**: \`${article.type}\`
- **Langue**: \`${article.lang}\`
- **Classe d'actif**: \`${article.data.asset_class}\`
- **Thème**: \`${article.data.theme}\`
- **Niveau**: \`${article.data.level}\`
- **Temps de lecture**: ${article.data.reading_time} min
- **Catégorie**: \`${article.data.category}\`

`;
      }
    });

    instructions += `## Méthodes d'import

### Option 1: Import via l'interface SliceMachine (Recommandée)

1. Ouvrez http://localhost:9999 dans votre navigateur
2. Naviguez vers la section "Documents"
3. Cliquez sur "Import" ou "Add documents"
4. Sélectionnez le fichier \`public/data/resource_articles.ndjson\`
5. Confirmez l'import

### Option 2: Import manuel

Pour chaque article, créez un nouveau document dans SliceMachine avec les données suivantes:

`;

    lines.forEach((line, index) => {
      if (line.trim()) {
        const article = JSON.parse(line);
        instructions += `#### Article ${index + 1}: ${article.data.title}

\`\`\`json
${JSON.stringify(article, null, 2)}
\`\`\`

`;
      }
    });

    instructions += `## Vérification

Après l'import, vérifiez que tous les articles sont visibles dans l'interface Prismic avec:
- Les bons UIDs
- Le contenu structuré correctement
- Les métadonnées SEO
- Les images hero
- Les FAQ

## Statut

✅ Serveur SliceMachine démarré sur localhost:9999
✅ Fichier NDJSON créé avec 4 articles
✅ Instructions générées
⏳ En attente d'import dans Prismic

`;

    fs.writeFileSync(instructionsFile, instructions);
    
    console.log('✅ Instructions créées dans IMPORT_INSTRUCTIONS.md');
    console.log('\n📋 Résumé des articles prêts:');
    
    lines.forEach((line, index) => {
      if (line.trim()) {
        const article = JSON.parse(line);
        console.log(`${index + 1}. ${article.data.title} (${article.uid})`);
      }
    });
    
    console.log('\n🎯 Actions suivantes:');
    console.log('1. Ouvrez http://localhost:9999 dans votre navigateur');
    console.log('2. Importez le fichier: public/data/resource_articles.ndjson');
    console.log('3. Vérifiez que les 4 articles sont bien importés');
    
    return true;
    
  } catch (error) {
    console.error('❌ Erreur lors de la création des instructions:', error);
    return false;
  }
}

// Exécuter
createImportInstructions();

