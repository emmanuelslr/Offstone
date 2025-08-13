// front/src/components/shared/PreFooterSection.tsx
'use client';

export default function PreFooterSection() {
  return (
<section 
      className="py-48 w-full bg-cover"
      style={{ 
        backgroundColor: "#1b1c1e",
        backgroundImage: "linear-gradient(rgba(27,28,30,0.5), rgba(27,28,30,0.5)), url('/videos/Images immeubles/9fkY4aD8cQ7RHUwy2LDm21AUj7k.svg')",
        backgroundPosition: 'bottom'
      }}
    >
      <div className="container mx-auto text-center text-white">
<h2 className="text-5xl font-medium mb-4 font-sans">Prêt à discuter de votre projet ?</h2>
<p className="text-xl mb-8">Contactez-nous pour une consultation gratuite.</p>
<a href="/contact" className="bg-[#F7B096] text-black font-medium text-lg py-3 px-8 rounded-full hover:bg-white hover:text-[#F7B096] transition duration-300">
          Nous Contacter
        </a>
      </div>
    </section>
  );
}
