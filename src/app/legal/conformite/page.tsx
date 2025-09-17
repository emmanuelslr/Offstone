import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "Politique de conformité | Offstone",
  description: "Politique de conformité Offstone - Principes et procédures internes en matière de conformité, prévention de la corruption et lutte contre le blanchiment.",
  robots: "index, follow",
};

export default function ConformitePage() {
  return (
    <main className="relative bg-white">
      <style dangerouslySetInnerHTML={{
        __html: `
          .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          
          .animate-on-scroll:nth-child(1) { animation-delay: 0.1s; }
          .animate-on-scroll:nth-child(2) { animation-delay: 0.2s; }
          .animate-on-scroll:nth-child(3) { animation-delay: 0.3s; }
          .animate-on-scroll:nth-child(4) { animation-delay: 0.4s; }
          .animate-on-scroll:nth-child(5) { animation-delay: 0.5s; }
          .animate-on-scroll:nth-child(6) { animation-delay: 0.6s; }
          .animate-on-scroll:nth-child(7) { animation-delay: 0.7s; }
          .animate-on-scroll:nth-child(8) { animation-delay: 0.8s; }
          .animate-on-scroll:nth-child(9) { animation-delay: 0.9s; }
          .animate-on-scroll:nth-child(10) { animation-delay: 1.0s; }
          .animate-on-scroll:nth-child(11) { animation-delay: 1.1s; }
          .animate-on-scroll:nth-child(12) { animation-delay: 1.2s; }
          .animate-on-scroll:nth-child(13) { animation-delay: 1.3s; }
          .animate-on-scroll:nth-child(14) { animation-delay: 1.4s; }
          .animate-on-scroll:nth-child(15) { animation-delay: 1.5s; }
          .animate-on-scroll:nth-child(16) { animation-delay: 1.6s; }
          .animate-on-scroll:nth-child(17) { animation-delay: 1.7s; }
          .animate-on-scroll:nth-child(18) { animation-delay: 1.8s; }
          
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
      {/* Fixed Navbar */}
      <Navbar forceWhiteStyle={true} />
      
      {/* Hero Section */}
      <div className="pt-40 pb-8" style={{ backgroundColor: '#F7F5F2' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col items-center justify-center animate-on-scroll">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: '#96D5F7' }} />
              <span className="text-gray-600 text-sm tracking-[0.15em] font-medium uppercase">POLITIQUE DE CONFORMITÉ</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tighter leading-tight text-black">
              Politique de conformité
            </h1>
            <p className="text-lg text-gray-600 mt-3 text-center max-w-2xl">
              Principes et procédures internes en matière de conformité
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full py-12 sm:py-16 lg:py-20" style={{ backgroundColor: '#F3F4F6' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="relative flex flex-col items-start pl-6 sm:pl-10">
            {/* Ligne verticale */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" style={{ zIndex: 0 }} />
            
            <div className="w-full flex flex-col gap-8 z-10">
              
              {/* Introduction */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    •
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <p className="text-gray-600 text-[15px] leading-relaxed">
                    <strong>Éditeur :</strong> Offstone, SAS en cours d'immatriculation – 60 rue La Boétie, 75008 Paris
                  </p>
                  <p className="text-gray-600 text-[15px] leading-relaxed mt-3">
                    La présente politique définit les principes et procédures internes d'Offstone en matière de conformité et s'applique à l'ensemble des activités, dirigeants, collaborateurs et prestataires d'Offstone.
                  </p>
                </div>
              </div>

              {/* Objet et champ d'application */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    01
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{fontFamily:'AllianceNo1-Regular,sans-serif',letterSpacing:'-0.01em'}}>
                    Objet et champ d'application
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>La présente politique définit les principes et procédures internes d'Offstone en matière de conformité et s'applique à l'ensemble des activités, dirigeants, collaborateurs et prestataires d'Offstone.</p>
                  </div>
                </div>
              </div>

              {/* Principes généraux */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    02
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{fontFamily:'AllianceNo1-Regular,sans-serif',letterSpacing:'-0.01em'}}>
                    Principes généraux
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Intégrité & transparence :</strong> conduite des activités avec probité et traçabilité</li>
                      <li><strong>Respect des lois :</strong> application des règles françaises et européennes applicables à Offstone</li>
                      <li><strong>Proportionnalité :</strong> dispositifs adaptés à la taille et au modèle d'affaires</li>
                      <li><strong>Amélioration continue :</strong> revue et mise à jour périodiques</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Gouvernance de la conformité */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    03
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{fontFamily:'AllianceNo1-Regular,sans-serif',letterSpacing:'-0.01em'}}>
                    Gouvernance de la conformité
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div>
                      <p className="font-semibold text-black mb-1">Responsable de la conformité :</p>
                      <p>le Président d'Offstone</p>
                    </div>
                    <div>
                      <p className="font-semibold text-black mb-1">Point de contact :</p>
                      <p><a href="mailto:contact@offstone.fr" className="text-black hover:text-gray-600 underline">contact@offstone.fr</a></p>
                    </div>
                    <div>
                      <p className="font-semibold text-black mb-1">Missions :</p>
                      <p>piloter le dispositif, conseiller la direction, réaliser les contrôles, traiter les alertes et réclamations au sens conformité, assurer la sensibilisation des équipes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prévention de la corruption */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    04
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{fontFamily:'AllianceNo1-Regular,sans-serif',letterSpacing:'-0.01em'}}>
                    Prévention de la corruption & trafic d'influence
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Tolérance zéro</strong> pour toute forme de corruption active ou passive</li>
                      <li><strong>Cadeaux & invitations :</strong> uniquement modestes, occasionnels, transparents ; enregistrement au-delà d'un seuil interne</li>
                      <li><strong>Due diligence tiers :</strong> vérifications proportionnées (identité, réputation, sanctions, PEP le cas échéant)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Lutte contre le blanchiment */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    05
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{fontFamily:'AllianceNo1-Regular,sans-serif',letterSpacing:'-0.01em'}}>
                    Lutte contre le blanchiment et le financement du terrorisme (LCB-FT)
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>KYC :</strong> identification et vérification d'identité (incluant bénéficiaires effectifs si personne morale)</li>
                      <li><strong>Approche par les risques :</strong> profil, provenance et nature des fonds</li>
                      <li><strong>Listes sanctions/PEP :</strong> criblage si nécessaire</li>
                      <li><strong>Surveillance & conservation :</strong> contrôles et archivage selon les durées légales</li>
                    </ul>
                    <p className="text-sm text-gray-500 mt-3">
                      Si l'intermédiation financière est opérée via un partenaire agréé, celui-ci applique ses propres procédures ; Offstone coopère et transmet les informations requises.
                    </p>
                  </div>
                </div>
              </div>

              {/* Conflits d'intérêts */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    06
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{fontFamily:'AllianceNo1-Regular,sans-serif',letterSpacing:'-0.01em'}}>
                    Conflits d'intérêts
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Cartographie des situations à risque</li>
                      <li><strong>Mesures :</strong> séparation fonctionnelle, transparence, abstention, refus d'opération, enregistrement des cas</li>
                      <li>Déclaration immédiate de tout conflit potentiel</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Communication & marketing */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    07
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{fontFamily:'AllianceNo1-Regular,sans-serif',letterSpacing:'-0.01em'}}>
                    Communication & marketing
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Exactitude :</strong> informations claires et non trompeuses</li>
                      <li><strong>Pas d'offre au public :</strong> communication sur invitation, dans un cadre privé ; pas de démarchage prohibé</li>
                      <li><strong>Avertissements :</strong> rappel des risques d'investissement et de l'absence de garantie de performance</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Données personnelles & sécurité */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    08
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{fontFamily:'AllianceNo1-Regular,sans-serif',letterSpacing:'-0.01em'}}>
                    Données personnelles & sécurité de l'information
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>RGPD :</strong> conformité à la Politique de confidentialité (finalités, bases, droits, durées)</li>
                      <li><strong>Sécurité :</strong> contrôles d'accès, chiffrement en transit, sauvegardes, journalisation, gestion des incidents</li>
                      <li><strong>Sous-traitants :</strong> contrats conformes (art. 28 RGPD) et revues périodiques</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Prestataires & partenaires */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    09
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{fontFamily:'AllianceNo1-Regular,sans-serif',letterSpacing:'-0.01em'}}>
                    Prestataires & partenaires
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Due diligence :</strong> capacité, conformité, sécurité, localisation des traitements</li>
                      <li><strong>Contrats :</strong> confidentialité, conformité, sécurité, réversibilité</li>
                      <li><strong>Suivi :</strong> revues périodiques et plans d'actions en cas d'écarts</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tenue des registres */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    10
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{fontFamily:'AllianceNo1-Regular,sans-serif',letterSpacing:'-0.01em'}}>
                    Tenue des registres
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Traçabilité :</strong> conservation des documents essentiels (contrôles, incidents, réclamations)</li>
                      <li><strong>Durées :</strong> selon la loi et les politiques internes</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Dispositif d'alerte interne */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    11
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{fontFamily:'AllianceNo1-Regular,sans-serif',letterSpacing:'-0.01em'}}>
                    Dispositif d'alerte interne
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <div>
                      <p className="font-semibold text-black mb-1">Canal d'alerte :</p>
                      <p><a href="mailto:contact@offstone.fr" className="text-black hover:text-gray-600 underline">contact@offstone.fr</a></p>
                    </div>
                    <div>
                      <p className="font-semibold text-black mb-1">Champ :</p>
                      <p>faits potentiels de corruption, fraude, atteintes graves à la sécurité, violations manifestes de la loi ou des politiques internes</p>
                    </div>
                    <div>
                      <p className="font-semibold text-black mb-1">Protection :</p>
                      <p>confidentialité du traitement et protection contre les représailles de bonne foi</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contrôles, audits & formation */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    12
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{fontFamily:'AllianceNo1-Regular,sans-serif',letterSpacing:'-0.01em'}}>
                    Contrôles, audits & formation
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Contrôles planifiés (opérationnels & conformité)</li>
                      <li>Sensibilisation périodique des équipes (corruption, LCB-FT, données, conflits d'intérêts)</li>
                      <li>Revue annuelle au minimum de la présente politique</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    13
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{fontFamily:'AllianceNo1-Regular,sans-serif',letterSpacing:'-0.01em'}}>
                    Contact
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p><strong className="text-black">Pour toute question relative à cette politique :</strong></p>
                    <p><strong>Offstone – Conformité</strong></p>
                    <p>60 rue La Boétie, 75008 Paris, France</p>
                    <p><strong>E-mail :</strong> <a href="mailto:contact@offstone.fr" className="text-black hover:text-gray-600 underline">contact@offstone.fr</a></p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          {/* Dernière mise à jour */}
          <div className="mt-12 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

