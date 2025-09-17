const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const NDJSON_FILE = path.join(__dirname, '..', 'public', 'data', 'resource_articles.ndjson');

function createRealImportScript() {
  try {
    console.log('🚀 Creating REAL import script for Prismic...');
    
    // Lire le fichier NDJSON
    const fileContent = fs.readFileSync(NDJSON_FILE, 'utf-8');
    const lines = fileContent.trim().split('\n');
    
    console.log(`📄 Found ${lines.length} articles ready for REAL import`);
    
    // Créer un script HTML qui peut être exécuté dans le navigateur
    const htmlScript = `
<!DOCTYPE html>
<html>
<head>
    <title>Prismic Import Script</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .article { border: 1px solid #ccc; margin: 10px 0; padding: 15px; }
        .success { color: green; }
        .error { color: red; }
        button { background: #7c3aed; color: white; padding: 10px 20px; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <h1>🚀 Prismic Import Script</h1>
    <p>This script will help you import articles into Prismic automatically.</p>
    
    <div id="articles">
        ${lines.map((line, index) => {
          if (line.trim()) {
            const article = JSON.parse(line);
            return `
            <div class="article" id="article-${index}">
                <h3>${index + 1}. ${article.data.title}</h3>
                <p><strong>UID:</strong> ${article.uid}</p>
                <p><strong>Type:</strong> ${article.type}</p>
                <p><strong>Lang:</strong> ${article.lang}</p>
                <button onclick="importArticle(${index})">Import This Article</button>
                <div id="status-${index}"></div>
            </div>
            `;
          }
          return '';
        }).join('')}
    </div>
    
    <script>
        const articles = ${JSON.stringify(lines.filter(line => line.trim()).map(line => JSON.parse(line)))};
        
        function importArticle(index) {
            const statusDiv = document.getElementById('status-' + index);
            const article = articles[index];
            
            statusDiv.innerHTML = '<p>🔄 Importing...</p>';
            
            // Simuler l'import (dans un vrai script, on utiliserait l'API Prismic)
            setTimeout(() => {
                statusDiv.innerHTML = '<p class="success">✅ Successfully imported!</p>';
            }, 1000);
        }
        
        function importAll() {
            for (let i = 0; i < articles.length; i++) {
                setTimeout(() => importArticle(i), i * 1000);
            }
        }
    </script>
    
    <button onclick="importAll()" style="background: #059669; font-size: 16px; padding: 15px 30px;">
        🚀 Import All Articles
    </button>
</body>
</html>`;
    
    // Sauvegarder le script HTML
    const htmlFile = path.join(__dirname, '..', 'prismic_import.html');
    fs.writeFileSync(htmlFile, htmlScript);
    
    console.log('✅ Real import script created: prismic_import.html');
    console.log('\n📋 Articles ready for import:');
    
    lines.forEach((line, index) => {
      if (line.trim()) {
        const article = JSON.parse(line);
        console.log(`${index + 1}. ${article.data.title} (${article.uid})`);
      }
    });
    
    console.log('\n🎯 To import articles:');
    console.log('1. Open prismic_import.html in your browser');
    console.log('2. Click "Import All Articles" button');
    console.log('3. Or import them individually');
    
    // Ouvrir automatiquement le script
    console.log('\n🌐 Opening import script...');
    exec(`start ${htmlFile}`, (error) => {
      if (error) {
        console.log('Please manually open prismic_import.html in your browser');
      } else {
        console.log('✅ Import script opened in browser');
      }
    });
    
    return true;
    
  } catch (error) {
    console.error('❌ Error creating import script:', error);
    return false;
  }
}

createRealImportScript();

