import * as fs from 'node:fs';
import * as path from 'node:path';

function checkCurrentPortfolioImages() {
  const ndjsonPath = path.join(process.cwd(), 'public/data/case_studies.ndjson');
  
  try {
    const rawData = fs.readFileSync(ndjsonPath, 'utf8');
    const caseStudies = rawData.split('\n').filter(Boolean).map(JSON.parse);
    
    // Chercher Maison Iéna et Jules Guesde
    const targetStudies = caseStudies.filter(cs => 
      cs.uid === 'maison-iena' || cs.uid === 'jules-guesde'
    );
    
    for (const study of targetStudies) {
      console.log(`\n=== ${study.title.toUpperCase()} ===`);
      console.log(`UID: ${study.uid}`);
      console.log(`Source URL: ${study.source_url}`);
      
      if (study.portfolioImages && study.portfolioImages.length > 0) {
        console.log(`\nPortfolio Images (${study.portfolioImages.length}):`);
        study.portfolioImages.forEach((img: any, index: number) => {
          console.log(`  ${index + 1}. ${img.url}`);
          console.log(`     Alt: ${img.alt}`);
        });
      } else {
        console.log('\n❌ Aucune image de portefeuille trouvée');
      }
    }
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}

checkCurrentPortfolioImages();
