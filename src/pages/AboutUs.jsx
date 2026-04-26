import { useEffect } from 'react';
import { Rule } from "../components/AboutUsComponents/utils";
import HeroSection from "../components/AboutUsComponents/HeroSection";
import StorySection from "../components/AboutUsComponents/StorySection";
import MissionBanner from "../components/AboutUsComponents/MissionBanner";
import FeaturesSection from "../components/AboutUsComponents/FeaturesSection";
import RhythmSection from "../components/AboutUsComponents/RhythmSection";
import CTAFooter from "../components/AboutUsComponents/CTAFooter";

export default function AboutUs() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);
  return (
    <>
      <HeroSection />

      <Rule />

      <StorySection />

      <Rule />

      <MissionBanner />

      <Rule />

      <FeaturesSection />

      <RhythmSection />

      <Rule />

      <CTAFooter />

      {/* ── Responsive grid fix ──────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .about-two-col {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </>
  );
}