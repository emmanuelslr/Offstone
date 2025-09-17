import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';

// URLs des biens avec leurs UIDs correspondants
const propertyUrls = [
  { uid: 'planchat', url: 'https://offstone.fr/nos-realisations/planchat/' },
  { uid: 'chilly-mazarin', url: 'https://offstone.fr/nos-realisations/chilly-mazarin/' },
  { uid: 'simart', url: 'https://offstone.fr/nos-realisations/simart/' },
  { uid: 'maison-iena', url: 'https://offstone.fr/nos-realisations/maison-iena/' },
  { uid: 'jules-guesde', url: 'https://offstone.fr/nos-realisations/jules-guesde/' },
  { uid: 'bonnet', url: 'https://offstone.fr/nos-realisations/bonnet/' },
  { uid: 'maison-barbes', url: 'https://offstone.fr/nos-realisations/maison-barbes/' },
  { uid: 'maison-boetie', url: 'https://offstone.fr/nos-realisations/maison-boetie/' },
  { uid: 'truchet', url: 'https://offstone.fr/biens/bureaux-haut-de-gamme-paris/' },
  { uid: 'passage-du-caire', url: 'https://offstone.fr/biens/bureaux-passage-du-caire/' },
  { uid: 'maison-du-moulin-vert', url: 'https://offstone.fr/biens/maison-du-moulin-vert/' },
  { uid: 'hector-malot', url: 'https://offstone.fr/biens/hector-malot/' },
  { uid: 'ivry', url: 'https://offstone.fr/biens/immeuble-renove-ivry/' },
  { uid: 'jean-jacques-rousseau', url: 'https://offstone.fr/biens/15-jean-jacques-rousseau/' },
  { uid: 'vitry', url: 'https://offstone.fr/biens/35-genie-immeuble-renove-vitry-sur-seine/' },
  { uid: 'villa-seurat', url: 'https://offstone.fr/biens/2villa-seurat-hotel-particulier-art-deco-paris/' },
  { uid: 'henri-barbusse', url: 'https://offstone.fr/biens/102-henri-barbusse/' },
  { uid: 'drancy', url: 'https://offstone.fr/biens/46-grosperrin/' }
];

interface PortfolioImage {
  url: string;
  alt: string;
  caption?: string;
}

async function extractPortfolioPhotos(uid: string, url: string): Promise<PortfolioImage[]> {
  try {
    console.log(`Extraction des photos pour ${uid}...`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const portfolioImages: PortfolioImage[] = [];
    
    // Chercher spécifiquement l'accordéon "Découvrir avant travaux"
    const accordionElements = document.querySelectorAll('details, .e-n-accordion-item, [class*="accordion"]');
    let portfolioFound = false;
    let bestAccordion = null;
    let maxGalleryLinks = 0;
    
    // Trouver l'accordéon avec le plus de liens de galerie
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
    
    // Utiliser le meilleur accordéon trouvé
    if (bestAccordion && maxGalleryLinks > 0) {
      console.log(`Trouvé un accordéon portfolio pour ${uid} avec ${maxGalleryLinks} liens`);
      portfolioFound = true;
      
      // Extraire les images de cet accordéon - chercher les liens de galerie
      const galleryLinks = bestAccordion.querySelectorAll('a.e-gallery-item, a.elementor-gallery-item');
      
      for (const link of galleryLinks) {
        const href = link.getAttribute('href');
        const thumbnail = link.querySelector('.e-gallery-image')?.getAttribute('data-thumbnail');
        const alt = link.querySelector('.e-gallery-image')?.getAttribute('aria-label') || '';
        
        // Utiliser l'URL du lien (image complète) ou le thumbnail
        const imageUrl = href || thumbnail;
        
        if (imageUrl && imageUrl.includes('wp-content/uploads') && 
            !imageUrl.includes('logo') && 
            !imageUrl.includes('icon') &&
            !imageUrl.includes('avatar') &&
            !imageUrl.includes('thumbnail')) {
          
          // Éviter les doublons
          if (!portfolioImages.some(existing => existing.url === imageUrl)) {
            portfolioImages.push({
              url: imageUrl,
              alt: alt || `${uid} - Photo du portefeuille`,
              caption: undefined
            });
          }
        }
      }
      
      // Si pas de liens de galerie trouvés, chercher les images classiques
      if (portfolioImages.length === 0) {
        const accordionImages = bestAccordion.querySelectorAll('img[src*="wp-content/uploads"]');
        
        for (const img of accordionImages) {
          const src = img.getAttribute('src');
          const alt = img.getAttribute('alt') || '';
          
          if (src && src.includes('wp-content/uploads') && 
              !src.includes('logo') && 
              !src.includes('icon') &&
              !src.includes('avatar') &&
              !src.includes('thumbnail')) {
            
            // Éviter les doublons
            if (!portfolioImages.some(existing => existing.url === src)) {
              portfolioImages.push({
                url: src,
                alt: alt || `${uid} - Photo du portefeuille`,
                caption: img.getAttribute('title') || undefined
              });
            }
          }
        }
      }
    }
    
    // Si pas d'accordéon trouvé, chercher les liens "Découvrir avant travaux"
    if (!portfolioFound) {
      const portfolioLinks = document.querySelectorAll('a');
      let portfolioUrl = null;
      
      for (const link of portfolioLinks) {
        const linkText = link.textContent?.toLowerCase() || '';
        const href = link.getAttribute('href');
        
        if ((linkText.includes('découvrir') && linkText.includes('travaux')) ||
            (linkText.includes('galerie') && linkText.includes('photos')) ||
            (linkText.includes('portfolio') && linkText.includes('photos')) ||
            (linkText.includes('voir') && linkText.includes('photos'))) {
          portfolioUrl = href;
          break;
        }
      }
      
      // Si on trouve un lien vers le portfolio, l'explorer
      if (portfolioUrl) {
        console.log(`Trouvé un lien portfolio pour ${uid}: ${portfolioUrl}`);
        
        try {
          const portfolioResponse = await fetch(portfolioUrl);
          if (portfolioResponse.ok) {
            const portfolioHtml = await portfolioResponse.text();
            const portfolioDom = new JSDOM(portfolioHtml);
            const portfolioDoc = portfolioDom.window.document;
            
            // Extraire les images du portfolio
            const portfolioSelectors = [
              'img[src*="wp-content/uploads"]',
              '.gallery img',
              '.portfolio img',
              '.photos img',
              '.images img',
              'figure img',
              '.wp-block-image img',
              '.lightbox img',
              '.modal img'
            ];
            
            for (const selector of portfolioSelectors) {
              const images = portfolioDoc.querySelectorAll(selector);
              
              for (const img of images) {
                const src = img.getAttribute('src');
                const alt = img.getAttribute('alt') || '';
                
                if (src && src.includes('wp-content/uploads') && 
                    !src.includes('logo') && 
                    !src.includes('icon') &&
                    !src.includes('avatar') &&
                    !src.includes('thumbnail')) {
                  
                  // Éviter les doublons
                  if (!portfolioImages.some(existing => existing.url === src)) {
                    portfolioImages.push({
                      url: src,
                      alt: alt || `${uid} - Photo du portefeuille`,
                      caption: img.getAttribute('title') || undefined
                    });
                  }
                }
              }
            }
          }
        } catch (portfolioError) {
          console.log(`Erreur lors de l'accès au portfolio pour ${uid}:`, portfolioError);
        }
      }
    }
    
    // Si pas de portfolio trouvé, chercher les images directement sur la page
    if (portfolioImages.length === 0) {
      console.log(`Aucun portfolio trouvé pour ${uid}, recherche sur la page principale...`);
      
      const selectors = [
        'img[src*="wp-content/uploads"]',
        '.gallery img',
        '.portfolio img',
        '.photos img',
        '.images img',
        'figure img',
        '.wp-block-image img'
      ];
      
      for (const selector of selectors) {
        const images = document.querySelectorAll(selector);
        
        for (const img of images) {
          const src = img.getAttribute('src');
          const alt = img.getAttribute('alt') || '';
          
          if (src && src.includes('wp-content/uploads') && 
              !src.includes('logo') && 
              !src.includes('icon') &&
              !src.includes('avatar') &&
              !src.includes('thumbnail') &&
              !src.includes('cropped-Logo')) {
            
            // Filtrer les images qui correspondent à l'immeuble concerné
            const isRelevantImage = 
              alt.toLowerCase().includes(uid.toLowerCase()) ||
              alt.toLowerCase().includes(uid.replace('-', ' ').toLowerCase()) ||
              src.toLowerCase().includes(uid.toLowerCase()) ||
              src.toLowerCase().includes(uid.replace('-', '').toLowerCase());
            
            // Pour Jules Guesde, chercher des images avec "levallois", "jules" ou "immeuble"
            const isJulesGuesdeImage = uid === 'jules-guesde' && (
              alt.toLowerCase().includes('levallois') ||
              alt.toLowerCase().includes('jules') ||
              alt.toLowerCase().includes('guesde') ||
              alt.toLowerCase().includes('immeuble') ||
              src.toLowerCase().includes('levallois') ||
              src.toLowerCase().includes('jules') ||
              src.toLowerCase().includes('guesde') ||
              src.toLowerCase().includes('immeuble-clean')
            );
            
            // Exclure les images d'autres immeubles
            const isOtherPropertyImage = 
              alt.toLowerCase().includes('planchat') ||
              alt.toLowerCase().includes('chilly') ||
              alt.toLowerCase().includes('mazarin') ||
              alt.toLowerCase().includes('simart') ||
              alt.toLowerCase().includes('barbes') ||
              alt.toLowerCase().includes('boetie') ||
              alt.toLowerCase().includes('truchet') ||
              alt.toLowerCase().includes('bonnet') ||
              alt.toLowerCase().includes('moulin') ||
              alt.toLowerCase().includes('vert') ||
              alt.toLowerCase().includes('malot') ||
              alt.toLowerCase().includes('ivry') ||
              alt.toLowerCase().includes('rousseau') ||
              alt.toLowerCase().includes('vitry') ||
              alt.toLowerCase().includes('seurat') ||
              alt.toLowerCase().includes('barbusse') ||
              alt.toLowerCase().includes('drancy');
            
            // Si l'image semble pertinente et n'est pas d'un autre immeuble
            if ((isRelevantImage || isJulesGuesdeImage || portfolioImages.length === 0) && !isOtherPropertyImage) {
              // Éviter les doublons
              if (!portfolioImages.some(existing => existing.url === src)) {
                portfolioImages.push({
                  url: src,
                  alt: alt || `${uid} - Photo du portefeuille`,
                  caption: img.getAttribute('title') || undefined
                });
              }
            }
          }
        }
      }
    }
    
    // Filtrer et limiter les images (prendre les 6-8 meilleures)
    const filteredImages = portfolioImages
      .filter(img => {
        // Filtrer les images trop petites ou de mauvaise qualité
        return !img.url.includes('150x') && 
               !img.url.includes('300x') &&
               !img.url.includes('768x') &&
               (img.url.includes('.jpg') || img.url.includes('.jpeg') || img.url.includes('.png') || img.url.includes('.webp'));
      })
      .slice(0, 8); // Limiter à 8 images maximum
    
    console.log(`Trouvé ${filteredImages.length} images pour ${uid}`);
    return filteredImages;
    
  } catch (error) {
    console.error(`Erreur lors de l'extraction pour ${uid}:`, error);
    return [];
  }
}

async function updateCaseStudiesWithPortfolio() {
  const ndjsonPath = path.join(process.cwd(), 'public/data/case_studies.ndjson');
  
  try {
    // Lire le fichier NDJSON existant
    const fileContent = fs.readFileSync(ndjsonPath, 'utf8');
    const caseStudies = fileContent
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line));
    
    console.log(`Chargement de ${caseStudies.length} études de cas...`);
    
    // Mettre à jour chaque étude de cas avec son portefeuille photo
    for (const property of propertyUrls) {
      const caseStudy = caseStudies.find(cs => cs.uid === property.uid);
      
      if (caseStudy) {
        console.log(`\nTraitement de ${property.uid}...`);
        const portfolioImages = await extractPortfolioPhotos(property.uid, property.url);
        
        if (portfolioImages.length > 0) {
          caseStudy.portfolioImages = portfolioImages;
          console.log(`✅ Ajouté ${portfolioImages.length} images au portefeuille de ${property.uid}`);
        } else {
          console.log(`⚠️ Aucune image trouvée pour ${property.uid}`);
        }
        
        // Pause entre les requêtes pour éviter de surcharger le serveur
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        console.log(`❌ Étude de cas non trouvée pour ${property.uid}`);
      }
    }
    
    // Sauvegarder le fichier mis à jour
    const updatedContent = caseStudies
      .map(cs => JSON.stringify(cs))
      .join('\n') + '\n';
    
    fs.writeFileSync(ndjsonPath, updatedContent);
    console.log(`\n✅ Fichier mis à jour avec succès: ${ndjsonPath}`);
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
  }
}

// Exécuter le script
updateCaseStudiesWithPortfolio().catch(console.error);
