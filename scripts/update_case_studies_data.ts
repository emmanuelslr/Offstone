#!/usr/bin/env tsx

/**
 * Script pour mettre à jour les données des case studies avec les informations correctes
 * depuis le site Offstone
 */

import fs from 'fs';
import path from 'path';

// Données corrigées basées sur le site Offstone
const updatedCaseStudies = [
  {
    uid: "planchat",
    title: "Planchat",
    city: "75020 Paris",
    assetClass: "Hôtel",
    year: 2024,
    kpis: [
      { label: "Surface", value: "760 m²" },
      { label: "Niveaux", value: "6 niveaux" },
      { label: "Chambres", value: "43 chambres" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2024/11/Facade-1.png",
      alt: "Planchat — Projet"
    }
  },
  {
    uid: "chilly-mazarin",
    title: "Chilly Mazarin",
    city: "91380 Chilly Mazarin",
    assetClass: "Logistique Urbaine",
    year: 2024,
    kpis: [
      { label: "Surface", value: "887 m²" },
      { label: "Lots", value: "2 lots" },
      { label: "Type", value: "Actifs d'activité" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2024/11/00000017-PHOTO-2023-12-13-18-35-56.jpg",
      alt: "Chilly Mazarin — Projet"
    }
  },
  {
    uid: "simart",
    title: "Simart",
    city: "75018 Paris",
    assetClass: "Résidentiel",
    year: 2024,
    kpis: [
      { label: "Surface", value: "753 m²" },
      { label: "Appartements", value: "13 appartements" },
      { label: "Commerces", value: "4 locaux commerciaux" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2024/11/costar.brightspotcdn-scaled.jpg",
      alt: "Simart — Projet"
    }
  },
  {
    uid: "maison-iena",
    title: "Maison Iéna",
    city: "75116 Paris",
    assetClass: "Hôtel",
    year: 2024,
    kpis: [
      { label: "Surface", value: "270 m²" },
      { label: "Appartements", value: "5 meublés touristiques" },
      { label: "Équipements", value: "Jardin et terrasse" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2024/11/AGUESSEAU-GESTION-11-scaled.jpg",
      alt: "Maison Iéna — Projet"
    }
  },
  {
    uid: "jules-guesde",
    title: "Jules Guesde",
    city: "Levallois-Perret",
    assetClass: "Bureaux",
    year: 2024,
    kpis: [
      { label: "Surface", value: "3200 m²" },
      { label: "Étages", value: "7 étages" },
      { label: "Type", value: "Immeuble commercial" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2024/10/Photo-Immeuble-clean-1-768x542.png",
      alt: "Jules Guesde — Projet"
    }
  },
  {
    uid: "bonnet",
    title: "Bonnet",
    city: "75018 Paris",
    assetClass: "Résidentiel",
    year: 2024,
    kpis: [
      { label: "Surface", value: "480 m²" },
      { label: "Appartements", value: "24 appartements" },
      { label: "Type", value: "Résidentiel" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2024/09/bonnet-20-1-1.jpg",
      alt: "Bonnet — Projet"
    }
  },
  {
    uid: "maison-barbes",
    title: "Maison Barbès",
    city: "75018 Paris",
    assetClass: "Hôtel",
    year: 2018,
    kpis: [
      { label: "Surface", value: "700 m²" },
      { label: "Chambres", value: "29 chambres" },
      { label: "Classification", value: "4 étoiles" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2023/11/WEB_LUX_0749.jpg",
      alt: "Maison Barbès — Projet"
    }
  },
  {
    uid: "maison-boetie",
    title: "Maison Boétie",
    city: "75008 Paris",
    assetClass: "Bureaux",
    year: 2022,
    kpis: [
      { label: "Surface", value: "220 m²" },
      { label: "Capacité", value: "150 personnes" },
      { label: "Type", value: "Localisation prime" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2023/11/58226-rue-la-boetie-13-copie-scaled.jpg",
      alt: "Maison Boétie — Projet"
    }
  },
  {
    uid: "truchet",
    title: "Truchet",
    city: "75017 Paris",
    assetClass: "Bureaux",
    year: 2022,
    kpis: [
      { label: "Surface", value: "450 m²" },
      { label: "Postes", value: "64 postes" },
      { label: "Type", value: "Bureaux opéré flex" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2023/11/WEB_Rue-Abel-Truchet-47951-PictHouse.jpg",
      alt: "Truchet — Projet"
    }
  },
  {
    uid: "passage-du-caire",
    title: "Passage du Caire",
    city: "75002 Paris",
    assetClass: "Bureaux",
    year: 2022,
    kpis: [
      { label: "Surface", value: "400 m²" },
      { label: "Postes", value: "50 postes" },
      { label: "Équipements", value: "Rooftop" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2023/11/Rooftop_-scaled.jpg",
      alt: "Passage du Caire — Projet"
    }
  },
  {
    uid: "maison-du-moulin-vert",
    title: "Maison du Moulin Vert",
    city: "75014 Paris",
    assetClass: "Hôtel",
    year: 2023,
    kpis: [
      { label: "Surface", value: "400 m²" },
      { label: "Appartements", value: "15 meublés touristiques" },
      { label: "Équipements", value: "Jardin" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2023/11/60348-Rue-du-Moulin-Vert-39CB-scaled.jpg",
      alt: "Maison du Moulin Vert — Projet"
    }
  },
  {
    uid: "hector-malot",
    title: "Hector Malot",
    city: "75012 Paris",
    assetClass: "Résidentiel",
    year: 2020,
    kpis: [
      { label: "Surface", value: "430 m²" },
      { label: "Appartements", value: "18 appartements" },
      { label: "Commerces", value: "2 commerces" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2023/11/Facade-6.jpg",
      alt: "Hector Malot — Projet"
    }
  },
  {
    uid: "ivry",
    title: "Ivry",
    city: "Ivry-sur-Seine",
    assetClass: "Résidentiel",
    year: 2021,
    kpis: [
      { label: "Surface", value: "430 m²" },
      { label: "Appartements", value: "17 appartements" },
      { label: "Type", value: "Restructuration complète" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2023/11/WEB_Facade.jpg",
      alt: "Ivry — Projet"
    }
  },
  {
    uid: "jean-jacques-rousseau",
    title: "Jean-Jacques Rousseau",
    city: "75001 Paris",
    assetClass: "Logistique Urbaine",
    year: 2021,
    kpis: [
      { label: "Surface", value: "400 m²" },
      { label: "Type", value: "Bien commercial" },
      { label: "Localisation", value: "Localisation prime" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2023/11/IMG_36ddd42-2-scaled.jpeg",
      alt: "Jean-Jacques Rousseau — Projet"
    }
  },
  {
    uid: "vitry",
    title: "Vitry",
    city: "Vitry-sur-Seine",
    assetClass: "Résidentiel",
    year: 2023,
    kpis: [
      { label: "Surface", value: "500 m²" },
      { label: "Lots", value: "9 lots" },
      { label: "Parkings", value: "6 parkings" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2023/11/Copie-de-7b60f6e6-0273-4289-8b54-988f300f4661-1-2.jpg",
      alt: "Vitry — Projet"
    }
  },
  {
    uid: "villa-seurat",
    title: "Villa Seurat",
    city: "75014 Paris",
    assetClass: "Résidentiel",
    year: 2021,
    kpis: [
      { label: "Surface", value: "450 m²" },
      { label: "Appartements", value: "5 appartements créés" },
      { label: "Commerces", value: "1 local commercial créé" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2023/11/Villa-Seurat-35-scaled.jpg",
      alt: "Villa Seurat — Projet"
    }
  },
  {
    uid: "henri-barbusse",
    title: "Henri Barbusse",
    city: "Aubervilliers",
    assetClass: "Résidentiel",
    year: 2022,
    kpis: [
      { label: "Surface", value: "800 m²" },
      { label: "Appartements", value: "18 appartements" },
      { label: "Commerces", value: "2 locaux commerciaux" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2023/11/Facade.jpg",
      alt: "Henri Barbusse — Projet"
    }
  },
  {
    uid: "drancy",
    title: "Drancy",
    city: "Drancy",
    assetClass: "Résidentiel",
    year: 2022,
    kpis: [
      { label: "Surface", value: "550 m²" },
      { label: "Appartements", value: "17 appartements" },
      { label: "Box", value: "6 box" }
    ],
    heroImage: {
      url: "https://offstone.fr/wp-content/uploads/2023/11/IMG_0908-scaled.jpeg",
      alt: "Drancy — Projet"
    }
  }
];

async function updateCaseStudiesData() {
  const dataPath = path.join(process.cwd(), 'public/data/case_studies.ndjson');
  
  try {
    // Lire le fichier existant
    const existingData = fs.readFileSync(dataPath, 'utf-8');
    const existingStudies = existingData.trim().split('\n').map(line => JSON.parse(line));
    
    // Mettre à jour chaque étude de cas
    const updatedStudies = existingStudies.map(existingStudy => {
      const updatedData = updatedCaseStudies.find(updated => updated.uid === existingStudy.uid);
      
      if (updatedData) {
        return {
          ...existingStudy,
          city: updatedData.city,
          assetClass: updatedData.assetClass,
          year: updatedData.year,
          kpis: updatedData.kpis,
          heroImage: updatedData.heroImage
        };
      }
      
      return existingStudy;
    });
    
    // Écrire le fichier mis à jour
    const updatedContent = updatedStudies.map(study => JSON.stringify(study)).join('\n');
    fs.writeFileSync(dataPath, updatedContent);
    
    console.log('✅ Données des case studies mises à jour avec succès !');
    console.log(`📊 ${updatedStudies.length} études de cas mises à jour`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour des données:', error);
  }
}

// Exécuter le script
updateCaseStudiesData();
