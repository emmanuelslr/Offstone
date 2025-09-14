#!/usr/bin/env tsx

/**
 * Script pour mettre à jour toutes les données des biens immobiliers
 * avec les 4 informations exactes de chaque page Aguesseau Capital
 */

import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const DATA_FILE = path.join(process.cwd(), 'public/data/case_studies.ndjson');

// URLs et données spécifiques pour chaque bien
const propertyUrls = {
  "planchat": "https://aguesseaucapital.com/biens/acquisition-hotel-planchat/",
  "chilly-mazarin": "https://aguesseaucapital.com/biens/investissement-immobilier-chilly-mazarin/",
  "simart": "https://aguesseaucapital.com/biens/immeuble-mixte-paris-18e-simart/",
  "maison-iena": "https://aguesseaucapital.com/biens/maison-iena-hotel-de-luxe-paris/",
  "jules-guesde": "https://aguesseaucapital.com/biens/acquisition-immeuble-bureaux-levallois-perret/",
  "bonnet": "https://aguesseaucapital.com/biens/immeuble-residentiel-paris-rue-bonnet/",
  "maison-barbes": "https://aguesseaucapital.com/biens/hotel-4-etoiles-paris-maison-barbes/",
  "maison-boetie": "https://aguesseaucapital.com/biens/maison-boetie-lieu-evenementiel-paris/",
  "truchet": "https://aguesseaucapital.com/biens/bureaux-haut-de-gamme-paris/",
  "passage-du-caire": "https://aguesseaucapital.com/biens/bureaux-passage-du-caire/",
  "maison-du-moulin-vert": "https://aguesseaucapital.com/biens/maison-du-moulin-vert/",
  "hector-malot": "https://aguesseaucapital.com/biens/hector-malot/",
  "ivry": "https://aguesseaucapital.com/biens/immeuble-renove-ivry/",
  "jean-jacques-rousseau": "https://aguesseaucapital.com/biens/15-jean-jacques-rousseau/",
  "vitry": "https://aguesseaucapital.com/biens/35-genie-immeuble-renove-vitry-sur-seine/",
  "villa-seurat": "https://aguesseaucapital.com/biens/2villa-seurat-hotel-particulier-art-deco-paris/",
  "henri-barbusse": "https://aguesseaucapital.com/biens/102-henri-barbusse/",
  "drancy": "https://aguesseaucapital.com/biens/46-grosperrin/"
};

async function fetchPropertyData(url: string): Promise<string[]> {
  try {
    console.log(`Fetching data from: ${url}`);
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extraire les 4 informations principales (les titres h2)
    const headlineElements = document.querySelectorAll('h2');
    const headlines: string[] = [];

    headlineElements.forEach(el => {
      const text = el.textContent?.trim();
      if (text && text.length > 0 && text.length < 50) {
        // Filtrer les titres qui correspondent aux 4 cartes
        if (text.match(/^\d{4}$/) || // Année (ex: 2024)
            text.match(/m²|m2/) || // Surface
            text.match(/\d+\s*(chambres|appartements|lots|niveaux|étages|postes|meublés|commerces|box)/i) || // Unités
            text.match(/(étoiles?|hôtel|bureaux|résidentiel|logistique|urbaine|activité|prime|rooftop|jardin|terrasse)/i)) { // Typologie/Classification
          headlines.push(text);
        }
      }
    });

    // Prendre les 4 premiers éléments trouvés
    return headlines.slice(0, 4);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return [];
  }
}

async function updateAllPropertyData() {
  try {
    // Lire le fichier existant
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const lines = fileContent.split('\n').filter(Boolean);
    const updatedCaseStudies = [];

    for (const line of lines) {
      const caseStudy = JSON.parse(line);
      const uid = caseStudy.uid;
      
      if (propertyUrls[uid as keyof typeof propertyUrls]) {
        console.log(`\nProcessing ${uid}...`);
        const headlines = await fetchPropertyData(propertyUrls[uid as keyof typeof propertyUrls]);
        
        if (headlines.length > 0) {
          caseStudy.headlineData = headlines;
          console.log(`✅ ${uid}: ${headlines.join(', ')}`);
        } else {
          console.log(`❌ ${uid}: No headlines found`);
        }
      }
      
      updatedCaseStudies.push(caseStudy);
    }

    // Écrire le fichier mis à jour
    const newFileContent = updatedCaseStudies.map(cs => JSON.stringify(cs)).join('\n');
    fs.writeFileSync(DATA_FILE, newFileContent, 'utf-8');
    
    console.log(`\n✅ Toutes les données ont été mises à jour !`);
    console.log(`📊 ${updatedCaseStudies.length} biens traités`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error);
  }
}

// Exécuter le script
updateAllPropertyData();
