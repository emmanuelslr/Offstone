// Bandeau d'avertissement réglementaire (i18n, accessibilité)
type AlertDisclaimerProps = { dict: Record<string, string> };

export default function AlertDisclaimer({ dict }: AlertDisclaimerProps) {
  return (
    <div className="w-full bg-warning text-warning-foreground py-3 px-4 text-center text-sm font-medium" role="alert">
      {dict['disclaimer']} <a href="/legal/risques" className="underline ml-2">{dict['learnMore']}</a>
    </div>
  );
}
