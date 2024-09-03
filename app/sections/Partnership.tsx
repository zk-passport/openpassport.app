import { LINKS } from "@/common/settings";
import { AppContainer } from "@/components/AppContainer";
import { AppLink } from "@/components/AppLink";
import { Button } from "@/components/elements/Button";
import { Icons } from "@/components/elements/Icons";
import Image from "next/image";

const Partnership = () => {
  return (
    <section
      id="partnerships"
      className="py-20 md:py-40 bg-right bg-cover bg-[url('/pattern/partnership-gradient-mobile.svg')] md:bg-center md:bg-[url('/pattern/partnership-gradient.svg')]"
    >
      <AppContainer className="flex flex-col gap-48 lg:gap-0 lg:flex-row w-full lg:items-center lg:justify-between">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-8 w-full max-w-[375px]">
            <h3 className="text-black font-normal font-alliance tracking-[-1.2px] leading-10 text-[40px]">
              Partnerships
            </h3>
            <span className="font-alliance text-sm leading-5 text-brand-black pl-6 border-l-[1.88px] border-l-brand-black ">
              This project is currently supported by PSE and the Ethereum
              Foundation.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-12 mx-auto lg:mr-0 lg:ml-auto md:gap-16 lg:gap-24">
          <Image
            src="/images/pse-logo.svg"
            className=" size-24 md:size-36"
            width={140}
            height={140}
            alt="partnerships"
          />

          <Image
            src="/images/eth-logo.svg"
            className="h-24 w-[56px] md:h-36 md:w-20"
            width={80}
            height={140}
            alt="partnerships"
          />
        </div>
      </AppContainer>
    </section>
  );
};

Partnership.displayName = "Partnership";
export { Partnership };
