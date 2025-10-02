"use client";

import React from "react";
import OffDealAdvantageLike from "./OffDealAdvantageLike";
import FiscalitySection from "./FiscalitySection";
import HorizontalDealsSection from "./HorizontalDealsSection";

export default function AdvantageOffstoneSection({ showVideo = true }: { showVideo?: boolean }) {
  return (
    <section id="offdeal-advantage-like" className="w-full bg-white">
      {/* Section image + texte defilant (simplifiee) */}
      

      {/* Section sticky visuels + etapes (deja stylee) */}
      <div className="bg-white">
        <OffDealAdvantageLike />
      </div>

      {/* Bloc fiscalite avant les references horizontales */}
      <FiscalitySection />

      {/* References horizontales (type carrousel) */}
      <div className="bg-white">
        <HorizontalDealsSection />
      </div>
    </section>
  );
}
