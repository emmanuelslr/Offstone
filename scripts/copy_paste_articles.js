const fs = require('fs');
const path = require('path');

// Configuration
const NDJSON_FILE = path.join(__dirname, '..', 'public', 'data', 'resource_articles.ndjson');

function createCopyPasteInstructions() {
  try {
    console.log('🚀 Creating copy-paste instructions for manual import...');
    
    // Lire le fichier NDJSON
    const fileContent = fs.readFileSync(NDJSON_FILE, 'utf-8');
    const lines = fileContent.trim().split('\n');
    
    console.log(`📄 Found ${lines.length} articles to import manually`);
    
    // Créer un fichier avec les instructions de copier-coller
    const instructionsFile = path.join(__dirname, '..', 'COPY_PASTE_INSTRUCTIONS.txt');
    
    let instructions = `INSTRUCTIONS POUR IMPORT MANUEL DANS PRISMIC
=============================================

1. Allez dans votre interface Prismic "Ressources (blog)"
2. Cliquez sur "+ Create a new page"
3. Sélectionnez "Resource Article"
4. Copiez-collez le contenu ci-dessous pour chaque article

`;

    lines.forEach((line, index) => {
      if (line.trim()) {
        const article = JSON.parse(line);
        instructions += `\n\nARTICLE ${index + 1}: ${article.data.title}
${'='.repeat(50)}

TITRE: ${article.data.title}
EXCERPT: ${article.data.excerpt}
UID: ${article.uid}
LANGUE: ${article.lang}
CLASSE D'ACTIF: ${article.data.asset_class}
THÈME: ${article.data.theme}
NIVEAU: ${article.data.level}
TEMPS DE LECTURE: ${article.data.reading_time} min
CATÉGORIE: ${article.data.category}
DATE DE PUBLICATION: ${article.data.published_at}

CONTENU STRUCTURÉ:
${JSON.stringify(article.data.body, null, 2)}

FAQ:
${JSON.stringify(article.data.faq_items, null, 2)}

AUTEURS:
${JSON.stringify(article.data.authors, null, 2)}

SEO:
${JSON.stringify(article.data.seo, null, 2)}

IMAGE HERO:
${JSON.stringify(article.data.hero_image, null, 2)}

`;
      }
    });

    instructions += `\n\nÉTAPES D'IMPORT:
1. Pour chaque article, créez un nouveau "Resource Article"
2. Copiez-collez les données ci-dessus
3. Sauvegardez et publiez
4. Répétez pour les 4 articles

TOTAL: 4 articles à importer manuellement
`;

    fs.writeFileSync(instructionsFile, instructions);
    
    console.log('✅ Instructions créées dans COPY_PASTE_INSTRUCTIONS.txt');
    console.log('\n📋 Articles à importer manuellement:');
    
    lines.forEach((line, index) => {
      if (line.trim()) {
        const article = JSON.parse(line);
        console.log(`${index + 1}. ${article.data.title} (${article.uid})`);
      }
    });
    
    console.log('\n🎯 Prochaines étapes:');
    console.log('1. Ouvrez COPY_PASTE_INSTRUCTIONS.txt');
    console.log('2. Allez dans Prismic "Ressources (blog)"');
    console.log('3. Créez 4 nouveaux "Resource Article"');
    console.log('4. Copiez-collez le contenu de chaque article');
    
    return true;
    
  } catch (error) {
    console.error('❌ Error creating instructions:', error);
    return false;
  }
}

createCopyPasteInstructions();

