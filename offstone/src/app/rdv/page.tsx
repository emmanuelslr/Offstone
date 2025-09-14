export default function RDV() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border">
        <iframe
          src="https://cal.com/ton-compte/offstone?hide_landing_page_details=1"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </main>
  );
}

