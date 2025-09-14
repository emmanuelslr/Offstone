#!/usr/bin/env tsx

/**
 * Script pour mettre à jour toutes les données des biens immobiliers
 * avec les 4 informations exactes de chaque page Aguesseau Capital
 */

import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'public/data/case_studies.ndjson');

// Données exactes extraites des pages Aguesseau Capital
const propertyData = {
  "planchat": {
    headlineData: ["2024", "760 m²", "6 niveaux", "43 chambres"]
  },
  "chilly-mazarin": {
    headlineData: ["2024", "887m²", "2 lots", "Actifs d'activité"]
  },
  "simart": {
    headlineData: ["2024", "753 m²", "13 appartements", "4 locaux commerciaux"]
  },
  "maison-iena": {
    headlineData: ["2024", "270m2", "5 meublés touristiques", "Jardin et terrasse"]
  },
  "jules-guesde": {
    headlineData: ["2024", "3200m2", "7 étages", "Immeuble commercial"]
  },
  "bonnet": {
    headlineData: ["2024", "480m2", "24 appartements", "Résidentiel"]
  },
  "maison-barbes": {
    headlineData: ["2018", "700 m2", "29 chambres", "4 étoiles"]
  },
  "maison-boetie": {
    headlineData: ["2022", "220 m2", "Capacitaire : 150 personnes", "Localisation prime"]
  },
  "truchet": {
    headlineData: ["2022", "450 m2", "64 postes", "Bureaux opéré flex"]
  },
  "passage-du-caire": {
    headlineData: ["2022", "400 m2", "50 postes", "Rooftop"]
  },
  "maison-du-moulin-vert": {
    headlineData: ["2023", "400 m2", "15 meublés touristiques", "Jardin"]
  },
  "hector-malot": {
    headlineData: ["2020", "430 m2", "18 appartements", "2 commerces"]
  },
  "ivry": {
    headlineData: ["2021", "430 m2", "17 appartements", "Restructuration complète"]
  },
  "jean-jacques-rousseau": {
    headlineData: ["2021", "Bien commercial", "Localisation prime", "400 m2"]
  },
  "vitry": {
    headlineData: ["2023", "500 m2", "9 lots", "6 parkings"]
  },
  "villa-seurat": {
    headlineData: ["2021", "450 m2", "5 appartements créés", "1 local commercial créé"]
  },
  "henri-barbusse": {
    headlineData: ["2022", "800 m2", "18 appartements", "2 locaux commerciaux"]
  },
  "drancy": {
    headlineData: ["2022", "550 m2", "17 appartements", "6 box"]
  }
};

async function updatePropertyData() {
  try {
    // Lire le fichier existant
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const lines = fileContent.split('\n').filter(Boolean);
    const updatedCaseStudies = [];

    for (const line of lines) {
      const caseStudy = JSON.parse(line);
      const uid = caseStudy.uid;
      
      if (propertyData[uid as keyof typeof propertyData]) {
        console.log(`Updating ${uid}...`);
        const data = propertyData[uid as keyof typeof propertyData];
        caseStudy.headlineData = data.headlineData;
        console.log(`✅ ${uid}: ${data.headlineData.join(', ')}`);
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
updatePropertyData();
