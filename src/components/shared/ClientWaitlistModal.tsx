'use client';

import dynamic from 'next/dynamic';

// Composant client pour gérer le WaitlistModal avec ssr: false
const WaitlistModal = dynamic(() => import('@/components/shared/WaitlistModal'), {
  ssr: false,
  loading: () => null
});

export default function ClientWaitlistModal() {
  return <WaitlistModal />;
}


