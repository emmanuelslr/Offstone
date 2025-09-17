import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "Procédure de réclamations | Offstone",
  description: "Procédure de réclamations Offstone - Comment déposer une réclamation, délais de traitement et recours disponibles.",
  robots: "index, follow",
};

export default function ReclamationsPage() {
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
              <span className="text-gray-600 text-sm tracking-[0.15em] font-medium uppercase">PROCÉDURE DE RÉCLAMATIONS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tighter leading-tight text-black">
              Procédure de réclamations
            </h1>
            <p className="text-lg text-gray-600 mt-3 text-center max-w-2xl">
              Comment déposer une réclamation et obtenir une réponse
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
                    Cette procédure organise la réception, l'instruction et la réponse aux réclamations adressées à Offstone par ses utilisateurs, partenaires ou tiers. Elle s'applique à toute expression écrite d'un mécontentement relative à un service, un contenu, un traitement de données, une relation contractuelle ou une pratique d'Offstone.
                  </p>
                </div>
              </div>

              {/* Objet */}
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
                    Objet
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>Organiser la réception, l'instruction et la réponse aux réclamations adressées à Offstone par ses utilisateurs, partenaires ou tiers.</p>
                  </div>
                </div>
              </div>

              {/* Définition */}
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
                    Définition
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>Est une réclamation toute expression écrite d'un mécontentement (e-mail ou courrier) relative à un service, un contenu, un traitement de données, une relation contractuelle ou une pratique d'Offstone. Les demandes d'information n'en font pas partie.</p>
                  </div>
                </div>
              </div>

              {/* Canaux de dépôt */}
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
                    Canaux de dépôt
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div>
                      <p className="font-semibold text-black mb-1">E-mail :</p>
                      <p><a href="mailto:reclamations@offstone.fr" className="text-black hover:text-gray-600 underline">reclamations@offstone.fr</a></p>
                    </div>
                    <div>
                      <p className="font-semibold text-black mb-1">Courrier :</p>
                      <p>Offstone – Réclamations<br />60 rue La Boétie, 75008 Paris</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      <strong>Merci d'indiquer :</strong> identité/coordonnées, description précise des faits, date/URL concernées, documents utiles (captures, références).
                    </p>
                  </div>
                </div>
              </div>

              {/* Accusé de réception & délais */}
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
                    Accusé de réception & délais
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Accusé de réception :</strong> sous 10 jours ouvrés maximum</li>
                      <li><strong>Réponse définitive :</strong> dans un délai cible de 2 mois maximum</li>
                      <li><strong>Suivi :</strong> en cas d'investigations supplémentaires, une information de suivi est communiquée</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Instruction et décision */}
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
                    Instruction et décision
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>Instruction par le Responsable de la conformité (le Président) ou une personne habilitée, de façon objective et impartiale.</p>
                    <p>Analyse des faits, échanges pour précisions, vérification des obligations légales/contractuelles.</p>
                    <p>Décision motivée (acceptation totale/partielle ou rejet) et, le cas échéant, mesures correctives.</p>
                  </div>
                </div>
              </div>

              {/* Escalade interne */}
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
                    Escalade interne
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>Si la réponse ne vous satisfait pas, demande de réexamen auprès de la direction : <a href="mailto:direction@offstone.fr" className="text-black hover:text-gray-600 underline">direction@offstone.fr</a> en rappelant la référence de la réclamation.</p>
                  </div>
                </div>
              </div>

              {/* Médiation / recours externes */}
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
                    Médiation / recours externes
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div>
                      <p className="font-semibold text-black mb-1">Clients consommateurs (B2C) :</p>
                      <p>Si Offstone venait à proposer des services à des consommateurs, un médiateur de la consommation sera désigné et ses coordonnées seront publiées sur le Site ; elles seront communiquées sur demande.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-black mb-1">Hors B2C / non applicable :</p>
                      <p>Si Offstone s'adresse exclusivement à des investisseurs non-consommateurs, la médiation de la consommation est non applicable.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-black mb-1">Données personnelles :</p>
                      <p>Pour les litiges relatifs à la protection des données, et après échange avec Offstone, vous pouvez saisir la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 underline">CNIL</a>.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidentialité & données */}
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
                    Confidentialité & données
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>Les réclamations sont traitées de manière confidentielle et conformément à la Politique de confidentialité. Les données sont conservées pour la durée nécessaire au traitement et aux obligations légales.</p>
                  </div>
                </div>
              </div>

              {/* Registre & amélioration continue */}
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
                    Registre & amélioration continue
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>Offstone tient un registre des réclamations (dates, objet, actions, décision, délais) afin d'assurer le suivi et l'amélioration des processus.</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
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
                    Contact
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p><strong className="text-black">Pour toute question relative à cette procédure :</strong></p>
                    <p><strong>Offstone – Réclamations</strong></p>
                    <p>60 rue La Boétie, 75008 Paris, France</p>
                    <p><strong>E-mail :</strong> <a href="mailto:reclamations@offstone.fr" className="text-black hover:text-gray-600 underline">reclamations@offstone.fr</a></p>
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

