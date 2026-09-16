import { cta } from "@/data/home";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ServicesSection } from "@/components/home/ServicesSection";
import { Signature } from "@/components/home/Signature";
import { ApproachPreview } from "@/components/home/ApproachPreview";
import { WhyZms } from "@/components/home/WhyZms";
import { CtaBand } from "@/components/layout/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesSection />
      <Signature />
      <ApproachPreview />
      <WhyZms />
      <CtaBand {...cta} />
    </>
  );
}
