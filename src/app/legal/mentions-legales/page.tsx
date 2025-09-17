import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "Mentions légales | Offstone",
  description: "Mentions légales du site Offstone - Informations légales, éditeur, hébergement, propriété intellectuelle et protection des données.",
  robots: "index, follow",
};

export default function MentionsLegalesPage() {
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
              <span className="text-gray-600 text-sm tracking-[0.15em] font-medium uppercase">INFORMATIONS LÉGALES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tighter leading-tight text-black">
              Mentions légales
            </h1>
            <p className="text-lg text-gray-600 mt-3 text-center max-w-2xl">
              Informations légales concernant le site web Offstone
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
                    Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique et du Code monétaire et financier, il est précisé aux utilisateurs du site <strong>www.offstone.fr</strong> (le « Site ») l'identité des différents intervenants.
                  </p>
                </div>
              </div>

              {/* Éditeur du site */}
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
                    Éditeur du site
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p><strong className="text-black">Offstone</strong></p>
                    <p><strong>Forme juridique :</strong> Société par actions simplifiée en cours d'immatriculation</p>
                    <p><strong>Siège social :</strong> 60 rue La Boétie, 75008 Paris, France</p>
                    <p><strong>Responsable de la publication :</strong> Jonathan Anguelov, en sa qualité de Président</p>
                    <p><strong>Email :</strong> <a href="mailto:contact@offstone.fr" className="text-black hover:text-gray-600 underline">contact@offstone.fr</a></p>
                  </div>
                </div>
              </div>

              {/* Hébergement */}
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
                    Hébergement
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p><strong className="text-black">Vercel Inc.</strong></p>
                    <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                    <p><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 underline">https://vercel.com</a></p>
                    <p className="text-sm text-gray-500 mt-4">
                      Vercel s'appuie notamment sur l'infrastructure Amazon Web Services (AWS) pour l'hébergement des contenus et des données.
                    </p>
                  </div>
                </div>
              </div>

              {/* Avertissement sur les risques */}
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
                    Avertissement sur les risques liés à l'investissement
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>
                      <strong className="text-black">L'investissement dans des sociétés non cotées comporte des risques de perte partielle ou totale du capital, ainsi qu'un risque d'illiquidité</strong> (impossibilité de revendre facilement les titres).
                    </p>
                    <p>
                      Les performances passées ne préjugent pas des performances futures.
                    </p>
                    <p>
                      Avant toute décision d'investissement, chaque investisseur doit prendre connaissance des documents d'information, évaluer le risque et, si nécessaire, solliciter un conseil indépendant.
                    </p>
                  </div>
                </div>
              </div>

              {/* Propriété intellectuelle */}
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
                    Propriété intellectuelle
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>
                      L'ensemble des éléments figurant sur le Site (textes, graphismes, logos, images, vidéos, etc.) sont la propriété d'Offstone ou font l'objet d'une autorisation d'utilisation.
                    </p>
                    <p>
                      Toute reproduction, représentation, modification ou diffusion, intégrale ou partielle, est strictement interdite sans accord écrit préalable d'Offstone.
                    </p>
                    <p>
                      Les marques et logos reproduits sur ce site sont déposés par les sociétés qui en sont propriétaires.
                    </p>
                  </div>
                </div>
              </div>

              {/* Données personnelles */}
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
                    Données personnelles et cookies
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>
                      Offstone met en place une politique de confidentialité et de gestion des cookies conforme au Règlement général sur la protection des données (RGPD).
                    </p>
                    <p>
                      Cette politique précise les finalités de collecte, la durée de conservation des données et les droits des utilisateurs (accès, rectification, effacement, portabilité, limitation du traitement, opposition).
                    </p>
                    <p>
                      Pour plus d'informations, consultez notre <a href="/legal/cookies" className="text-black hover:text-gray-600 underline">politique de cookies</a> et notre politique de confidentialité.
                    </p>
                  </div>
                </div>
              </div>

              {/* Limitation de responsabilité */}
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
                    Limitation de responsabilité
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>
                      Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l'année, mais peut toutefois contenir des inexactitudes ou des omissions.
                    </p>
                    <p>
                      Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email, à l'adresse <a href="mailto:contact@offstone.fr" className="text-black hover:text-gray-600 underline">contact@offstone.fr</a>, en décrivant le problème de la manière la plus précise possible.
                    </p>
                    <p>
                      Tout contenu téléchargé se fait aux risques et périls de l'utilisateur et sous sa seule responsabilité.
                    </p>
                  </div>
                </div>
              </div>

              {/* Liens hypertextes */}
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
                    Liens hypertextes
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>
                      Le site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site Offstone.
                    </p>
                    <p>
                      Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de l'éditeur. Aucune autorisation ou demande d'information préalable ne peut être exigée par l'éditeur à l'égard d'un site qui souhaite établir un lien vers le site de l'éditeur.
                    </p>
                  </div>
                </div>
              </div>

              {/* Droit applicable */}
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
                    Droit applicable et juridiction compétente
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p>
                      Tout litige en relation avec l'utilisation du site <strong>www.offstone.fr</strong> est soumis au droit français.
                    </p>
                    <p>
                      Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact */}
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
                    Contact
                  </h3>
                  <div className="space-y-2 text-gray-600 text-[15px] leading-relaxed">
                    <p><strong className="text-black">Pour toute question relative aux présentes mentions légales :</strong></p>
                    <p><strong>Email :</strong> <a href="mailto:contact@offstone.fr" className="text-black hover:text-gray-600 underline">contact@offstone.fr</a></p>
                    <p><strong>Adresse :</strong> 60 rue La Boétie, 75008 Paris, France</p>
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