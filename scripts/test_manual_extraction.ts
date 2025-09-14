import { JSDOM } from 'jsdom';

async function testManualExtraction() {
  const url = 'https://aguesseaucapital.com/biens/maison-iena-hotel-de-luxe-paris/';
  
  try {
    console.log(`Test d'extraction manuelle pour: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Chercher l'accordéon avec le plus de liens
    const accordionElements = document.querySelectorAll('details, .e-n-accordion-item, [class*="accordion"]');
    let bestAccordion = null;
    let maxGalleryLinks = 0;
    
    for (const accordion of accordionElements) {
      const accordionText = accordion.textContent?.toLowerCase() || '';
      
      if (accordionText.includes('découvrir') && accordionText.includes('travaux')) {
        const galleryLinks = accordion.querySelectorAll('a.e-gallery-item, a.elementor-gallery-item');
        
        if (galleryLinks.length > maxGalleryLinks) {
          maxGalleryLinks = galleryLinks.length;
          bestAccordion = accordion;
        }
      }
    }
    
    if (bestAccordion) {
      console.log(`\nMeilleur accordéon trouvé avec ${maxGalleryLinks} liens`);
      
      const galleryLinks = bestAccordion.querySelectorAll('a.e-gallery-item, a.elementor-gallery-item');
      console.log(`\nPremiers liens de galerie:`);
      
      for (let i = 0; i < Math.min(galleryLinks.length, 5); i++) {
        const link = galleryLinks[i];
        const href = link.getAttribute('href');
        const thumbnail = link.querySelector('.e-gallery-image')?.getAttribute('data-thumbnail');
        const alt = link.querySelector('.e-gallery-image')?.getAttribute('aria-label') || '';
        
        console.log(`\nLien ${i + 1}:`);
        console.log(`  href: ${href}`);
        console.log(`  thumbnail: ${thumbnail}`);
        console.log(`  alt: ${alt}`);
        
        // Utiliser l'URL du lien (image complète) ou le thumbnail
        const imageUrl = href || thumbnail;
        console.log(`  URL finale: ${imageUrl}`);
      }
    } else {
      console.log('\n❌ Aucun accordéon trouvé');
    }
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}

testManualExtraction();
