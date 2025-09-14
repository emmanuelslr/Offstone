import React from "react";
import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "../home-page/components/ProCTAFooter";
import HeroHistoire from "./components/HeroHistoire";
import StatsCardsSection from "./components/StatsCardsSection";
import TeamStickyGridSection from "../home-page/components/TeamStickyGridSection";
import ValuesMosaicSection from "./components/ValuesMosaicSection";
import OriginesOffstoneSection from "./components/OriginesOffstoneSection";
import CustomersShowcaseSection from "./components/CustomersShowcaseSection";
import PrincipesOffstoneSection from "./components/PrincipesOffstoneSection";
import ChiffresClesSection from "./components/ChiffresClesSection";
import ImpactOffstoneSection from "./components/ImpactOffstoneSection";

export default function NotreHistoirePage() {
  return (
    <>
      <Navbar forceWhiteStyle />
      <HeroHistoire />
      <OriginesOffstoneSection />
      <PrincipesOffstoneSection />
      <ImpactOffstoneSection />
      <ChiffresClesSection />
      {/* À discuter: réactiver ou refondre ces sections pour la continuité */}
      {/* <StatsCardsSection /> */}
      {/* <TeamStickyGridSection /> */}
      {/* <ValuesMosaicSection /> */}
      {/* <CustomersShowcaseSection /> */}
      {/* Pro CTA Footer Section */}
      <ProCTAFooter utm_campaign="notre-histoire" />
    </>
  );
}
