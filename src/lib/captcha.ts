export type CaptchaProvider = 'recaptcha' | 'hcaptcha';

function isPreviewOrProd(): boolean {
  const ve = (process.env.VERCEL_ENV || '').toLowerCase();
  if (ve === 'preview' || ve === 'production') return true;
  return process.env.NODE_ENV === 'production';
}

function getProvider(): CaptchaProvider | null {
  const p = (process.env.CAPTCHA_PROVIDER || '').toLowerCase();
  if (p === 'recaptcha' || p === 'hcaptcha') return p;
  if (process.env.RECAPTCHA_SECRET_KEY) return 'recaptcha';
  if (process.env.HCAPTCHA_SECRET_KEY) return 'hcaptcha';
  return null;
}

export function captchaEnabled(): boolean {
  const provider = getProvider();
  if (!provider) return false;
  if (provider === 'recaptcha' && !process.env.RECAPTCHA_SECRET_KEY) return false;
  if (provider === 'hcaptcha' && !process.env.HCAPTCHA_SECRET_KEY) return false;
  return true;
}

export async function verifyCaptchaToken(token: string | null | undefined, remoteIp?: string | null): Promise<boolean> {
  try {
    const provider = getProvider();
    const enabled = captchaEnabled();

    if (!enabled) {
      // Enforce CAPTCHA only in preview/prod if configured; otherwise pass in dev
      return !isPreviewOrProd();
    }
    if (!token || typeof token !== 'string') return false;

    if (provider === 'recaptcha') {
      const secret = process.env.RECAPTCHA_SECRET_KEY!;
      const params = new URLSearchParams();
      params.append('secret', secret);
      params.append('response', token);
      if (remoteIp) params.append('remoteip', remoteIp);
      const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
        // @ts-ignore next cache control
        cache: 'no-store',
      });
      if (!res.ok) return false;
      const json: any = await res.json().catch(() => ({}));
      if (!json?.success) return false;
      const min = Number(process.env.RECAPTCHA_MIN_SCORE || '0.5');
      if (typeof json?.score === 'number' && json.score < min) return false;
      return true;
    }

    if (provider === 'hcaptcha') {
      const secret = process.env.HCAPTCHA_SECRET_KEY!;
      const params = new URLSearchParams();
      params.append('secret', secret);
      params.append('response', token);
      if (remoteIp) params.append('remoteip', remoteIp);
      const res = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
        // @ts-ignore
        cache: 'no-store',
      });
      if (!res.ok) return false;
      const json: any = await res.json().catch(() => ({}));
      return Boolean(json?.success);
    }

    return false;
  } catch {
    return false;
  }
}

