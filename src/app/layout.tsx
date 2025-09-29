import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import Footer from "@/components/Footer";
import HydrationFix from "@/components/shared/HydrationFix";
import { repositoryName } from "@/lib/prismicio";
import "./globals.css";
import WaitlistModal from "@/components/shared/WaitlistModal";
import UTMTracker from "@/components/UTMTracker";
import PerformanceOptimizer from "@/components/seo/PerformanceOptimizer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "arial"],
});


export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://offstone.fr'),
  title: {
    default: "Offstone | Investissez aux côtés de Jonathan Anguelov",
    template: "%s | Offstone - Jonathan Anguelov"
  },
  description: "Investissez dans l'immobilier professionnel avec Jonathan Anguelov et Offstone. Accédez à des opérations sélectionnées, accompagnement expert et diversification patrimoniale. Club de deals exclusifs.",
  keywords: [
    "Jonathan Anguelov",
    "Offstone",
    "investissement immobilier",
    "immobilier professionnel",
    "club de deals",
    "diversification patrimoine",
    "investissement immobilier France",
    "Jonathan Anguelov investisseur",
    "Offstone immobilier",
    "club investisseurs",
    "deals immobiliers",
    "accompagnement investissement"
  ],
  authors: [{ name: "Jonathan Anguelov", url: "https://offstone.fr" }],
  creator: "Jonathan Anguelov",
  publisher: "Offstone",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://offstone.fr',
    siteName: 'Offstone',
    title: 'Offstone | Investissez aux côtés de Jonathan Anguelov',
    description: 'Investissez dans l\'immobilier professionnel avec Jonathan Anguelov et Offstone. Accédez à des opérations sélectionnées et à un accompagnement expert.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Offstone - Jonathan Anguelov - Investissement Immobilier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offstone | Investissez aux côtés de Jonathan Anguelov',
    description: 'Investissez dans l\'immobilier professionnel avec Jonathan Anguelov et Offstone. Accédez à des opérations sélectionnées.',
    images: ['/images/og-image.jpg'],
    creator: '@offstone_fr',
  },
  alternates: {
    canonical: 'https://offstone.fr',
  },
  category: 'Finance & Investissement',
  classification: 'Investissement Immobilier',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' }
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/manifest.json',
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="192x192" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        
        {/* Données structurées JSON-LD pour le SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Offstone",
              "alternateName": "Offstone Investissement",
              "url": "https://offstone.fr",
              "logo": "https://offstone.fr/favicon.png",
              "description": "Investissez dans l'immobilier professionnel avec Jonathan Anguelov et Offstone. Accédez à des opérations sélectionnées et à un accompagnement expert.",
              "founder": {
                "@type": "Person",
                "name": "Jonathan Anguelov",
                "jobTitle": "Fondateur & Investisseur Immobilier",
                "description": "Expert en investissement immobilier professionnel et fondateur d'Offstone"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://offstone.fr"
              },
              "sameAs": [
                "https://offstone.fr"
              ],
              "serviceType": "Investissement Immobilier",
              "areaServed": "France",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Services d'Investissement Immobilier",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Club de Deals Immobiliers",
                      "description": "Accès à des opérations immobilières sélectionnées"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Accompagnement Investissement",
                      "description": "Conseil et accompagnement pour vos investissements immobiliers"
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* Données structurées pour Jonathan Anguelov */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Jonathan Anguelov",
              "jobTitle": "Fondateur & Investisseur Immobilier",
              "description": "Expert en investissement immobilier professionnel, fondateur d'Offstone",
              "url": "https://offstone.fr",
              "image": "https://offstone.fr/images/personnalites/jonathan-anguelov.jpg",
              "worksFor": {
                "@type": "Organization",
                "name": "Offstone"
              },
              "knowsAbout": [
                "Investissement Immobilier",
                "Immobilier Professionnel",
                "Club de Deals",
                "Diversification Patrimoniale",
                "Finance Immobilière"
              ],
              "alumniOf": "Expert en investissement immobilier",
              "award": "Fondateur d'Offstone - Club d'investissement immobilier"
            })
          }}
        />
        {/* Script pour nettoyer l'attribut cz-shortcut-listen AVANT l'hydratation */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Nettoyer immédiatement si le body existe déjà
                if (document.body) {
                  document.body.removeAttribute('cz-shortcut-listen');
                }
                
                // Observer les changements sur le body
                const observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'cz-shortcut-listen') {
                      document.body.removeAttribute('cz-shortcut-listen');
                    }
                  });
                });
                
                // Attendre que le body soit disponible
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    if (document.body) {
                      observer.observe(document.body, {
                        attributes: true,
                        attributeFilter: ['cz-shortcut-listen']
                      });
                    }
                  });
                } else {
                  if (document.body) {
                    observer.observe(document.body, {
                      attributes: true,
                      attributeFilter: ['cz-shortcut-listen']
                    });
                  }
                }
              })();
            `,
          }}
        />
        
        {/* Microsoft Clarity - Behavioral Analytics */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "tcmdqy7kch");
              
              // Vérification que Clarity se charge correctement
              setTimeout(function() {
                if (typeof window.clarity === 'function') {
                  console.log('✅ Microsoft Clarity loaded successfully');
                } else {
                  console.warn('⚠️ Microsoft Clarity failed to load');
                }
              }, 2000);
            `
          }}
        />
      </head>
      <body className="bg-white text-black antialiased min-h-screen w-full">
        <HydrationFix />
        <UTMTracker />
        <PerformanceOptimizer />
        {children}
        <WaitlistModal />
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
        <Analytics />
        <SpeedInsights />

        {/* HubSpot Embed Code */}
        <Script 
          id="hs-script-loader" 
          src="//js-eu1.hs-scripts.com/146846899.js" 
          strategy="afterInteractive"
          async 
          defer
        />

        {/* Tarteaucitron - Gestion des cookies RGPD */}
        <Script 
          id="tarteaucitron-core" 
          src="/tarteaucitron/tarteaucitron.js" 
          strategy="afterInteractive" 
        />
        
        <Script 
          id="tarteaucitron-init" 
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              console.log('?? Script tarteaucitron-init chargé');
              
              function resetTarteaucitron() {
                try {
                  document.cookie = 'offstone-consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                  document.cookie = 'tarteaucitron=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                  console.log('?? Cookies supprimés, rechargement...');
                  window.location.reload();
                } catch (e) {
                  console.log('Erreur lors du reset:', e);
                }
              }


              // Initialisation de tarteaucitron
              function initTarteaucitron() {
                console.log('?? Tentative d\\'initialisation de Tarteaucitron...');
                console.log('?? tarteaucitron disponible:', typeof window.tarteaucitron);
                
                if (typeof window.tarteaucitron !== 'undefined') {
                  console.log('?? Tarteaucitron trouvé, initialisation...');
                  
                  tarteaucitron.init({
                    privacyUrl: '/legal/cookies',
                    hashtag: '#cookies',
                    cookieName: 'offstone-consent',
                    orientation: 'bottom',
                    showAlertSmall: true,
                    cookieslist: true,
                    acceptAllCta: true,
                    denyAllCta: true,
                    highPrivacy: true,
                    handleBrowserDNTRequest: true,
                    removeCredit: true,
                    moreInfoLink: true,
                    useExternalCss: false,
                    useExternalJs: false
                  });

                  // LinkedIn Insight Tag (à activer avec votre vrai ID)
                  tarteaucitron.user.linkedininsighttag = { id: 'l:XXXXXXXXX' };
                  (tarteaucitron.job = tarteaucitron.job || []).push('linkedininsighttag');
                  
                  console.log('?? Tarteaucitron initialisé avec succès');
                  
                  // Vérifier immédiatement si le bandeau doit s'afficher
                  console.log('?? Vérification immédiate de l\\'état des cookies...');
                  const hasConsent = document.cookie.includes('offstone-consent=');
                  console.log('?? Consentement existant:', hasConsent);
                  
                  if (!hasConsent) {
                    console.log('?? Pas de consentement, détection d\\'interaction utilisateur...');
                    
                    let userInteracted = false;
                    let bannerShown = false;
                    
                    // Détecter l'interaction utilisateur
                    const showBannerOnInteraction = () => {
                      if (!bannerShown && userInteracted) {
                        bannerShown = true;
                        showBanner();
                      }
                    };
                    
                    // Événements d'interaction
                    ['scroll', 'click', 'mousemove', 'keydown', 'touchstart'].forEach(event => {
                      document.addEventListener(event, () => {
                        if (!userInteracted) {
                          userInteracted = true;
                          console.log('?? Interaction utilisateur détectée, affichage du bandeau...');
                          showBannerOnInteraction();
                        }
                      }, { once: true });
                    });
                    
                    // Fallback: afficher après 5 secondes même sans interaction
                    setTimeout(() => {
                      if (!bannerShown) {
                        console.log('?? Fallback: affichage automatique après 5s...');
                        userInteracted = true;
                        showBannerOnInteraction();
                      }
                    }, 5000);
                    
                    function showBanner() {
                    
                    // Créer un bandeau RGPD-compliant avec style Palantir
                    const gdprBanner = document.createElement('div');
                    gdprBanner.id = 'gdpr-cookie-banner';
                    gdprBanner.style.cssText = 
                      'position: fixed !important;' +
                      'bottom: 20px !important;' +
                      'left: 16px !important;' +
                      'right: 16px !important;' +
                      'max-width: 1280px !important;' +
                      'margin: 0 auto !important;' +
                      'background: rgba(255, 255, 255, 0.55) !important;' +
                      'backdrop-filter: blur(30px) !important;' +
                      'border: 1px solid rgba(255, 255, 255, 0.12) !important;' +
                      'border-radius: 8px !important;' +
                      'padding: 12px 0 !important;' +
                      'box-shadow: 0 4px 12px rgba(0,0,0,0.06) !important;' +
                      'z-index: 9999999 !important;' +
                      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;' +
                      'opacity: 0 !important;' +
                      'transform: translateY(100%) !important;' +
                      'transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;';
                    
                    gdprBanner.innerHTML = 
                      '<div style="margin: 0 auto; padding: 0 16px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">' +
                        '<div style="flex: 1; min-width: 240px;">' +
                          '<div style="font-size: 13px; font-weight: 500; margin-bottom: 1px; color: #1f2937; letter-spacing: -0.01em;">Cookies & Confidentialité</div>' +
                          '<div style="font-size: 12px; color: #374151; line-height: 1.3;">' +
                            'Nous utilisons des cookies pour améliorer votre expérience.' +
                          '</div>' +
                        '</div>' +
                        '<div style="display: flex; gap: 6px; flex-wrap: wrap;">' +
                          '<button onclick="document.getElementById(\\'gdpr-cookie-banner\\').style.transform=\\'translateY(100%)\\'; document.getElementById(\\'gdpr-cookie-banner\\').style.opacity=\\'0\\'; setTimeout(() => { document.getElementById(\\'gdpr-cookie-banner\\').remove(); document.body.style.paddingBottom=\\'0\\'; }, 400); document.cookie=\\'offstone-consent=false; path=/; max-age=31536000\\';" style="background: transparent; color: #6b7280; border: 1px solid #e5e7eb; padding: 4px 10px; border-radius: 3px; cursor: pointer; font-weight: 500; font-size: 12px; transition: all 0.2s; opacity: 0.8;">' +
                            'Refuser' +
                          '</button>' +
                          '<button onclick="document.getElementById(\\'gdpr-cookie-banner\\').style.transform=\\'translateY(100%)\\'; document.getElementById(\\'gdpr-cookie-banner\\').style.opacity=\\'0\\'; setTimeout(() => { document.getElementById(\\'gdpr-cookie-banner\\').remove(); document.body.style.paddingBottom=\\'0\\'; }, 400); document.cookie=\\'offstone-consent=essential; path=/; max-age=31536000\\';" style="background: transparent; color: #374151; border: 1px solid #d1d5db; padding: 4px 10px; border-radius: 3px; cursor: pointer; font-weight: 500; font-size: 12px; transition: all 0.2s;">' +
                            'Essentiels' +
                          '</button>' +
                          '<button onclick="document.getElementById(\\'gdpr-cookie-banner\\').style.transform=\\'translateY(100%)\\'; document.getElementById(\\'gdpr-cookie-banner\\').style.opacity=\\'0\\'; setTimeout(() => { document.getElementById(\\'gdpr-cookie-banner\\').remove(); document.body.style.paddingBottom=\\'0\\'; }, 400); document.cookie=\\'offstone-consent=true; path=/; max-age=31536000\\';" style="background: #1f2937; color: white; border: none; padding: 4px 10px; border-radius: 3px; cursor: pointer; font-weight: 500; font-size: 12px; transition: all 0.2s;">' +
                            'Accepter' +
                          '</button>' +
                        '</div>' +
                      '</div>';
                    
                    document.body.appendChild(gdprBanner);
                    
                      // Animation d'apparition smooth
                      setTimeout(() => {
                        gdprBanner.style.opacity = '1';
                        gdprBanner.style.transform = 'translateY(0)';
                      }, 50);
                      
                      // Empêcher le scroll du body quand le bandeau est affiché
                      document.body.style.paddingBottom = '60px';
                      
                      console.log('?? Bandeau RGPD créé avec style Palantir');
                    }
                  }
                  
                } else {
                  console.log('?? Tarteaucitron pas encore chargé, nouvelle tentative dans 1s...');
                  setTimeout(initTarteaucitron, 1000);
                }
              }

              // Démarrer l'initialisation après un délai
              setTimeout(initTarteaucitron, 1000);
            `
          }}
        />
      </body>
    </html>
  );
}


