import Image from "next/image";

export default function NotreHistoirePhotoSection() {
  return (
    <section className="py-2 bg-white">
      <div className="w-full flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 flex">
          <div className="w-full h-[700px] relative -ml-40">
              <Image
                src="/Immeuble tour.avif"
                alt="Notre histoire"
                fill
                className="object-contain"
              />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4 text-black">Titre de section</h3>
          <p className="text-gray-700 text-lg">
            Ceci est un texte d'exemple pour la section Notre Histoire. Tu peux remplacer ce texte par le contenu de ton choix pour présenter l'équipe, la vision ou tout autre élément important.
          </p>
        </div>
      </div>
    </section>
  );
}
