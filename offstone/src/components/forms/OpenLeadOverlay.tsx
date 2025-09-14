"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LeadOverlay from "./LeadOverlay";
import LeadMultiStep from "./LeadMultiStep";
import { ga } from "@/lib/ga";

export default function OpenLeadOverlay({
  buttonLabel = "Investir à nos côtés",
  defaultAssetClass = "general",
  articleUid,
}: {
  buttonLabel?: string;
  defaultAssetClass?: string;
  articleUid?: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          ga("lead_view", { source: "overlay" });
        }}
        className="rounded-full border px-4 py-2 hover:bg-black hover:text-white"
      >
        {buttonLabel}
      </button>

      <LeadOverlay open={open} onClose={() => setOpen(false)} width={960} heightVh={72}>
        <LeadMultiStep
          defaultAssetClass={defaultAssetClass}
          articleUid={articleUid}
          onDone={(route) => {
            setOpen(false);
            if (route === "rdv") router.push("/rdv");
            else router.push("/merci?lead=ok");
          }}
        />
      </LeadOverlay>
    </>
  );
}

