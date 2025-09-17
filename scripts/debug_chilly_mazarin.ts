import { JSDOM } from 'jsdom';

async function debugChillyMazarin() {
  try {
    const url = 'https://offstone.fr/biens/investissement-immobilier-chilly-mazarin/';
    console.log(`Analyse de la page: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    console.log('\n=== RECHERCHE DES LIENS ===');
    
    // Chercher tous les liens
    const allLinks = document.querySelectorAll('a');
    console.log(`Nombre total de liens trouvés: ${allLinks.length}`);
    
    for (let i = 0; i < allLinks.length; i++) {
      const link = allLinks[i];
      const text = link.textContent?.trim() || '';
      const href = link.getAttribute('href') || '';
      
      if (text.toLowerCase().includes('découvrir') || 
          text.toLowerCase().includes('travaux') ||
          text.toLowerCase().includes('galerie') ||
          text.toLowerCase().includes('photos') ||
          text.toLowerCase().includes('portfolio')) {
        console.log(`Lien trouvé: "${text}" -> ${href}`);
      }
    }
    
    console.log('\n=== RECHERCHE DES BOUTONS ===');
    
    // Chercher les boutons
    const buttons = document.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      const text = button.textContent?.trim() || '';
      
      if (text.toLowerCase().includes('découvrir') || 
          text.toLowerCase().includes('travaux') ||
          text.toLowerCase().includes('galerie') ||
          text.toLowerCase().includes('photos')) {
        console.log(`Bouton trouvé: "${text}"`);
      }
    }
    
    console.log('\n=== RECHERCHE DES ÉLÉMENTS AVEC TEXTE ===');
    
    // Chercher tous les éléments contenant le texte
    const allElements = document.querySelectorAll('*');
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const text = element.textContent?.trim() || '';
      
      if (text === 'Découvrir avant travaux' || 
          text.toLowerCase().includes('découvrir avant travaux')) {
        console.log(`Élément trouvé: "${text}"`);
        console.log(`Tag: ${element.tagName}`);
        console.log(`Classes: ${element.className}`);
        console.log(`Parent: ${element.parentElement?.tagName} - ${element.parentElement?.className}`);
        
        // Chercher un lien dans cet élément ou ses enfants
        const linkInElement = element.querySelector('a') || element.closest('a');
        if (linkInElement) {
          console.log(`Lien associé: ${linkInElement.getAttribute('href')}`);
        }
      }
    }
    
    console.log('\n=== RECHERCHE DES IMAGES ===');
    
    // Chercher toutes les images
    const images = document.querySelectorAll('img');
    console.log(`Nombre total d'images: ${images.length}`);
    
    let imageCount = 0;
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const src = img.getAttribute('src') || '';
      
      if (src.includes('wp-content/uploads') && 
          !src.includes('logo') && 
          !src.includes('icon') &&
          !src.includes('avatar')) {
        imageCount++;
        if (imageCount <= 5) { // Afficher seulement les 5 premières
          console.log(`Image ${imageCount}: ${src}`);
        }
      }
    }
    
    console.log(`\nImages de contenu trouvées: ${imageCount}`);
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}

debugChillyMazarin();
