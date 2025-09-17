import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Offstone",
  description: "Politique de confidentialité Offstone - Protection des données personnelles, RGPD, cookies et gestion de vos informations.",
  robots: "index, follow",
};

export default function ConfidentialitePage() {
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
              <span className="text-gray-600 text-sm tracking-[0.15em] font-medium uppercase">PROTECTION DES DONNÉES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tighter leading-tight text-black">
              Politique de confidentialité
            </h1>
            <p className="text-lg text-gray-600 mt-3 text-center max-w-2xl">
              Protection de vos données personnelles et conformité RGPD
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
                    La présente politique décrit la manière dont Offstone (ci-après « Offstone », « nous », « notre ») traite les données à caractère personnel des visiteurs et utilisateurs du site <strong>www.offstone.fr</strong> (ci-après le « Site ») et, le cas échéant, de ses services d'investissement en club deal (les « Services »).
                  </p>
                  <p className="text-gray-600 text-[15px] leading-relaxed mt-3">
                    Nous nous conformons au Règlement (UE) 2016/679 du 27 avril 2016 (RGPD) et à la loi n° 78-17 du 6 janvier 1978 modifiée.
                  </p>
                </div>
              </div>

              {/* Responsable du traitement */}
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
                    Qui est responsable du traitement ?
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p><strong className="text-black">Offstone</strong>, société par actions simplifiée en cours d'immatriculation, dont le siège social est sis 60 rue La Boétie, 75008 Paris (France), est responsable du traitement pour les opérations décrites ci-après.</p>
                    <p><strong>Point de contact RGPD :</strong> <a href="mailto:privacy@offstone.fr" className="text-black hover:text-gray-600 underline">privacy@offstone.fr</a></p>
                    <p><strong>Délégué à la protection des données (DPO) :</strong> non désigné</p>
                  </div>
                </div>
              </div>

              {/* Données collectées */}
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
                    Quelles données collectons-nous ?
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>Nous ne collectons que les données strictement nécessaires :</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Identité et contact :</strong> nom, prénom, adresse e-mail, téléphone, pays</li>
                      <li><strong>Compte :</strong> identifiants, historique d'accès, préférences</li>
                      <li><strong>Données "investisseur" :</strong> éléments permettant de qualifier votre profil, intérêts d'investissement, souscriptions</li>
                      <li><strong>KYC/LCB-FT :</strong> justificatifs d'identité, informations relatives à la lutte contre le blanchiment</li>
                      <li><strong>Échanges :</strong> messages via formulaires, support, emails</li>
                      <li><strong>Techniques & navigation :</strong> logs, adresses IP, pages consultées, cookies</li>
                    </ul>
                    <p className="text-sm text-gray-500 mt-3">
                      Les données marquées comme obligatoires sont nécessaires à la fourniture des Services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Finalités et bases légales */}
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
                    Pourquoi traitons-nous vos données ?
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 font-semibold text-black">Finalité</th>
                            <th className="text-left py-2 font-semibold text-black">Base légale</th>
                          </tr>
                        </thead>
                        <tbody className="space-y-2">
                          <tr className="border-b border-gray-100">
                            <td className="py-2">Création et gestion de compte</td>
                            <td className="py-2">Exécution du contrat</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2">Qualification investisseur</td>
                            <td className="py-2">Intérêt légitime + obligations réglementaires</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2">Information sur les deals</td>
                            <td className="py-2">Exécution du contrat</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2">KYC/LCB-FT</td>
                            <td className="py-2">Obligation légale</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2">Prospection</td>
                            <td className="py-2">Consentement ou intérêt légitime</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2">Amélioration du Site</td>
                            <td className="py-2">Intérêt légitime</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      Nous n'effectuons pas de décision produisant des effets juridiques exclusivement automatisée.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sources des données */}
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
                    D'où proviennent les données ?
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Directement de vous :</strong> formulaires, compte, échanges</li>
                      <li><strong>Automatiquement :</strong> via votre navigation (cookies/traceurs)</li>
                      <li><strong>Sources tierces :</strong> pour KYC/LCB-FT (listes de sanctions, bases officielles), dans le strict respect des obligations légales</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Accès aux données */}
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
                    Qui peut accéder à vos données ?
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Équipes internes :</strong> dûment habilitées (besoin d'en connaître)</li>
                      <li><strong>Sous-traitants techniques :</strong> hébergement, envoi d'e-mails, outils analytiques, CRM</li>
                      <li><strong>Partenaires opérationnels :</strong> prestataires de paiement, dépositaires, conseils</li>
                      <li><strong>Autorités :</strong> administratives/judiciaires lorsque la loi l'exige</li>
                    </ul>
                    <p className="text-sm text-gray-500 mt-3">
                      <strong>Nous ne vendons pas vos données personnelles.</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Transferts hors UE */}
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
                    Où sont traitées vos données ?
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>L'hébergement applicatif est assuré par <strong>Vercel Inc.</strong> (États-Unis). Vercel peut s'appuyer sur des fournisseurs cloud (notamment AWS).</p>
                    <p>Si des transferts vers des pays situés hors de l'UE/EEE interviennent, nous mettons en place des garanties appropriées (Clauses Contractuelles Types de la Commission européenne, mesures de sécurité additionnelles).</p>
                    <p>Vous pouvez obtenir des informations sur ces garanties en nous écrivant à <a href="mailto:privacy@offstone.fr" className="text-black hover:text-gray-600 underline">privacy@offstone.fr</a>.</p>
                  </div>
                </div>
              </div>

              {/* Cookies */}
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
                    Cookies & traceurs
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>Nous utilisons des cookies/traceurs pour :</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>assurer le fonctionnement du Site (techniques/fonctionnels)</li>
                      <li>mesurer l'audience et améliorer l'ergonomie (analytics)</li>
                      <li>personnaliser le contenu ou la prospection (marketing)</li>
                    </ul>
                    <p>Un bandeau de consentement vous permet d'accepter/refuser, globalement ou finalité par finalité. Vous pouvez retirer votre consentement à tout moment.</p>
                    <p className="text-sm text-gray-500 mt-3">
                      <strong>Durées :</strong> de la session à 13 mois pour les cookies soumis à consentement ; conservation des mesures d'audience jusqu'à 25 mois maximum.
                    </p>
                  </div>
                </div>
              </div>

              {/* Conservation des données */}
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
                    Combien de temps conservons-nous vos données ?
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 font-semibold text-black">Catégorie</th>
                            <th className="text-left py-2 font-semibold text-black">Durée</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-2">Compte & relation client</td>
                            <td className="py-2">Durée de la relation + 5 ans</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2">Prospection</td>
                            <td className="py-2">Jusqu'au retrait du consentement ou 3 ans</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2">Logs techniques</td>
                            <td className="py-2">6 mois à 1 an</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2">KYC/LCB-FT</td>
                            <td className="py-2">5 ans après la fin de la relation</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2">Contrats & comptabilité</td>
                            <td className="py-2">10 ans (obligations légales)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Droits des utilisateurs */}
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
                    Quels sont vos droits ?
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>Vous disposez des droits suivants (RGPD) : <strong>accès, rectification, effacement, limitation, opposition, portabilité</strong>, ainsi que du droit de définir des directives post-mortem.</p>
                    <p>Pour les traitements basés sur votre consentement, vous pouvez le retirer à tout moment.</p>
                    <p><strong>Exercer vos droits :</strong> écrivez-nous à <a href="mailto:privacy@offstone.fr" className="text-black hover:text-gray-600 underline">privacy@offstone.fr</a>, en joignant tout justificatif d'identité si nécessaire.</p>
                    <p>Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 underline">CNIL</a>.</p>
                  </div>
                </div>
              </div>

              {/* Sécurité */}
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
                    Sécurité
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>Nous mettons en œuvre des mesures techniques et organisationnelles conformes aux standards du marché : contrôles d'accès, chiffrement en transit, sauvegardes, journalisation, politiques de mots de passe, cloisonnement des environnements.</p>
                    <p>Vous êtes responsable de la confidentialité de vos identifiants et de l'usage de votre compte.</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
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
                    Contact
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p><strong className="text-black">Pour toute question relative à cette politique ou à vos données personnelles :</strong></p>
                    <p><strong>Offstone – Données personnelles</strong></p>
                    <p>60 rue La Boétie, 75008 Paris, France</p>
                    <p><strong>E-mail :</strong> <a href="mailto:privacy@offstone.fr" className="text-black hover:text-gray-600 underline">privacy@offstone.fr</a></p>
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
