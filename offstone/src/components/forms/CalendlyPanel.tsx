"use client";

export default function CalendlyPanel({ email }: { email?: string }) {
  const src = `https://cal.com/ton-compte/offstone?hide_landing_page_details=1${
    email ? `&email=${encodeURIComponent(email)}` : ""
  }`;
  return (
    <div className="mt-4 rounded-xl border">
      <div className="relative w-full" style={{ height: 520 }}>
        <iframe src={src} className="absolute inset-0 h-full w-full" />
      </div>
    </div>
  );
}

