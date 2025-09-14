import { JSDOM } from 'jsdom';

async function debugAccordionContent() {
  try {
    const url = 'https://aguesseaucapital.com/biens/investissement-immobilier-chilly-mazarin/';
    console.log(`Analyse du contenu de l'accordéon: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Chercher l'accordéon "Découvrir avant travaux"
    const accordionElements = document.querySelectorAll('details, .e-n-accordion-item, [class*="accordion"]');
    
    for (let i = 0; i < accordionElements.length; i++) {
      const accordion = accordionElements[i];
      const accordionText = accordion.textContent?.toLowerCase() || '';
      
      if (accordionText.includes('découvrir') && accordionText.includes('travaux')) {
        console.log(`\n=== CONTENU DE L'ACCORDÉON ===`);
        console.log(`HTML complet:`);
        console.log(accordion.outerHTML);
        
        // Chercher tous les éléments qui pourraient contenir des URLs d'images
        const allElements = accordion.querySelectorAll('*');
        console.log(`\n=== ÉLÉMENTS AVEC DES URLs ===`);
        
        for (let j = 0; j < allElements.length; j++) {
          const element = allElements[j];
          const innerHTML = element.innerHTML;
          
          // Chercher des URLs d'images dans le contenu
          if (innerHTML.includes('wp-content/uploads') && 
              innerHTML.includes('.jpg') || innerHTML.includes('.jpeg') || innerHTML.includes('.png') || innerHTML.includes('.webp')) {
            console.log(`\nÉlément avec URL d'image:`);
            console.log(`  Tag: ${element.tagName}`);
            console.log(`  Classes: ${element.className}`);
            console.log(`  InnerHTML: ${innerHTML.substring(0, 500)}...`);
          }
        }
        
        break;
      }
    }
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}

debugAccordionContent();
