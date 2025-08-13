import Image from "next/image";

type Talent = {
  name: string;
  role: string;
  image: string;
};

const talents: Talent[] = [
  {
    name: "Jonathan Anguelov",
    role: "Fondateur",
    image: "/Images/Confiance/photohumain1.webp",
  },
  {
    name: "Sasha Yudaev",
    role: "Directeur Général",
    image: "/Images/Confiance/photohumain2.webp",
  },
  {
    name: "Montana",
    role: "Responsable Communication",
    image: "/Images/Confiance/photohumain3.webp",
  },
  // Ajoute ici les autres membres...
];

export default function TalentSection({ showTitle = true }: { showTitle?: boolean }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="mb-8 pl-[7%]">
            <h2 className="text-black text-5xl md:text-6xl font-light tracking-tight text-left">Notre équipe</h2>
            <p className="mt-2 text-lg text-gray-400 font-normal text-left max-w-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam eros, a facilisis enim leo nec erat.</p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[2px] gap-y-40">
          {talents.map((talent, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center bg-gray-50 rounded-xl p-4 transition-all duration-300 ease-in-out group hover:scale-105 mx-0 ${idx >= 3 ? "mt-[-60px]" : ""}`}
            >
      <div className="w-[76%] h-[440px] relative mb-4 group overflow-hidden">
        <Image
          src={talent.image}
          alt={talent.name}
          fill
          className="object-cover"
        />
      </div>
              <div className="text-2xl font-normal text-black">{talent.name}</div>
              <div className="text-lg font-normal text-gray-500 mt-1">{talent.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
