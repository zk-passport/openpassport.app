import { CaseStudies } from "./sections/CaseStudies";
import { CodeIntegration } from "./sections/CodeIntegration";
import { HowItWorks } from "./sections/HowItWorks";
import { Intro } from "./sections/Intro";
import { Partnership } from "./sections/Partnership";
import { UseCases } from "./sections/UseCases";

export default function Home() {
  return (
    <div>
      <Intro />
      <HowItWorks />
      <UseCases />
      <CodeIntegration />
      <CaseStudies />
      <Partnership />
    </div>
  );
}
