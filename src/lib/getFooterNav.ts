// Helper pour charger le JSON de navigation footer selon la locale
export function getFooterNav(locale: string) {
  try {
    if (locale === 'en') {
      return require('../data/footerNav.en.json');
    }
    return require('../data/footerNav.fr.json');
  } catch {
    return { investir: [], ressources: [], offstone: [], legal: [], social: [] };
  }
}
