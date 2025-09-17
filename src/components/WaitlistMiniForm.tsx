// Formulaire mini waitlist/newsletter (email, consent, tracking, accessibilité)
import { useState } from 'react';
import { trackNewsletterSubmit } from '../lib/analytics';

type WaitlistMiniFormProps = { dict: Record<string, string> };


export default function WaitlistMiniForm({ dict }: WaitlistMiniFormProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !consent) return setMsg(dict['formError']);
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent, hp: '' })
      });
      if (res.ok) {
        setMsg(dict['formSuccess']);
        trackNewsletterSubmit('footer');
        setEmail('');
        setConsent(false);
      } else {
        setMsg(dict['formError']);
      }
    } catch {
      setMsg(dict['formError']);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2" aria-label={dict['formLabel']}>
      <label htmlFor="waitlist-email" className="sr-only">{dict['email']}</label>
      <input
        id="waitlist-email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={dict['emailPlaceholder']}
        required
        className="input input-bordered"
        autoComplete="email"
      />
      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
          required
        />
        {dict['consentText']}
      </label>
      <button type="submit" className="btn btn-primary" disabled={loading}>{dict['submit']}</button>
      {msg && <div className="text-xs text-center mt-1">{msg}</div>}
    </form>
  );
}
