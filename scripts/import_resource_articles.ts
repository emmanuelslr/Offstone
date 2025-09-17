import { PrismicClient } from '@prismicio/client';
import fs from 'fs';
import path from 'path';

// Configuration Prismic
const PRISMIC_REPOSITORY = 'offstone';
const PRISMIC_ACCESS_TOKEN = process.env.PRISMIC_ACCESS_TOKEN;

if (!PRISMIC_ACCESS_TOKEN) {
  console.error('❌ PRISMIC_ACCESS_TOKEN environment variable is required');
  process.exit(1);
}

// Créer le client Prismic
const client = PrismicClient.create(PRISMIC_REPOSITORY, {
  accessToken: PRISMIC_ACCESS_TOKEN,
});

async function importResourceArticles() {
  try {
    console.log('🚀 Starting import of resource articles...');
    
    // Lire le fichier NDJSON
    const filePath = path.join(process.cwd(), 'public', 'data', 'resource_articles.ndjson');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Parser les lignes JSON
    const lines = fileContent.trim().split('\n');
    console.log(`📄 Found ${lines.length} articles to import`);
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;
      
      try {
        const articleData = JSON.parse(line);
        console.log(`\n📝 Importing article ${i + 1}/${lines.length}: ${articleData.uid}`);
        
        // Créer le document dans Prismic
        const result = await client.create({
          type: articleData.type,
          lang: articleData.lang,
          uid: articleData.uid,
          data: articleData.data,
        });
        
        console.log(`✅ Successfully imported: ${result.uid}`);
        
      } catch (error) {
        console.error(`❌ Error importing article ${i + 1}:`, error);
      }
    }
    
    console.log('\n🎉 Import completed!');
    
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

// Exécuter l'import
importResourceArticles();

