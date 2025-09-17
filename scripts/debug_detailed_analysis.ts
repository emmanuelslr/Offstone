import { JSDOM } from 'jsdom';

async function debugDetailedAnalysis() {
  const urls = [
    {
      name: 'Maison Iéna',
      url: 'https://offstone.fr/biens/maison-iena-hotel-de-luxe-paris/',
      uid: 'maison-iena'
    },
    {
      name: 'Jules Guesde', 
      url: 'https://offstone.fr/biens/acquisition-immeuble-bureaux-levallois-perret/',
      uid: 'jules-guesde'
    }
  ];

  for (const { name, url, uid } of urls) {
    try {
      console.log(`\n=== ANALYSE DÉTAILLÉE DE ${name} ===`);
      console.log(`URL: ${url}`);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      // 1. Chercher tous les accordéons
      console.log('\n--- ACCORDÉONS ---');
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
          console.log(`  ✅ CONTIENT "DÉCOUVRIR AVANT TRAVAUX"`);
          
          const galleryLinks = accordion.querySelectorAll('a.e-gallery-item, a.elementor-gallery-item');
          console.log(`  Liens de galerie: ${galleryLinks.length}`);
          
          if (galleryLinks.length > 0) {
            for (let j = 0; j < Math.min(galleryLinks.length, 3); j++) {
              const link = galleryLinks[j];
              const href = link.getAttribute('href');
              console.log(`    Lien ${j + 1}: ${href}`);
            }
          }
        }
      }
      
      // 2. Chercher tous les éléments avec "découvrir"
      console.log('\n--- ÉLÉMENTS AVEC "DÉCOUVRIR" ---');
      const allElements = document.querySelectorAll('*');
      let foundElements = 0;
      
      for (let i = 0; i < allElements.length; i++) {
        const element = allElements[i];
        const text = element.textContent?.toLowerCase() || '';
        
        if (text.includes('découvrir') && !text.includes('site')) {
          foundElements++;
          console.log(`\nÉlément ${foundElements} avec "découvrir":`);
          console.log(`  Tag: ${element.tagName}`);
          console.log(`  Classes: ${element.className}`);
          console.log(`  Texte: ${text.substring(0, 150)}...`);
          
          if (foundElements >= 3) break;
        }
      }
      
      // 3. Chercher toutes les images
      console.log('\n--- IMAGES ---');
      const allImages = document.querySelectorAll('img[src*="wp-content/uploads"]');
      console.log(`Nombre total d'images: ${allImages.length}`);
      
      let relevantImages = 0;
      for (let i = 0; i < allImages.length; i++) {
        const img = allImages[i];
        const src = img.getAttribute('src') || '';
        const alt = img.getAttribute('alt') || '';
        
        if (!src.includes('logo') && 
            !src.includes('icon') &&
            !src.includes('avatar') &&
            !src.includes('thumbnail') &&
            !src.includes('cropped-Logo')) {
          
          const isRelevant = 
            alt.toLowerCase().includes(uid.toLowerCase()) ||
            alt.toLowerCase().includes(uid.replace('-', ' ').toLowerCase()) ||
            src.toLowerCase().includes(uid.toLowerCase()) ||
            src.toLowerCase().includes(uid.replace('-', '').toLowerCase());
          
          if (isRelevant) {
            relevantImages++;
            console.log(`\nImage pertinente ${relevantImages}:`);
            console.log(`  URL: ${src}`);
            console.log(`  Alt: ${alt}`);
          }
        }
      }
      
      console.log(`\nImages pertinentes trouvées: ${relevantImages}`);
      
    } catch (error) {
      console.error(`Erreur pour ${name}:`, error);
    }
  }
}

debugDetailedAnalysis();
