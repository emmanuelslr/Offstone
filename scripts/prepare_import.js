const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const NDJSON_FILE = path.join(__dirname, '..', 'public', 'data', 'resource_articles.ndjson');

function prepareImport() {
  try {
    console.log('🚀 Preparing import data for SliceMachine...');
    
    // Lire le fichier NDJSON
    const fileContent = fs.readFileSync(NDJSON_FILE, 'utf-8');
    const lines = fileContent.trim().split('\n');
    
    console.log(`📄 Found ${lines.length} articles ready for import`);
    
    // Afficher les articles disponibles
    console.log('\n📋 Articles ready for import:');
    lines.forEach((line, index) => {
      if (line.trim()) {
        const article = JSON.parse(line);
        console.log(`${index + 1}. ${article.data.title} (${article.uid})`);
      }
    });
    
    // Créer un fichier de résumé pour l'import
    const summaryFile = path.join(__dirname, '..', 'public', 'data', 'import_summary.txt');
    const summary = lines.map((line, index) => {
      if (line.trim()) {
        const article = JSON.parse(line);
        return `${index + 1}. ${article.data.title}\n   UID: ${article.uid}\n   Type: ${article.type}\n   Lang: ${article.lang}\n`;
      }
      return '';
    }).join('\n');
    
    fs.writeFileSync(summaryFile, `Articles ready for import:\n\n${summary}`);
    
    console.log('\n✅ Import preparation completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Open http://localhost:9999 in your browser');
    console.log('2. Navigate to Documents section');
    console.log('3. Use the import feature to upload: public/data/resource_articles.ndjson');
    console.log('4. Or manually create each document using the data from the summary file');
    
    // Ouvrir automatiquement le navigateur
    console.log('\n🌐 Opening SliceMachine interface...');
    exec('start http://localhost:9999', (error) => {
      if (error) {
        console.log('Please manually open http://localhost:9999 in your browser');
      } else {
        console.log('✅ Browser opened successfully');
      }
    });
    
  } catch (error) {
    console.error('❌ Preparation failed:', error);
  }
}

prepareImport();

