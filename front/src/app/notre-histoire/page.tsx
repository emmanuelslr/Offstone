import React from "react";
import Navbar from "@/components/shared/Navbar";
import HeroHistoire from "./components/HeroHistoire";
import NotreHistoirePhotoSection from "./components/NotreHistoirePhotoSection";
import NotreHistoireBlackSection from "./components/NotreHistoireBlackSection";
/* import NotreHistoireTimeline from "./components/NotreHistoireTimeline"; */
import TalentSection from "./components/TalentSection";
import InvestSimplement from "./components/InvestSimplement";
import QuoteSection from "./components/QuoteSection";

export default function NotreHistoirePage() {
  return (
    <>
      <Navbar forceWhiteStyle />
      <HeroHistoire />
<InvestSimplement image="/Images/autres/UrQqewjnRWVW1vMmm3dcpF3MF4.svg" />
<InvestSimplement image="/Images/autres/JONATHAN_ANGUELOV_0048bd2_fcf52cbd2a.jpg?v=3" />
      {/* <NotreHistoireTimeline /> */}
      <QuoteSection />
      <TalentSection />
      <div className="mt-[-120px]">
        <TalentSection showTitle={false} />
      </div>
    </>
  );
}
