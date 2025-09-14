# Footer Offstone

## Structure
- `components/Footer.tsx` : composant principal responsive, i18n, accessibilité, tracking
- `components/AlertDisclaimer.tsx` : bandeau avertissement réglementaire
- `components/WaitlistMiniForm.tsx` : mini-formulaire newsletter/waitlist (email, consent)
- `data/footerNav.fr.json` et `data/footerNav.en.json` : liens de navigation (FR/EN)
- `lib/analytics.ts` : helpers GA4 (footer_link_click, newsletter_submit, outbound_click)
- `lib/getFooterNav.ts` : charge le JSON de navigation selon la locale
- `lib/useFooterDictionary.ts` : mini-dictionnaire i18n pour les textes fixes
- `app/api/newsletter/route.ts` : endpoint POST (stub, à brancher HubSpot/Sendgrid)

## Éditer le JSON
- Modifier les liens dans `data/footerNav.fr.json` et `data/footerNav.en.json`.
- Pour désactiver un lien, ajouter `{ "label": "...", "href": "...", "disabled": true }`.
- Les href doivent pointer vers des pages existantes (sinon désactiver ou masquer).

## Traductions
- Les labels de navigation sont dans les fichiers JSON.
- Les textes fixes (avertissement, conformité, RGPD, etc.) sont dans `lib/useFooterDictionary.ts`.
- Ajouter une langue : dupliquer le JSON, compléter le dictionnaire.

## API newsletter
- POST `/api/newsletter` avec `{ email, consent }`.
- À brancher sur HubSpot/Sendgrid côté serveur.
- Validation email + consent obligatoire.

## QA / Tests
- Desktop : 5 colonnes ; tablette : 2 ; mobile : accordéons.
- Bandeau d’avertissement visible.
- Bloc conformité/statut affiché.
- Tous les liens fonctionnent ; externes target=_blank rel=noopener.
- Tracking GA4 : footer_link_click, newsletter_submit, outbound_click.
- Accessibilité : rôles, aria-label, contrastes, focus-visible.
- Lighthouse : a11y ≥ 95, SEO ≥ 95.
- Pas de dépendance CMS.
