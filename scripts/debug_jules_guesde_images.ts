import { JSDOM } from 'jsdom';

async function debugJulesGuesdeImages() {
  try {
    const url = 'https://aguesseaucapital.com/biens/acquisition-immeuble-bureaux-levallois-perret/';
    console.log(`Analyse des images pour Jules Guesde: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    console.log('\n=== TOUTES LES IMAGES DE LA PAGE ===');
    
    const allImages = document.querySelectorAll('img[src*="wp-content/uploads"]');
    console.log(`Nombre total d'images: ${allImages.length}`);
    
    for (let i = 0; i < allImages.length; i++) {
      const img = allImages[i];
      const src = img.getAttribute('src') || '';
      const alt = img.getAttribute('alt') || '';
      
      console.log(`\nImage ${i + 1}:`);
      console.log(`  URL: ${src}`);
      console.log(`  Alt: ${alt}`);
      console.log(`  Classes: ${img.className}`);
      
      // Vérifier si c'est une image pertinente
      const isRelevant = 
        alt.toLowerCase().includes('jules') ||
        alt.toLowerCase().includes('guesde') ||
        alt.toLowerCase().includes('levallois') ||
        src.toLowerCase().includes('jules') ||
        src.toLowerCase().includes('guesde') ||
        src.toLowerCase().includes('levallois');
      
      console.log(`  Pertinente: ${isRelevant ? '✅' : '❌'}`);
    }
    
    console.log('\n=== RECHERCHE D\'ÉLÉMENTS AVEC DES IMAGES DE FOND ===');
    
    const allElements = document.querySelectorAll('*');
    let backgroundCount = 0;
    
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const style = element.getAttribute('style') || '';
      
      if (style.includes('background-image') || style.includes('url(')) {
        backgroundCount++;
        console.log(`\nÉlément avec background ${backgroundCount}:`);
        console.log(`  Tag: ${element.tagName}`);
        console.log(`  Classes: ${element.className}`);
        console.log(`  Style: ${style.substring(0, 200)}...`);
      }
    }
    
    console.log(`\nTotal d'éléments avec background: ${backgroundCount}`);
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}

debugJulesGuesdeImages();
