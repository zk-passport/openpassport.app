import Image from "next/image";
import { AppContainer } from "@/components/AppContainer";
import { Button } from "@/components/elements/Button";
import { Icons } from "@/components/elements/Icons";
import { AppLink } from "@/components/AppLink";
import { LINKS } from "@/common/settings";

const Intro = () => {
  return (
    <section
      id="#intro"
      className="flex flex-col gap-12 relative min-h-[80vh] md:gap-0"
    >
      <AppContainer className="grid grid-cols-1 lg:grid-cols-5">
        <div className="flex flex-col gap-[70px] col-span-1 md:col-span-2 pt-14 md:pt-24 md:max-w-[438px]">
          <h1 className="text-brand-black tracking-[-0.77px] text-2xl leading-6 md:tracking-[-1.44px] md:text-5xl md:leading-[46px]">
            Prove your humanity while staying
            <br />
            anonymous
          </h1>
          <div className="flex flex-col gap-8 md:gap-12">
            <span className="border-l border-[#2E2E2F] [&>strong]:text-light-black py-0.5 pl-6 text-light-black/60 text-sm font-normal leading-5">
              Proof of Passport lets applications check their users are humans
              with a <strong>few lines of code</strong>, while preserving their
              privacy.
            </span>
            <div className="flex items-center gap-4">
              <AppLink href={LINKS.APP_DEMO} external>
                <Button icon={<Icons.ExternalLink />}>Try it out</Button>
              </AppLink>
              <AppLink href={LINKS.DOCUMENTATION} external>
                <Button icon={<Icons.ExternalLink />} variant="secondary">
                  Read Docs
                </Button>
              </AppLink>
            </div>
          </div>
        </div>
      </AppContainer>
      <div className="overflow-hidden w-full min-h-[430px] relative lg:w-7/12 max-w-[920px] lg:absolute lg:right-0 lg:bottom-0 lg:top-0 bg-cover">
        <Image
          src="/images/intro-pop.jpg"
          alt="intro proof of password"
          layout="fill"
          fill
          objectFit="cover"
          className="scale-150 translate-y-16 lg:translate-y-0 lg:scale-100"
        />
      </div>
    </section>
  );
};

Intro.displayName = "Intro";
export { Intro };
