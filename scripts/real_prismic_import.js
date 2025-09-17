const fs = require('fs');
const path = require('path');

// Configuration
const NDJSON_FILE = path.join(__dirname, '..', 'public', 'data', 'resource_articles.ndjson');

async function realPrismicImport() {
  try {
    console.log('🚀 REAL Prismic import starting...');
    
    // Lire le fichier NDJSON
    const fileContent = fs.readFileSync(NDJSON_FILE, 'utf-8');
    const lines = fileContent.trim().split('\n');
    
    console.log(`📄 Found ${lines.length} articles to import`);
    
    // Pour chaque article, faire un vrai import
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;
      
      const articleData = JSON.parse(line);
      console.log(`\n📝 Importing article ${i + 1}/${lines.length}: ${articleData.uid}`);
      
      // Utiliser l'API Prismic réelle
      const success = await importToPrismic(articleData);
      
      if (success) {
        console.log(`✅ Successfully imported: ${articleData.data.title}`);
      } else {
        console.log(`❌ Failed to import: ${articleData.data.title}`);
      }
    }
    
    console.log('\n🎉 REAL IMPORT COMPLETED!');
    console.log('✅ Check your Prismic "Ressources (blog)" space now');
    
  } catch (error) {
    console.error('❌ Real import failed:', error);
  }
}

async function importToPrismic(articleData) {
  try {
    // Utiliser l'API Prismic réelle
    const prismicApiUrl = 'https://offstone.prismic.io/api/v2/documents';
    
    // Préparer les données pour l'API Prismic
    const prismicData = {
      type: articleData.type,
      lang: articleData.lang,
      uid: articleData.uid,
      data: articleData.data
    };
    
    // Faire la requête vers l'API Prismic
    const response = await fetch(prismicApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Prismic-Import-Script/1.0'
      },
      body: JSON.stringify(prismicData)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ API Response: ${response.status} - ${result.uid || 'Success'}`);
      return true;
    } else {
      console.log(`⚠️  API Response: ${response.status} - ${response.statusText}`);
      
      // Essayer une méthode alternative
      return await alternativeImport(articleData);
    }
    
  } catch (error) {
    console.log(`📤 API Error: ${error.message}, trying alternative...`);
    return await alternativeImport(articleData);
  }
}

async function alternativeImport(articleData) {
  try {
    // Méthode alternative : utiliser l'API Prismic avec une approche différente
    const alternativeUrl = 'https://offstone.prismic.io/api/v2/documents';
    
    // Préparer les données différemment
    const altData = {
      type: articleData.type,
      lang: articleData.lang,
      uid: articleData.uid,
      data: articleData.data,
      first_publication_date: new Date().toISOString(),
      last_publication_date: new Date().toISOString()
    };
    
    const response = await fetch(alternativeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(altData)
    });
    
    if (response.ok) {
      console.log(`✅ Alternative import successful: ${response.status}`);
      return true;
    } else {
      console.log(`❌ Alternative import failed: ${response.status}`);
      return false;
    }
    
  } catch (error) {
    console.log(`❌ Alternative import error: ${error.message}`);
    return false;
  }
}

// Exécuter l'import réel
realPrismicImport();

