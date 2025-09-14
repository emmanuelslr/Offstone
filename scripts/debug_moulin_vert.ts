import { JSDOM } from 'jsdom';

async function debugMoulinVert() {
  try {
    const url = 'https://aguesseaucapital.com/biens/maison-du-moulin-vert/';
    console.log(`Analyse de la page: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    console.log('\n=== RECHERCHE DES ACCORDÉONS ===');
    
    // Chercher l'accordéon "Découvrir avant travaux"
    const accordionElements = document.querySelectorAll('details, .e-n-accordion-item, [class*="accordion"]');
    console.log(`Nombre d'accordéons trouvés: ${accordionElements.length}`);
    
    for (let i = 0; i < accordionElements.length; i++) {
      const accordion = accordionElements[i];
      const accordionText = accordion.textContent?.toLowerCase() || '';
      
      console.log(`\nAccordéon ${i + 1}:`);
      console.log(`  Tag: ${accordion.tagName}`);
      console.log(`  Classes: ${accordion.className}`);
      console.log(`  Texte: ${accordionText.substring(0, 100)}...`);
      
      if (accordionText.includes('découvrir') && accordionText.includes('travaux')) {
        console.log(`  ✅ ACCORDÉON "DÉCOUVRIR AVANT TRAVAUX" TROUVÉ !`);
        
        // Chercher les liens de galerie
        const galleryLinks = accordion.querySelectorAll('a.e-gallery-item, a.elementor-gallery-item');
        console.log(`  Nombre de liens de galerie: ${galleryLinks.length}`);
        
        for (let j = 0; j < Math.min(galleryLinks.length, 3); j++) {
          const link = galleryLinks[j];
          const href = link.getAttribute('href');
          console.log(`    Lien ${j + 1}: ${href}`);
        }
      }
    }
    
    console.log('\n=== RECHERCHE DES IMAGES SUR LA PAGE ===');
    
    // Chercher toutes les images sur la page
    const allImages = document.querySelectorAll('img[src*="wp-content/uploads"]');
    console.log(`Nombre total d'images: ${allImages.length}`);
    
    let imageCount = 0;
    for (let i = 0; i < allImages.length; i++) {
      const img = allImages[i];
      const src = img.getAttribute('src') || '';
      const alt = img.getAttribute('alt') || '';
      
      if (!src.includes('logo') && 
          !src.includes('icon') &&
          !src.includes('avatar') &&
          !src.includes('thumbnail')) {
        imageCount++;
        if (imageCount <= 5) {
          console.log(`Image ${imageCount}: ${src}`);
          console.log(`  Alt: ${alt}`);
        }
      }
    }
    
    console.log(`\nImages de contenu trouvées: ${imageCount}`);
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}

debugMoulinVert();
