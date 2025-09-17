#!/usr/bin/env tsx

/**
 * Script pour mettre à jour les données individuelles de chaque bien
 * avec les 4 informations spécifiques basées sur le site Offstone
 */

import fs from 'fs';
import path from 'path';

// Données spécifiques pour chaque bien basées sur le site Offstone
const propertySpecificData = {
  "planchat": {
    headline: ["2024", "760 m²", "6 niveaux", "43 chambres"],
    kpis: [
      { label: "Surface", value: "760 m²" },
      { label: "Niveaux", value: "6 niveaux" },
      { label: "Chambres", value: "43 chambres" },
      { label: "Typologie", value: "Hôtel" }
    ]
  },
  "chilly-mazarin": {
    headline: ["2024", "887 m²", "2 lots", "Actifs d'activité"],
    kpis: [
      { label: "Surface", value: "887 m²" },
      { label: "Lots", value: "2 lots" },
      { label: "Type", value: "Actifs d'activité" },
      { label: "Typologie", value: "Logistique Urbaine" }
    ]
  },
  "simart": {
    headline: ["2024", "753 m²", "13 appartements", "4 locaux commerciaux"],
    kpis: [
      { label: "Surface", value: "753 m²" },
      { label: "Appartements", value: "13 appartements" },
      { label: "Commerces", value: "4 locaux commerciaux" },
      { label: "Typologie", value: "Résidentiel" }
    ]
  },
  "maison-iena": {
    headline: ["2024", "270 m²", "5 meublés touristiques", "Jardin et terrasse"],
    kpis: [
      { label: "Surface", value: "270 m²" },
      { label: "Appartements", value: "5 meublés touristiques" },
      { label: "Équipements", value: "Jardin et terrasse" },
      { label: "Typologie", value: "Hôtel" }
    ]
  },
  "jules-guesde": {
    headline: ["2024", "3200 m²", "7 étages", "Immeuble commercial"],
    kpis: [
      { label: "Surface", value: "3200 m²" },
      { label: "Étages", value: "7 étages" },
      { label: "Type", value: "Immeuble commercial" },
      { label: "Typologie", value: "Bureaux" }
    ]
  },
  "bonnet": {
    headline: ["2024", "480 m²", "24 appartements", "Résidentiel"],
    kpis: [
      { label: "Surface", value: "480 m²" },
      { label: "Appartements", value: "24 appartements" },
      { label: "Type", value: "Résidentiel" },
      { label: "Typologie", value: "Résidentiel" }
    ]
  },
  "maison-barbes": {
    headline: ["2018", "700 m²", "29 chambres", "4 étoiles"],
    kpis: [
      { label: "Surface", value: "700 m²" },
      { label: "Chambres", value: "29 chambres" },
      { label: "Classification", value: "4 étoiles" },
      { label: "Typologie", value: "Hôtel" }
    ]
  },
  "maison-boetie": {
    headline: ["2022", "220 m²", "150 personnes", "Localisation prime"],
    kpis: [
      { label: "Surface", value: "220 m²" },
      { label: "Capacité", value: "150 personnes" },
      { label: "Type", value: "Localisation prime" },
      { label: "Typologie", value: "Bureaux" }
    ]
  },
  "truchet": {
    headline: ["2022", "450 m²", "64 postes", "Bureaux opéré flex"],
    kpis: [
      { label: "Surface", value: "450 m²" },
      { label: "Postes", value: "64 postes" },
      { label: "Type", value: "Bureaux opéré flex" },
      { label: "Typologie", value: "Bureaux" }
    ]
  },
  "passage-du-caire": {
    headline: ["2022", "400 m²", "50 postes", "Rooftop"],
    kpis: [
      { label: "Surface", value: "400 m²" },
      { label: "Postes", value: "50 postes" },
      { label: "Équipements", value: "Rooftop" },
      { label: "Typologie", value: "Bureaux" }
    ]
  },
  "maison-du-moulin-vert": {
    headline: ["2023", "400 m²", "15 meublés touristiques", "Jardin"],
    kpis: [
      { label: "Surface", value: "400 m²" },
      { label: "Appartements", value: "15 meublés touristiques" },
      { label: "Équipements", value: "Jardin" },
      { label: "Typologie", value: "Hôtel" }
    ]
  },
  "hector-malot": {
    headline: ["2020", "430 m²", "18 appartements", "2 commerces"],
    kpis: [
      { label: "Surface", value: "430 m²" },
      { label: "Appartements", value: "18 appartements" },
      { label: "Commerces", value: "2 commerces" },
      { label: "Typologie", value: "Résidentiel" }
    ]
  },
  "ivry": {
    headline: ["2021", "430 m²", "17 appartements", "Restructuration complète"],
    kpis: [
      { label: "Surface", value: "430 m²" },
      { label: "Appartements", value: "17 appartements" },
      { label: "Type", value: "Restructuration complète" },
      { label: "Typologie", value: "Résidentiel" }
    ]
  },
  "jean-jacques-rousseau": {
    headline: ["2021", "400 m²", "Bien commercial", "Localisation prime"],
    kpis: [
      { label: "Surface", value: "400 m²" },
      { label: "Type", value: "Bien commercial" },
      { label: "Localisation", value: "Localisation prime" },
      { label: "Typologie", value: "Logistique Urbaine" }
    ]
  },
  "vitry": {
    headline: ["2023", "500 m²", "9 lots", "6 parkings"],
    kpis: [
      { label: "Surface", value: "500 m²" },
      { label: "Lots", value: "9 lots" },
      { label: "Parkings", value: "6 parkings" },
      { label: "Typologie", value: "Résidentiel" }
    ]
  },
  "villa-seurat": {
    headline: ["2021", "450 m²", "5 appartements créés", "1 local commercial créé"],
    kpis: [
      { label: "Surface", value: "450 m²" },
      { label: "Appartements", value: "5 appartements créés" },
      { label: "Commerces", value: "1 local commercial créé" },
      { label: "Typologie", value: "Résidentiel" }
    ]
  },
  "henri-barbusse": {
    headline: ["2022", "800 m²", "18 appartements", "2 locaux commerciaux"],
    kpis: [
      { label: "Surface", value: "800 m²" },
      { label: "Appartements", value: "18 appartements" },
      { label: "Commerces", value: "2 locaux commerciaux" },
      { label: "Typologie", value: "Résidentiel" }
    ]
  },
  "drancy": {
    headline: ["2022", "550 m²", "17 appartements", "6 box"],
    kpis: [
      { label: "Surface", value: "550 m²" },
      { label: "Appartements", value: "17 appartements" },
      { label: "Box", value: "6 box" },
      { label: "Typologie", value: "Résidentiel" }
    ]
  }
};

async function updateIndividualPropertyData() {
  const dataPath = path.join(process.cwd(), 'public/data/case_studies.ndjson');
  
  try {
    // Lire le fichier existant
    const existingData = fs.readFileSync(dataPath, 'utf-8');
    const existingStudies = existingData.trim().split('\n').map(line => JSON.parse(line));
    
    // Mettre à jour chaque étude de cas avec les données spécifiques
    const updatedStudies = existingStudies.map(existingStudy => {
      const specificData = propertySpecificData[existingStudy.uid as keyof typeof propertySpecificData];
      
      if (specificData) {
        return {
          ...existingStudy,
          kpis: specificData.kpis,
          // Ajouter les données pour les cartes headline
          headlineData: specificData.headline
        };
      }
      
      return existingStudy;
    });
    
    // Écrire le fichier mis à jour
    const updatedContent = updatedStudies.map(study => JSON.stringify(study)).join('\n');
    fs.writeFileSync(dataPath, updatedContent);
    
    console.log('✅ Données individuelles des biens mises à jour avec succès !');
    console.log(`📊 ${updatedStudies.length} biens mis à jour avec leurs 4 informations spécifiques`);
    
    // Afficher un exemple
    const example = updatedStudies.find(s => s.uid === 'bonnet');
    if (example) {
      console.log('\n📋 Exemple - Bonnet:');
      console.log('Headline:', example.headlineData);
      console.log('KPIs:', example.kpis);
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour des données:', error);
  }
}

// Exécuter le script
updateIndividualPropertyData();
