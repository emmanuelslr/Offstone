// Script pour générer les images Open Graph manquantes
// Ce script utilise Canvas pour créer des images OG optimisées

const fs = require('fs');
const path = require('path');

// Configuration des images OG
const ogConfig = {
  width: 1200,
  height: 630,
  backgroundColor: '#1f2937',
  textColor: '#ffffff',
  accentColor: '#3b82f6',
  font: {
    title: 'bold 48px Inter, sans-serif',
    subtitle: '24px Inter, sans-serif',
    description: '20px Inter, sans-serif'
  }
};

// Templates d'images OG
const ogTemplates = [
  {
    filename: 'og-image.webp',
    title: 'Offstone',
    subtitle: 'Investissez aux côtés de',
    name: 'Jonathan Anguelov',
    description: 'Club de deals immobiliers exclusifs'
  },
  {
    filename: 'og-home.webp',
    title: 'Offstone',
    subtitle: 'Investissement Immobilier',
    name: 'avec Jonathan Anguelov',
    description: 'Accédez à des opérations sélectionnées'
  },
  {
    filename: 'og-jonathan.webp',
    title: 'Jonathan Anguelov',
    subtitle: 'Fondateur & Investisseur',
    name: 'Immobilier Professionnel',
    description: 'Expert en investissement immobilier'
  },
  {
    filename: 'og-deals.webp',
    title: 'Club de Deals',
    subtitle: 'Offstone',
    name: 'Opérations Sélectionnées',
    description: 'Investissement immobilier exclusif'
  }
];

// Fonction pour créer une image OG (simulation)
function createOGImage(template) {
  console.log(`Création de l'image OG: ${template.filename}`);
  console.log(`- Titre: ${template.title}`);
  console.log(`- Sous-titre: ${template.subtitle}`);
  console.log(`- Nom: ${template.name}`);
  console.log(`- Description: ${template.description}`);
  
  // En production, vous utiliseriez Canvas ou une bibliothèque comme Sharp
  // Pour l'instant, on crée juste les fichiers de configuration
  return {
    filename: template.filename,
    width: ogConfig.width,
    height: ogConfig.height,
    template: template
  };
}

// Générer toutes les images OG
function generateAllOGImages() {
  console.log('🎨 Génération des images Open Graph...\n');
  
  const publicDir = path.join(__dirname, '..', 'public', 'images');
  
  // Créer le dossier s'il n'existe pas
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  ogTemplates.forEach(template => {
    const image = createOGImage(template);
    
    // Créer un fichier de configuration pour l'image
    const configPath = path.join(publicDir, `${template.filename}.config.json`);
    fs.writeFileSync(configPath, JSON.stringify(image, null, 2));
    
    console.log(`✅ Configuration créée: ${configPath}`);
  });
  
  console.log('\n📝 Instructions pour créer les vraies images:');
  console.log('1. Utilisez un outil comme Canva, Figma ou Photoshop');
  console.log('2. Dimensions: 1200x630 pixels');
  console.log('3. Format: JPG ou PNG');
  console.log('4. Placez les images dans /public/images/');
  console.log('5. Noms des fichiers: og-image.webp, og-home.webp, og-jonathan.webp, og-deals.webp');
  
  console.log('\n🎯 Contenu recommandé pour chaque image:');
  ogTemplates.forEach(template => {
    console.log(`\n${template.filename}:`);
    console.log(`  - Titre principal: ${template.title}`);
    console.log(`  - Sous-titre: ${template.subtitle}`);
    console.log(`  - Nom: ${template.name}`);
    console.log(`  - Description: ${template.description}`);
    console.log(`  - Logo Offstone (en haut à gauche)`);
    console.log(`  - Photo de Jonathan Anguelov (optionnelle)`);
    console.log(`  - Couleurs: Fond #1f2937, Texte blanc, Accent bleu #3b82f6`);
  });
}

// Exécuter le script
if (require.main === module) {
  generateAllOGImages();
}

module.exports = { generateAllOGImages, ogTemplates, ogConfig };
