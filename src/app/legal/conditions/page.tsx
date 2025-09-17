import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation | Offstone",
  description: "Conditions générales d'utilisation du site Offstone - Découvrez nos conditions d'accès, d'utilisation et de confidentialité.",
  robots: "index, follow",
};

export default function CGUPage() {
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
              <span className="text-gray-600 text-sm tracking-[0.15em] font-medium uppercase">CONDITIONS D'UTILISATION</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tighter leading-tight text-black">
              Conditions Générales d'Utilisation
            </h1>
            <p className="text-lg text-gray-600 mt-3 text-center max-w-2xl">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
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
              
              {/* Article 1 */}
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
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Objet et opposabilité
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <p>
                      Les présentes conditions générales d'utilisation (les « CGU ») encadrent l'accès et l'usage du site www.offstone.fr (le « Site ») édité par Offstone, SAS en cours d'immatriculation, siège : 60 rue La Boétie, 75008 Paris (« Offstone », « nous »).
                    </p>
                    <p>
                      Le simple accès au Site emporte acceptation pleine et sans réserve des CGU. Si vous refusez les CGU, vous devez quitter le Site et vous abstenir de toute utilisation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article 2 */}
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
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Statut d'Offstone et nature des services
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div className="space-y-2">
                      <p><strong>2.1.</strong> Offstone est un club d'investissement permettant à ses membres d'investir dans des opérations immobilières exclusives, proposées depuis la plateforme.</p>
                      <p><strong>2.2.</strong> Les contenus du Site sont informatifs et généraux. Ils ne constituent pas de conseils en investissement personnalisés.</p>
                      <p><strong>2.3.</strong> Les informations relatives aux opportunités d'investissement sont diffusées dans un cadre privé, restreint et sur invitation uniquement, en-dessous des seuils prospectus applicables.</p>
                      <p><strong>2.4.</strong> Offstone opère sous le régime du Cercle Privé et réserve ses opportunités d'investissement à un cercle restreint d'investisseurs particuliers et personnes morales.</p>
                    </div>
                    
                    {/* Avertissement important - Style Offstone */}
                    <div className="mt-6 p-6 bg-gray-100 border border-gray-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-black mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-semibold mb-3" style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', color: '#F7B096' }}>
                            AVERTISSEMENT IMPORTANT
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Investir en immobilier non coté présente un risque de perte en capital et d'illiquidité. Investissez uniquement l'argent dont vous n'avez pas besoin immédiatement et diversifiez vos placements. Offstone opère dans le cadre d'un cercle privé et réserve ses opportunités d'investissement à un cercle restreint d'investisseurs (personnes physiques et morales).
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed mt-3">
                            Offstone ne propose pas de conseils en investissement. Rien ici ne doit être considéré comme une recommandation d'investir dans un titre quel qu'il soit. Les documents relatifs à votre investissement via un SPV dédié, disponibles dans votre espace compte sécurisé, décrivent les risques potentiels, les frais et les dépenses. Veuillez lire attentivement ces avertissements de risques. La valeur des investissements peut varier dans le temps. Les investissements en immobilier via nos club-deals ont un horizon de sortie à moyen terme (2 à 5 ans) avec une liquidité limitée. Les performances passées ne garantissent pas les rendements futurs. Investir dans un club-deal immobilier n'est pas comparable à un dépôt bancaire.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article 3 */}
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
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Accès – Invitation – Éligibilité
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div className="space-y-2">
                      <p><strong>3.1.</strong> Certaines sections, données, « data rooms » et documents (les « Contenus Restreints ») ne sont accessibles que sur invitation nominative délivrée par Offstone, à sa seule discrétion. Offstone peut refuser, limiter, suspendre ou retirer tout accès, sans préavis ni motivation.</p>
                      <p><strong>3.2.</strong> L'accès peut être conditionné à des vérifications (ex. KYC/LCB-FT, compréhension des risques, acceptation de clauses de confidentialité ou d'un NDA).</p>
                      <p><strong>3.3.</strong> Le Site est destiné à des personnes majeures, juridiquement capables.</p>
                      <p><strong>3.4.</strong> L'indexation, le scraping, l'extraction, la collecte automatisée ou systématique de données, ainsi que l'utilisation de robots, spiders ou outils analogues, sont strictement interdits.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article 4 */}
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
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Comptes et sécurité
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div className="space-y-2">
                      <p><strong>4.1.</strong> Les informations fournies lors de la création et l'usage du compte doivent être exactes, complètes et à jour.</p>
                      <p><strong>4.2.</strong> Les identifiants sont personnels et confidentiels ; toute action via votre compte est réputée émaner de vous. Informez-nous sans délai de tout accès non autorisé.</p>
                      <p><strong>4.3.</strong> Offstone peut suspendre ou fermer un compte en cas de non-respect des CGU, de risque juridique, de sécurité ou sur simple décision interne.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article 5 */}
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
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Droits d'accès strictement limités – Aucun droit cédé
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div className="space-y-2">
                      <p><strong>5.1.</strong> Aucun droit de propriété intellectuelle ni licence n'est accordé à l'utilisateur, à quelque titre que ce soit.</p>
                      <p><strong>5.2.</strong> Offstone concède uniquement un droit d'accès temporaire et révocable au Site, non exclusif, non transférable et non sous-licenciable, aux seules fins de consultation via un navigateur, dans le strict respect des CGU.</p>
                      <p><strong>5.3.</strong> Sont interdits : toute reproduction, représentation, diffusion, adaptation, modification, publication, copie (y compris captures/exports), extraction substantielle ou répétée, mise à disposition de tiers, rétro-ingénierie, décompilation, désassemblage, ou tout usage autre que la simple consultation.</p>
                      <p><strong>5.4.</strong> Tout téléchargement éventuel ne confère aucun droit : sauf autorisation écrite d'Offstone, les documents demeurent strictement confidentiels (cf. art. 6).</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article 6 */}
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
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Confidentialité des Contenus Restreints
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div className="space-y-2">
                      <p><strong>6.1.</strong> Les Contenus Restreints, incluant sans s'y limiter informations financières, documents d'investissement, présentations, données de sociétés, données de marché, supports et fichiers, sont confidentiels.</p>
                      <p><strong>6.2.</strong> Vous vous engagez à : (i) les garder strictement confidentiels ; (ii) ne les utiliser qu'aux seules fins d'évaluation interne ; (iii) ne les divulguer à aucun tiers sans l'accord écrit d'Offstone ; (iv) imposer des obligations équivalentes à vos éventuels conseillers internes dûment informés du caractère confidentiel.</p>
                      <p><strong>6.3.</strong> Offstone peut tracer, filigraner ou journaliser les accès. À la première demande, vous devez retourner/supprimer les documents confidentiels.</p>
                      <p><strong>6.4.</strong> Toute violation de confidentialité autorise Offstone à prendre toute mesure utile, y compris injonction, suspension d'accès, et réparation du préjudice.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article 7 */}
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
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Processus d'investissement (si existant)
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div className="space-y-2">
                      <p><strong>7.1.</strong> Les souscriptions éventuelles interviennent hors Site ou via une interface dédiée et sécurisée, sous réserve d'acceptation par l'émetteur ou l'intermédiaire compétent.</p>
                      <p><strong>7.2.</strong> Des vérifications KYC/LCB-FT et des critères d'éligibilité peuvent être requis avant toute souscription.</p>
                      <p><strong>7.3.</strong> Offstone ne garantit ni la disponibilité des dossiers ni leur succès ou performance.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article 8 */}
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
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Avertissement sur les risques
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <p>
                      L'investissement dans des sociétés non cotées comporte des risques de perte partielle ou totale du capital, un risque d'illiquidité, de dilution et des risques spécifiques aux projets. Les performances passées ne préjugent pas des performances futures. Vous demeurez seul responsable de vos décisions, après vos propres vérifications et conseils indépendants.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article 9 */}
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
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Données personnelles et cookies
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div className="space-y-2">
                      <p><strong>9.1.</strong> Les traitements de données sont décrits dans la Politique de confidentialité disponible à l'adresse /confidentialite.</p>
                      <p><strong>9.2.</strong> Les cookies et traceurs, ainsi que vos choix de consentement, sont détaillés dans la page /cookies ; un lien « Cookies » figure en pied de page et permet de gérer vos préférences à tout moment.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article 10 */}
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
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Disponibilité, sécurité et maintenance
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div className="space-y-2">
                      <p><strong>10.1.</strong> Offstone s'efforce de maintenir le Site accessible 24/7, sans garantie. Des interruptions (maintenance, sécurité, évolutions, force majeure) peuvent survenir sans préavis.</p>
                      <p><strong>10.2.</strong> Offstone met en œuvre des mesures raisonnables de sécurité ; l'internet comportant des risques, vous devez utiliser des équipements et logiciels à jour.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article 11 */}
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
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Responsabilités – Garanties
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div className="space-y-2">
                      <p><strong>11.1.</strong> Le Site et ses contenus sont fournis "en l'état", sans garantie d'exactitude, d'exhaustivité, de disponibilité ou d'adéquation à un besoin particulier.</p>
                      <p><strong>11.2.</strong> Dans les limites permises par la loi, Offstone décline toute responsabilité pour tout dommage indirect, accessoire, immatériel, perte de profit, de données ou d'image résultant de l'accès ou de l'usage du Site.</p>
                      <p><strong>11.3.</strong> Vous êtes responsable de votre conformité aux lois et de tout usage interdit du Site ou des Contenus Restreints.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article 12 */}
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
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Propriété intellectuelle – Tous droits réservés
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div className="space-y-2">
                      <p><strong>12.1.</strong> L'ensemble des éléments du Site (textes, données, visuels, logos, marques, logiciels, bases de données, architecture, code, etc.) est protégé et demeure la propriété exclusive d'Offstone et/ou de ses concédants.</p>
                      <p><strong>12.2.</strong> Aucun droit n'est cédé ou concédé par les présentes, en dehors du simple droit d'accès défini à l'article 5.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article 13 */}
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
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Liens et ressources de tiers
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <p>
                      Les liens externes sont fournis à titre de commodité ; Offstone n'exerce aucun contrôle sur ces ressources et décline toute responsabilité quant à leur contenu, sécurité ou politiques.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article 14 */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    14
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Mesures en cas de violation – Résiliation
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <p>
                      Sans préjudice de tous droits, Offstone peut suspendre/retirer l'accès au Site et/ou aux Contenus Restreints, supprimer un compte, désactiver des identifiants et engager toute action (y compris judiciaire) en cas de violation des CGU, d'atteinte à la confidentialité, de sécurité ou aux droits d'Offstone.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article 15 */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    15
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Preuve
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <p>
                      Les enregistrements systèmes, journaux et horodatages d'Offstone font foi des opérations intervenues sur le Site, sauf preuve contraire.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article 16 */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    16
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Modifications des CGU
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <p>
                      Offstone peut modifier les CGU à tout moment. La version opposable est celle en ligne au moment de l'accès. En cas de changement substantiel, une information pourra être affichée sur le Site.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article 17 */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    17
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Droit applicable – Juridiction
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <p>
                      Les CGU sont régies par le droit français. Tout différend relatif à leur validité, interprétation ou exécution relève des tribunaux compétents de Paris, sous réserve des règles impératives.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article 18 */}
              <div className="relative flex flex-row items-center w-full animate-on-scroll">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 bg-transparent z-10 mr-8"
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)' }}>
                  <span className="text-[28px] font-medium text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '0.01em' }}>
                    18
                  </span>
                </div>
                <div className="flex-1 bg-transparent border border-gray-200 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 text-left shadow-sm" style={{backdropFilter:'blur(2px)'}}>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-black"
                    style={{ fontFamily: 'AllianceNo1-Regular,sans-serif', letterSpacing: '-0.01em' }}>
                    Contact
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div className="space-y-2">
                      <p><strong>Offstone – CGU</strong></p>
                      <p>60 rue La Boétie, 75008 Paris, France</p>
                      <p>E-mail : contact@offstone.fr</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}