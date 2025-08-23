import React from "react";
import Navbar from "@/components/shared/Navbar";
import HeroHistoire from "./components/HeroHistoire";
import InvestSimplement from "./components/InvestSimplement";
import QuoteSection from "./components/QuoteSection";

export default function NotreHistoirePage() {
  return (
    <>
      <Navbar forceWhiteStyle />
      <HeroHistoire />
<InvestSimplement image="/images/icones/urqqewjnrwvw1vmmm3dcpf3mf4.svg" />
<InvestSimplement image="/images/personnalites/JONATHAN_ANGUELOV_0048bd2_fcf52cbd2a.jpg?v=3" />
      {/* <NotreHistoireTimeline /> */}
      <QuoteSection />
    </>
  );
}
