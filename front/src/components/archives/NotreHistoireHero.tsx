'use client';

export default function NotreHistoireHero({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`w-full bg-black flex items-center justify-center ${compact ? "min-h-[400px]" : "min-h-screen"} relative overflow-hidden`}>
      <img
        src="/UrQqewjnRWVW1vMmm3dcpF3MF4.svg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none z-0"
      />
      <div className="max-w-6xl mx-auto px-2 flex-1 flex flex-col items-center justify-center relative z-10 h-full">
<h1 className="text-white text-5xl md:text-7xl font-light text-center leading-tight mt-20">
  "Nous faisons plus qu'investir pour vous. Nous construisons votre patrimoine{" "}
<span
  className="text-white px-1"
  style={{
    background: "linear-gradient(to top, #F7B096 75%, transparent 75%)",
    backgroundPosition: "center 0%"
  }}
>
    à nos côtés.
</span>
</h1>
        <div className="flex flex-col items-center justify-center mt-20">
          <img
            src="/Images/Confiance/NotreHistoireJonathan.avif"
            alt="Notre Histoire Jonathan"
            className="rounded-full w-20 h-20 object-cover"
          />
          <span className="mt-2 text-white text-base text-center font-normal" style={{ fontFamily: "'Herr Von Muellerhoff', cursive" }}>
            Jonathan Anguelov
          </span>
          <span className="mt-1 text-center text-sm text-gray-500 font-light">
            Co-Fondateur Aguesseau
          </span>
        </div>
      </div>
    </section>
  );
}
