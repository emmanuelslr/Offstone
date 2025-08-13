'use client';

export default function ConversationBanner() {
  return (
    <section className="w-full bg-[#F7B096] py-12 px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
        Discutons de votre projet immobilier
      </h2>
      <p className="text-lg text-black mb-6">
        Notre équipe est à votre écoute pour vous accompagner dans vos investissements ou répondre à vos questions.
      </p>
      <a
        href="/contact"
        className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-[#181818] transition-colors duration-200"
      >
        Prendre rendez-vous
      </a>
    </section>
  );
}
