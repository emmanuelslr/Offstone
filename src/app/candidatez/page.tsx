import Navbar from "@/components/shared/Navbar";
import ProCTAFooter from "../home-page/components/ProCTAFooter";

export default function CandidatezPage() {
  return (
    <main>
      <Navbar forceWhiteStyle />
      <section className="bg-white">
        <ProCTAFooter utm_campaign="candidatez" />
      </section>
    </main>
  );
}

