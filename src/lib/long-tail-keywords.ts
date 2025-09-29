// Mots-clés long-tail optimisés pour "offstone jonathan anguelov"

export const longTailKeywords = {
  // Mots-clés principaux avec variations
  primary: [
    "offstone jonathan anguelov",
    "jonathan anguelov offstone",
    "investir avec jonathan anguelov",
    "club de deals jonathan anguelov",
    "offstone investissement immobilier"
  ],
  
  // Mots-clés par intention
  intent: {
    // Intention d'achat/investissement
    commercial: [
      "comment investir avec jonathan anguelov",
      "rejoindre club deals offstone",
      "investissement immobilier accompagné offstone",
      "deals immobiliers exclusifs jonathan anguelov",
      "club investisseurs immobiliers offstone",
      "investir immobilier professionnel avec expert",
      "accompagnement investissement immobilier offstone"
    ],
    
    // Intention informationnelle
    informational: [
      "qui est jonathan anguelov offstone",
      "expertise jonathan anguelov immobilier",
      "biographie jonathan anguelov investisseur",
      "conseils investissement immobilier jonathan anguelov",
      "stratégies investissement immobilier offstone",
      "analyse marché immobilier jonathan anguelov",
      "tendances investissement immobilier 2024"
    ],
    
    // Intention de comparaison
    comparison: [
      "offstone vs autres clubs investissement",
      "jonathan anguelov vs autres experts immobilier",
      "meilleur club deals immobiliers france",
      "comparatif accompagnement investissement immobilier",
      "avantages offstone investissement immobilier"
    ]
  },
  
  // Mots-clés géographiques
  geographic: [
    "investissement immobilier france jonathan anguelov",
    "club deals immobiliers paris offstone",
    "expert immobilier france jonathan anguelov",
    "investissement immobilier professionnel france",
    "accompagnement investisseur immobilier france",
    "deals immobiliers france offstone"
  ],
  
  // Mots-clés par secteur
  sector: {
    residential: [
      "investissement immobilier résidentiel jonathan anguelov",
      "deals immobiliers résidentiels offstone",
      "accompagnement investissement résidentiel"
    ],
    commercial: [
      "investissement immobilier commercial offstone",
      "deals immobiliers commerciaux jonathan anguelov",
      "immobilier professionnel offstone"
    ],
    mixed: [
      "investissement immobilier mixte offstone",
      "deals immobiliers mixtes jonathan anguelov"
    ]
  },
  
  // Mots-clés par type d'investisseur
  investorType: {
    beginner: [
      "investissement immobilier débutant jonathan anguelov",
      "apprendre investir immobilier offstone",
      "premier investissement immobilier accompagné",
      "formation investissement immobilier débutant"
    ],
    experienced: [
      "investissement immobilier avancé offstone",
      "diversification patrimoine jonathan anguelov",
      "optimisation investissement immobilier",
      "stratégies avancées investissement immobilier"
    ],
    professional: [
      "investissement immobilier professionnel offstone",
      "club deals professionnels jonathan anguelov",
      "investissement immobilier institutionnel"
    ]
  },
  
  // Mots-clés par montant d'investissement
  investmentAmount: {
    small: [
      "petit investissement immobilier offstone",
      "investissement immobilier 50k jonathan anguelov",
      "débuter investissement immobilier petit budget"
    ],
    medium: [
      "investissement immobilier 100k offstone",
      "investissement immobilier 200k jonathan anguelov",
      "investissement immobilier moyen budget"
    ],
    large: [
      "gros investissement immobilier offstone",
      "investissement immobilier 500k jonathan anguelov",
      "investissement immobilier haut de gamme"
    ]
  },
  
  // Mots-clés par type de contenu
  content: {
    articles: [
      "articles jonathan anguelov investissement immobilier",
      "conseils investissement immobilier offstone",
      "guides investissement immobilier jonathan anguelov"
    ],
    videos: [
      "vidéos jonathan anguelov investissement immobilier",
      "webinaires offstone investissement immobilier",
      "formations vidéo jonathan anguelov"
    ],
    podcasts: [
      "podcasts jonathan anguelov investissement immobilier",
      "interviews jonathan anguelov offstone",
      "émissions jonathan anguelov immobilier"
    ]
  }
};

// Fonction pour générer des mots-clés combinés
export function generateCombinedKeywords(baseKeywords: string[], modifiers: string[]): string[] {
  const combinations: string[] = [];
  
  baseKeywords.forEach(base => {
    modifiers.forEach(modifier => {
      combinations.push(`${base} ${modifier}`);
      combinations.push(`${modifier} ${base}`);
    });
  });
  
  return combinations;
}

// Fonction pour obtenir des mots-clés par catégorie
export function getKeywordsByCategory(category: keyof typeof longTailKeywords.intent): string[] {
  return longTailKeywords.intent[category];
}

// Fonction pour obtenir tous les mots-clés long-tail
export function getAllLongTailKeywords(): string[] {
  const allKeywords: string[] = [];
  
  // Ajouter les mots-clés primaires
  allKeywords.push(...longTailKeywords.primary);
  
  // Ajouter les mots-clés par intention
  Object.values(longTailKeywords.intent).forEach(keywords => {
    allKeywords.push(...keywords);
  });
  
  // Ajouter les mots-clés géographiques
  allKeywords.push(...longTailKeywords.geographic);
  
  // Ajouter les mots-clés par secteur
  Object.values(longTailKeywords.sector).forEach(keywords => {
    allKeywords.push(...keywords);
  });
  
  // Ajouter les mots-clés par type d'investisseur
  Object.values(longTailKeywords.investorType).forEach(keywords => {
    allKeywords.push(...keywords);
  });
  
  // Ajouter les mots-clés par montant
  Object.values(longTailKeywords.investmentAmount).forEach(keywords => {
    allKeywords.push(...keywords);
  });
  
  // Ajouter les mots-clés par type de contenu
  Object.values(longTailKeywords.content).forEach(keywords => {
    allKeywords.push(...keywords);
  });
  
  return [...new Set(allKeywords)]; // Supprimer les doublons
}

// Mots-clés les plus importants pour le SEO
export const priorityKeywords = [
  "offstone jonathan anguelov",
  "jonathan anguelov offstone",
  "investir avec jonathan anguelov",
  "club de deals jonathan anguelov",
  "investissement immobilier jonathan anguelov",
  "expert investissement immobilier jonathan anguelov",
  "accompagnement investissement immobilier offstone",
  "deals immobiliers exclusifs jonathan anguelov",
  "club investisseurs immobiliers offstone",
  "investissement immobilier professionnel offstone"
];
