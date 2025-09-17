import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "Politique de cookies | Offstone",
  description: "Politique de cookies Offstone - Gestion des cookies, traceurs et données de navigation conformément au RGPD.",
  robots: "index, follow",
};

export default function CookiesPage() {
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
              <span className="text-gray-600 text-sm tracking-[0.15em] font-medium uppercase">GESTION DES COOKIES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tighter leading-tight text-black">
              Politique de cookies
            </h1>
            <p className="text-lg text-gray-600 mt-3 text-center max-w-2xl">
              Gestion des cookies, traceurs et données de navigation
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
                    Cette politique explique comment Offstone utilise les cookies et autres technologies de suivi sur le site <strong>www.offstone.fr</strong>. Nous respectons votre vie privée et vous donnons le contrôle sur vos données de navigation.
                  </p>
                </div>
              </div>

              {/* Qu'est-ce qu'un cookie */}
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
                    Qu'est-ce qu'un cookie ?
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>Un cookie est un petit fichier texte stocké sur votre ordinateur, tablette ou smartphone lorsque vous visitez un site web. Les cookies permettent au site de mémoriser vos actions et préférences pendant une période donnée.</p>
                    <p>Les cookies ne peuvent pas endommager votre appareil et ne contiennent aucun virus. Ils sont essentiels au fonctionnement de nombreux sites web modernes.</p>
                  </div>
                </div>
              </div>

              {/* Types de cookies utilisés */}
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
                    Types de cookies utilisés
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div>
                      <p className="font-semibold text-black mb-1">Cookies strictement nécessaires</p>
                      <p>Ces cookies sont indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés et ne nécessitent pas votre consentement.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-black mb-1">Cookies de performance</p>
                      <p>Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site (pages visitées, temps passé, erreurs rencontrées).</p>
                    </div>
                    <div>
                      <p className="font-semibold text-black mb-1">Cookies marketing</p>
                      <p>Ces cookies permettent de mesurer l'efficacité de nos campagnes publicitaires et de personnaliser le contenu (LinkedIn Insight Tag, réseaux sociaux).</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cookies spécifiques */}
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
                    Cookies spécifiques utilisés
                  </h3>
                  <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 font-semibold text-black">Nom</th>
                            <th className="text-left py-2 font-semibold text-black">Finalité</th>
                            <th className="text-left py-2 font-semibold text-black">Durée</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-2">offstone-consent</td>
                            <td className="py-2">Mémoriser vos préférences de cookies</td>
                            <td className="py-2">6 mois</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2">LinkedIn Insight Tag</td>
                            <td className="py-2">Mesure de performance publicitaire</td>
                            <td className="py-2">13 mois</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2">Vercel Analytics</td>
                            <td className="py-2">Analyse d'audience anonymisée</td>
                            <td className="py-2">24 mois</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gestion de vos préférences */}
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
                    Gestion de vos préférences
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>Vous pouvez à tout moment modifier vos préférences de cookies :</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Via le bandeau de cookies :</strong> cliquez sur "Personnaliser" pour choisir par catégorie</li>
                      <li><strong>Via le lien footer :</strong> cliquez sur "Cookies" en bas de page pour rouvrir le panneau</li>
                      <li><strong>Via votre navigateur :</strong> paramètres de confidentialité pour bloquer/supprimer les cookies</li>
                    </ul>
                    <p className="text-sm text-gray-500 mt-3">
                      <strong>Note :</strong> Désactiver certains cookies peut affecter le fonctionnement du site.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cookies tiers */}
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
                    Cookies de tiers
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>Notre site peut contenir des cookies provenant de services tiers :</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>LinkedIn :</strong> pour mesurer l'efficacité de nos campagnes publicitaires</li>
                      <li><strong>Vercel :</strong> pour l'analyse d'audience et les performances techniques</li>
                      <li><strong>Réseaux sociaux :</strong> boutons de partage et widgets intégrés</li>
                    </ul>
                    <p>Ces services ont leurs propres politiques de cookies que nous vous encourageons à consulter.</p>
                  </div>
                </div>
              </div>

              {/* Durée de conservation */}
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
                    Durée de conservation
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>Les cookies sont conservés pour des durées variables selon leur finalité :</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Cookies de session :</strong> supprimés à la fermeture du navigateur</li>
                      <li><strong>Cookies persistants :</strong> de 1 mois à 2 ans maximum</li>
                      <li><strong>Cookies de consentement :</strong> 6 mois (renouvelable)</li>
                    </ul>
                    <p>Vous pouvez supprimer tous les cookies à tout moment via les paramètres de votre navigateur.</p>
                  </div>
                </div>
              </div>

              {/* Vos droits */}
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
                    Vos droits
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>Conformément au RGPD, vous disposez des droits suivants concernant vos données :</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Droit d'accès :</strong> connaître les données collectées</li>
                      <li><strong>Droit de rectification :</strong> corriger des informations inexactes</li>
                      <li><strong>Droit d'effacement :</strong> supprimer vos données</li>
                      <li><strong>Droit d'opposition :</strong> refuser le traitement</li>
                      <li><strong>Droit de portabilité :</strong> récupérer vos données</li>
                    </ul>
                    <p>Pour exercer ces droits, contactez-nous à <a href="mailto:privacy@offstone.fr" className="text-black hover:text-gray-600 underline">privacy@offstone.fr</a>.</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
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
                    Contact
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p><strong className="text-black">Pour toute question relative aux cookies :</strong></p>
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
