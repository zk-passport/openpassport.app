"use client";
import { AppContainer } from "@/components/AppContainer";
import { HowItWorkCard } from "@/components/cards/HowItWorkCard";
import Image from "next/image";
import { useState } from "react";

const HOW_IT_WORKS: { label: string; description: string }[] = [
  {
    label: "Scan your passport",
    description: "Scan your passport using the NFC reader of your phone.",
  },
  {
    label: "Generate your proof",
    description:
      "Generate a zk proof over your passport, selecting only what you want to disclose.",
  },
  {
    label: "Share your proof",
    description: "Share your zk proof with selected application.",
  },
];

const HowItWorkIllustrationMapping: Record<number, string> = {
  1: "/illustrations/how-it-works-1.webp",
  2: "/illustrations/how-it-works-2.webp",
  3: "/illustrations/how-it-works-3.webp",
};

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);

  const currentIllustration = HowItWorkIllustrationMapping[activeStep];

  return (
    <section
      id="how-it-works"
      className="bg-section-gradient-black pt-14 lg:pt-16"
    >
      <AppContainer className="flex flex-col relative overflow-hidden lg:min-h-[780px] xl:min-h-[900px]">
        <div className="my-auto h-full flex flex-col gap-16 lg:gap-36">
<<<<<<< Updated upstream
          <h3 className="max-w-[526px] [&>strong]:text-white font-alliance font-normal text-2xl leading-normal tracking-[-0.96px] text-white/70 md:tracking-[-1.44px] md:text-[32px]">
            <strong>Introduction OpenPassport,</strong> a digital identity
=======
          <h3 className="max-w-[526px] [&>strong]:text-white font-alliance font-normal text-2xl leading-6 tracking-[-0.96px] text-white/70 md:leading-[38px] md:tracking-[-0.22px] md:text-[32px]">
            <strong>Introduction Proof of Passport,</strong> a digital identity
>>>>>>> Stashed changes
            powered by zero-knowledge technology.
          </h3>
          <div className="w-full grid grid-cols-1 gap-6 lg:max-w-[600px] lg:grid-cols-2 xl:max-w-[720px]">
            {HOW_IT_WORKS.map(({ label, description }, index) => {
              const isActive = activeStep === index + 1;
              return (
                <HowItWorkCard
                  className="lg:col-span-2"
                  stepIndex={index + 1}
                  key={index}
                  title={label}
                  description={description}
                  isActive={isActive}
                  onClick={() => setActiveStep(index + 1)}
                />
              );
            })}
          </div>
        </div>
        <Image
          src={currentIllustration}
          alt="OpenPassport"
          className="relative w-full max-w-[420px] -mt-24 bottom-[-200px] mx-auto lg:mt-0 lg:absolute lg:right-0 lg:bottom-[-70px]"
          width={385}
          height={778}
          priority
        />
      </AppContainer>
    </section>
  );
};

HowItWorks.displayName = "HowItWorks";
export { HowItWorks };
