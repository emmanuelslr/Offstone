"use client";

import React from "react";
import OffDealAdvantageLike from "./OffDealAdvantageLike";
import HorizontalDealsSection from "./HorizontalDealsSection";

export default function AdvantageOffstoneSection({ showVideo = true }: { showVideo?: boolean }) {
  return (
    <section id="offdeal-advantage-like" className="w-full bg-white">
      {/* Section image + texte défilant (simplifiée) */}
      

      {/* Section sticky visuels + étapes (déjà stylée) */}
      <div className="bg-white">
        <OffDealAdvantageLike />
      </div>

      {/* Références horizontales (type carrousel) */}
      <div className="bg-white">
        <HorizontalDealsSection />
      </div>
    </section>
  );
}
