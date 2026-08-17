import { Hero } from "@/components/Main/hero";
import { HowItWorks } from "@/components/Main/how-it-works";
import { Verification } from "@/components/Main/verification";
import { Services } from "@/components/Main/services";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Verification />
      <Services />
    </>
  );
}
