import { JSDOM } from 'jsdom';

async function debugAccordionImages() {
  try {
    const url = 'https://aguesseaucapital.com/biens/investissement-immobilier-chilly-mazarin/';
    console.log(`Analyse des images dans l'accordéon: ${url}`);
    
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
        console.log(`\n=== ACCORDÉON TROUVÉ ===`);
        console.log(`Tag: ${accordion.tagName}`);
        console.log(`Classes: ${accordion.className}`);
        
        // Chercher toutes les images dans cet accordéon
        const images = accordion.querySelectorAll('img');
        console.log(`\nImages trouvées dans l'accordéon: ${images.length}`);
        
        for (let j = 0; j < images.length; j++) {
          const img = images[j];
          const src = img.getAttribute('src');
          const alt = img.getAttribute('alt') || '';
          const dataSrc = img.getAttribute('data-src');
          const dataLazySrc = img.getAttribute('data-lazy-src');
          
          console.log(`\nImage ${j + 1}:`);
          console.log(`  src: ${src}`);
          console.log(`  data-src: ${dataSrc}`);
          console.log(`  data-lazy-src: ${dataLazySrc}`);
          console.log(`  alt: ${alt}`);
          console.log(`  classes: ${img.className}`);
        }
        
        // Chercher aussi les éléments avec des attributs data-src ou data-lazy-src
        const lazyElements = accordion.querySelectorAll('[data-src], [data-lazy-src]');
        console.log(`\nÉléments lazy trouvés: ${lazyElements.length}`);
        
        for (let k = 0; k < lazyElements.length; k++) {
          const element = lazyElements[k];
          const dataSrc = element.getAttribute('data-src');
          const dataLazySrc = element.getAttribute('data-lazy-src');
          
          console.log(`\nLazy element ${k + 1}:`);
          console.log(`  tag: ${element.tagName}`);
          console.log(`  data-src: ${dataSrc}`);
          console.log(`  data-lazy-src: ${dataLazySrc}`);
          console.log(`  classes: ${element.className}`);
        }
        
        // Chercher les divs avec des backgrounds d'images
        const divs = accordion.querySelectorAll('div');
        console.log(`\nDivs dans l'accordéon: ${divs.length}`);
        
        let backgroundCount = 0;
        for (let l = 0; l < divs.length; l++) {
          const div = divs[l];
          const style = div.getAttribute('style') || '';
          
          if (style.includes('background-image') || style.includes('url(')) {
            backgroundCount++;
            console.log(`\nDiv avec background ${backgroundCount}:`);
            console.log(`  style: ${style}`);
            console.log(`  classes: ${div.className}`);
          }
        }
        
        break;
      }
    }
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}

debugAccordionImages();
