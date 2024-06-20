import { AppContainer } from "@/components/AppContainer";
import Image from "next/image";

interface HowItWorkCardProps {
  title: string;
  description: string;
  isActive?: boolean;
  className?: string;
  stepIndex: number; // number of the step
}

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

const HowItWorkCard = ({
  title,
  description,
  isActive,
  className = "",
  stepIndex,
}: HowItWorkCardProps) => {
  return (
    <div
      className={`relative group cursor-pointer flex flex-col gap-2 py-6 px-8 duration-200 before:duration-300 before:bg-black before:absolute before:will-change-transform before:left-0 before:origin-bottom before:w-full before:h-full before:content-[''] before:bottom-0 before:scale-y-0 hover:before:scale-y-100  ${className}`}
      style={{
        background: isActive
          ? "#FFFFFF"
          : "linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(153, 153, 153, 0.00) 100%)",
      }}
    >
      <div className="flex gap-3 items-center z-[2]">
        <div
          className={`rounded-full  text-[8px] group-hover:!bg-white group-hover:!text-black font-bold w-[18px] h-[18px] flex items-center text-center justify-center" ${
            isActive ? "text-white bg-black" : "text-[#DCD5D5] bg-white/25"
          }`}
        >
          <div className="mx-auto">{stepIndex}</div>
        </div>
        <span
          className={`text-base tracking-[-0.48px] font-alliance z-[2] group-hover:!text-white ${
            isActive ? "text-black " : "text-white"
          }`}
        >
          {title}
        </span>
      </div>
      <span
        className={`text-sm leading-5 font-alliance z-[2] group-hover:!text-white/80 ${
          isActive ? "text-black/80" : "text-white/60"
        }`}
      >
        {description}
      </span>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="bg-section-gradient-black pt-14 lg:pt-16"
    >
      <AppContainer className="h-full-screen flex flex-col relative gap-24 lg:gap-0">
        <div className="my-auto h-full flex flex-col gap-16 lg:gap-36">
          <h3 className=" max-w-[526px] [&>strong]:text-white font-alliance font-normal text-2xl leading-normal tracking-[-0.22px] text-white/70 md:text-[32px]">
            <strong>Introduction Proof of Passport,</strong> a digital identity
            powered by zero-knowledge technology.
          </h3>
          <div className="w-full max-w-[720px] grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2">
            {HOW_IT_WORKS.map(({ label, description }, index) => {
              return (
                <HowItWorkCard
                  className={index !== 0 ? "lg:col-start-2" : ""}
                  stepIndex={index + 1}
                  key={index}
                  title={label}
                  description={description}
                  isActive={index === 0}
                />
              );
            })}
          </div>
        </div>
        <Image
          src="/images/iphone.png"
          alt="Proof of Passport"
          className="w-full max-w-[315px] mx-auto lg:max-w-[385px] lg:absolute lg:right-0 lg:bottom-0"
          width={385}
          height={778}
        />
      </AppContainer>
    </section>
  );
};

HowItWorks.displayName = "HowItWorks";
export { HowItWorks };
