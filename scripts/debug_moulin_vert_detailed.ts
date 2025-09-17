import { JSDOM } from 'jsdom';

async function debugMoulinVertDetailed() {
  try {
    const url = 'https://offstone.fr/biens/maison-du-moulin-vert/';
    console.log(`Analyse détaillée de la page: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    console.log('\n=== RECHERCHE DE TOUS LES ÉLÉMENTS AVEC "DÉCOUVRIR" ===');
    
    // Chercher tous les éléments contenant "découvrir"
    const allElements = document.querySelectorAll('*');
    let foundElements = 0;
    
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const text = element.textContent?.toLowerCase() || '';
      
      if (text.includes('découvrir')) {
        foundElements++;
        console.log(`\nÉlément ${foundElements} avec "découvrir":`);
        console.log(`  Tag: ${element.tagName}`);
        console.log(`  Classes: ${element.className}`);
        console.log(`  Texte: ${text.substring(0, 200)}...`);
        
        if (foundElements >= 5) break; // Limiter l'affichage
      }
    }
    
    console.log(`\nTotal d'éléments avec "découvrir": ${foundElements}`);
    
    console.log('\n=== RECHERCHE DE TOUS LES ÉLÉMENTS AVEC "TRAVAUX" ===');
    
    let foundTravaux = 0;
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const text = element.textContent?.toLowerCase() || '';
      
      if (text.includes('travaux')) {
        foundTravaux++;
        console.log(`\nÉlément ${foundTravaux} avec "travaux":`);
        console.log(`  Tag: ${element.tagName}`);
        console.log(`  Classes: ${element.className}`);
        console.log(`  Texte: ${text.substring(0, 200)}...`);
        
        if (foundTravaux >= 5) break; // Limiter l'affichage
      }
    }
    
    console.log(`\nTotal d'éléments avec "travaux": ${foundTravaux}`);
    
    console.log('\n=== RECHERCHE DE TOUS LES ÉLÉMENTS AVEC "AVANT" ===');
    
    let foundAvant = 0;
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const text = element.textContent?.toLowerCase() || '';
      
      if (text.includes('avant')) {
        foundAvant++;
        console.log(`\nÉlément ${foundAvant} avec "avant":`);
        console.log(`  Tag: ${element.tagName}`);
        console.log(`  Classes: ${element.className}`);
        console.log(`  Texte: ${text.substring(0, 200)}...`);
        
        if (foundAvant >= 5) break; // Limiter l'affichage
      }
    }
    
    console.log(`\nTotal d'éléments avec "avant": ${foundAvant}`);
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}

debugMoulinVertDetailed();
