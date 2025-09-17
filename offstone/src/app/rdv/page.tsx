import HubSpotMeeting from '@/components/forms/HubSpotMeeting';

export default function RDV() {
  return (
    <>
      <style jsx global>{`
        @media (max-width: 768px) {
          .rdv-container {
            position: relative;
          }
          .rdv-container .text-center {
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
          }
          .rdv-container h1 {
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
          }
          .rdv-container p {
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
          }
          .rdv-container .border {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            margin-top: 0 !important;
            padding: 0 !important;
            border: none !important;
            background: transparent !important;
          }
        }
      `}</style>
      <main className="rdv-container mx-auto max-w-4xl px-2 sm:px-4 py-4 sm:py-8">
        <div className="text-center mb-2 sm:mb-4">
          <h1 className="text-lg sm:text-2xl font-semibold mb-1 sm:mb-2">Choisissez un créneau avec notre équipe</h1>
          <p className="text-xs sm:text-sm opacity-70">Votre réservation sera confirmée par email.</p>
        </div>
        <div className="rounded-lg sm:rounded-xl border border-white/10 p-1 sm:p-2">
          <HubSpotMeeting className="w-full" />
        </div>
      </main>
    </>
  );
}

