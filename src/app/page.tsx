import { cta } from "@/data/home";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ServicesSection } from "@/components/home/ServicesSection";
import { Signature } from "@/components/home/Signature";
import { ApproachPreview } from "@/components/home/ApproachPreview";
import { WhyZms } from "@/components/home/WhyZms";
import { CtaBand } from "@/components/layout/CtaBand";

export const metadata = pageMetadata({
  absoluteTitle: "ZMS Business Management Consultancy | Abu Dhabi, UAE",
  description:
    "Business management consultancy in Abu Dhabi. Administrative consultancy, marketing consultancy and project management services that turn ambition into a practical, measurable plan.",
  path: "/",
});

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
