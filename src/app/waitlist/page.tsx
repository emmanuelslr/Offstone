import WaitlistHero from './WaitlistHero.client';

export const metadata = {
  title: 'Offstone — Liste d’attente',
  description: "Accédez en avant-première. Rejoignez la liste d’attente pour découvrir le produit dès son ouverture.",
  robots: { index: false },
};

export default function WaitlistPage() {
  return <WaitlistHero />;
}
