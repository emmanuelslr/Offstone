import { JSDOM } from 'jsdom';

async function debugIenaGuesde() {
  const urls = [
    'https://aguesseaucapital.com/biens/maison-iena-hotel-de-luxe-paris/',
    'https://aguesseaucapital.com/biens/acquisition-immeuble-bureaux-levallois-perret/'
  ];

  for (const url of urls) {
    try {
      console.log(`\n=== ANALYSE DE ${url} ===`);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      // Chercher l'accordéon "Découvrir avant travaux"
      const accordionElements = document.querySelectorAll('details, .e-n-accordion-item, [class*="accordion"]');
      console.log(`Nombre d'accordéons trouvés: ${accordionElements.length}`);
      
      let foundAccordion = false;
      for (let i = 0; i < accordionElements.length; i++) {
        const accordion = accordionElements[i];
        const accordionText = accordion.textContent?.toLowerCase() || '';
        
        if (accordionText.includes('découvrir') && accordionText.includes('travaux')) {
          console.log(`✅ ACCORDÉON "DÉCOUVRIR AVANT TRAVAUX" TROUVÉ !`);
          foundAccordion = true;
          
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
      
      if (!foundAccordion) {
        console.log(`❌ Aucun accordéon "Découvrir avant travaux" trouvé`);
        
        // Chercher tous les éléments avec "découvrir"
        const allElements = document.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
          const element = allElements[i];
          const text = element.textContent?.toLowerCase() || '';
          
          if (text.includes('découvrir') && !text.includes('site')) {
            console.log(`  Élément avec "découvrir": ${element.tagName} - "${text.substring(0, 100)}..."`);
          }
        }
      }
      
      // Chercher toutes les images sur la page
      const allImages = document.querySelectorAll('img[src*="wp-content/uploads"]');
      console.log(`\nNombre total d'images: ${allImages.length}`);
      
      let imageCount = 0;
      for (let i = 0; i < allImages.length; i++) {
        const img = allImages[i];
        const src = img.getAttribute('src') || '';
        const alt = img.getAttribute('alt') || '';
        
        if (!src.includes('logo') && 
            !src.includes('icon') &&
            !src.includes('avatar') &&
            !src.includes('thumbnail') &&
            !src.includes('cropped-Logo')) {
          imageCount++;
          if (imageCount <= 5) {
            console.log(`Image ${imageCount}: ${src}`);
            console.log(`  Alt: ${alt}`);
          }
        }
      }
      
      console.log(`Images de contenu trouvées: ${imageCount}`);
      
    } catch (error) {
      console.error(`Erreur pour ${url}:`, error);
    }
  }
}

debugIenaGuesde();
