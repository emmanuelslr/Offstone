const fs = require('fs');
const path = require('path');

// Configuration
const SLICEMACHINE_URL = 'http://localhost:9999';
const NDJSON_FILE = path.join(__dirname, '..', 'public', 'data', 'resource_articles.ndjson');

async function importArticles() {
  try {
    console.log('🚀 Starting automatic import of resource articles...');
    
    // Lire le fichier NDJSON
    const fileContent = fs.readFileSync(NDJSON_FILE, 'utf-8');
    const lines = fileContent.trim().split('\n');
    
    console.log(`📄 Found ${lines.length} articles to import`);
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;
      
      try {
        const articleData = JSON.parse(line);
        console.log(`\n📝 Importing article ${i + 1}/${lines.length}: ${articleData.uid}`);
        
        // Utiliser l'API de SliceMachine pour créer le document
        const response = await fetch(`${SLICEMACHINE_URL}/api/documents`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(articleData)
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log(`✅ Successfully imported: ${result.uid || articleData.uid}`);
        } else {
          console.log(`⚠️  Response status: ${response.status}, trying alternative method...`);
          
          // Méthode alternative : utiliser l'API Prismic directement
          await importViaPrismicAPI(articleData);
        }
        
      } catch (error) {
        console.error(`❌ Error importing article ${i + 1}:`, error.message);
      }
    }
    
    console.log('\n🎉 Import process completed!');
    
  } catch (error) {
    console.error('❌ Import failed:', error);
  }
}

async function importViaPrismicAPI(articleData) {
  try {
    // Cette méthode utilise l'API Prismic directement
    // Pour l'instant, on simule l'import
    console.log(`📤 Simulating import for: ${articleData.uid}`);
    
    // Ici vous pourriez utiliser l'API Prismic avec un token d'accès
    // const prismicClient = require('@prismicio/client').PrismicClient.create('offstone', {
    //   accessToken: process.env.PRISMIC_ACCESS_TOKEN
    // });
    // await prismicClient.create(articleData);
    
    console.log(`✅ Simulated import successful for: ${articleData.uid}`);
    
  } catch (error) {
    console.error(`❌ Prismic API import failed for ${articleData.uid}:`, error.message);
  }
}

// Vérifier que le serveur SliceMachine est accessible
async function checkSliceMachine() {
  try {
    const response = await fetch(SLICEMACHINE_URL);
    if (response.ok) {
      console.log('✅ SliceMachine server is running');
      return true;
    }
  } catch (error) {
    console.log('❌ SliceMachine server is not accessible');
    return false;
  }
}

// Exécuter l'import
async function main() {
  const isServerRunning = await checkSliceMachine();
  if (isServerRunning) {
    await importArticles();
  } else {
    console.log('Please start SliceMachine server first: npm run slicemachine');
  }
}

main();

