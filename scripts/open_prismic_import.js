const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const NDJSON_FILE = path.join(__dirname, '..', 'public', 'data', 'resource_articles.ndjson');

function openPrismicImport() {
  try {
    console.log('🚀 Opening Prismic for manual import...');
    
    // Lire le fichier NDJSON
    const fileContent = fs.readFileSync(NDJSON_FILE, 'utf-8');
    const lines = fileContent.trim().split('\n');
    
    console.log(`📄 Found ${lines.length} articles ready for import`);
    
    // Créer un fichier avec les données exactes à copier
    const importDataFile = path.join(__dirname, '..', 'PRISMIC_IMPORT_DATA.txt');
    
    let importData = `DONNÉES POUR IMPORT DANS PRISMIC
===============================

IMPORTEZ CES 4 ARTICLES DANS VOTRE ESPACE "Ressources (blog)":

`;

    lines.forEach((line, index) => {
      if (line.trim()) {
        const article = JSON.parse(line);
        importData += `\n\nARTICLE ${index + 1}: ${article.data.title}
${'='.repeat(60)}

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

CONTENU STRUCTURÉ (copiez-collez tel quel):
${JSON.stringify(article.data.body, null, 2)}

FAQ (copiez-collez tel quel):
${JSON.stringify(article.data.faq_items, null, 2)}

AUTEURS (copiez-collez tel quel):
${JSON.stringify(article.data.authors, null, 2)}

SEO (copiez-collez tel quel):
${JSON.stringify(article.data.seo, null, 2)}

IMAGE HERO (copiez-collez tel quel):
${JSON.stringify(article.data.hero_image, null, 2)}

`;
      }
    });

    importData += `\n\nÉTAPES D'IMPORT:
1. Allez sur https://offstone.prismic.io
2. Connectez-vous à votre compte
3. Allez dans l'espace "Ressources (blog)"
4. Cliquez sur "+ Create a new page"
5. Sélectionnez "Resource Article"
6. Copiez-collez les données ci-dessus pour chaque article
7. Sauvegardez et publiez
8. Répétez pour les 4 articles

TOTAL: 4 articles à importer
STATUT: Prêt pour import manuel
`;

    fs.writeFileSync(importDataFile, importData);
    
    console.log('✅ Données d\'import créées dans PRISMIC_IMPORT_DATA.txt');
    console.log('\n📋 Articles prêts pour import:');
    
    lines.forEach((line, index) => {
      if (line.trim()) {
        const article = JSON.parse(line);
        console.log(`${index + 1}. ${article.data.title} (${article.uid})`);
      }
    });
    
    // Ouvrir Prismic et le fichier de données
    console.log('\n🌐 Opening Prismic interface...');
    exec('start https://offstone.prismic.io', (error) => {
      if (error) {
        console.log('Please manually open https://offstone.prismic.io');
      } else {
        console.log('✅ Prismic interface opened');
      }
    });
    
    console.log('\n📄 Opening import data file...');
    exec(`start ${importDataFile}`, (error) => {
      if (error) {
        console.log('Please manually open PRISMIC_IMPORT_DATA.txt');
      } else {
        console.log('✅ Import data file opened');
      }
    });
    
    console.log('\n🎯 INSTRUCTIONS:');
    console.log('1. Prismic est ouvert dans votre navigateur');
    console.log('2. PRISMIC_IMPORT_DATA.txt est ouvert avec toutes les données');
    console.log('3. Allez dans "Ressources (blog)" dans Prismic');
    console.log('4. Créez 4 nouveaux "Resource Article"');
    console.log('5. Copiez-collez le contenu de chaque article');
    
    return true;
    
  } catch (error) {
    console.error('❌ Error:', error);
    return false;
  }
}

openPrismicImport();

