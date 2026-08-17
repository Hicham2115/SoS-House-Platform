import { Hero } from "@/components/Main/hero";
import { HowItWorks } from "@/components/Main/how-it-works";
import { Verification } from "@/components/Main/verification";
import { Services } from "@/components/Main/services";
import { ForArtisans } from "@/components/Main/for-artisans";
import { Testimonials } from "@/components/Main/testimonials";
import { CallToAction } from "@/components/Main/call-to-action";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Verification />
      <ForArtisans />
      <Services />
      <Testimonials />
      <CallToAction />
    </>
  );
}
