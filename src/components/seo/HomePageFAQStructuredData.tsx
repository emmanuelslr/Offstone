'use client';

import { useEffect } from 'react';

// Données des FAQ de la home page (extrait du composant FAQ.tsx)
const homePageFAQs = [
  {
    question: "Comment fonctionne le co-investissement ?",
    answer: "Nous investissons notre capital dans les mêmes opérations et aux mêmes conditions que vous pour un alignement total."
  },
  {
    question: "Qui peut investir et quel est le ticket d'entrée ?",
    answer: "Particuliers avertis et investisseurs professionnels, en direct ou via votre société, avec ticket précisé pour chaque dossier."
  },
  {
    question: "Comment sélectionnez-vous les opportunités ?",
    answer: "Sourcing direct, analyse complète et entrée uniquement si le prix offre une marge de sécurité avec un plan de création de valeur documenté."
  },
  {
    question: "Quels rendements viser et quelle durée d'investissement ?",
    answer: "Objectifs indicatifs: Taux de rendement interne (TRI) net 8 à 14 %, durée 2 à 5 ans selon l'actif. Performance non garantie. Les performances passées ne préjugent pas des résultats futurs. Investir comporte des risques de perte en capital. Les investissements sont illiquides et ne sont pas garantis."
  },
  {
    question: "Quelle liquidité et quel calendrier de distributions ?",
    answer: "Liquidité limitée avant la sortie. Quand pertinent, objectif de revenu courant 2 à 4 % par an, versé trimestriellement ou semestriellement."
  }
];

export default function HomePageFAQStructuredData() {
  useEffect(() => {
    try {
      // Vérifier que les données FAQ existent
      if (!homePageFAQs || !Array.isArray(homePageFAQs) || homePageFAQs.length === 0) {
        console.warn('HomePageFAQStructuredData: No FAQ data available');
        return;
      }

      // Générer les données structurées FAQ pour la home page
      const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": homePageFAQs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(faqStructuredData);
      script.id = 'homepage-faq-structured-data';
      
      // Remove existing script
      const existingScript = document.getElementById('homepage-faq-structured-data');
      if (existingScript) {
        existingScript.remove();
      }
      
      document.head.appendChild(script);
      
      return () => {
        const scriptToRemove = document.getElementById('homepage-faq-structured-data');
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    } catch (error) {
      console.error('HomePageFAQStructuredData: Error creating FAQ structured data:', error);
    }
  }, []);

  return null; // Ce composant ne rend rien visuellement
}
