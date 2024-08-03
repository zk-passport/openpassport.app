import { LINKS } from "@/common/settings";
import { AppContainer } from "@/components/AppContainer";
import { AppLink } from "@/components/AppLink";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { Button } from "@/components/elements/Button";
import { Icons } from "@/components/elements/Icons";
import { caseStudies } from "@/content/case-studies";
import { bulletPoints } from "@/content/pop-bullet-points";
import Image from "next/image";
import React from "react";

const CaseStudies = () => {
  return (
    <section
      id="case-studies"
      className="flex flex-col gap-12 py-20 md:gap-24 md:py-40"
    >
      <AppContainer className="grid gap-8 lg:grid-cols-8 lg:gap-16">
        <div className="flex flex-col gap-12 lg:col-span-3">
          <Image
            src="/illustrations/proof-of-passport.jpg"
            width={560}
            height={320}
            alt="case-studies"
            className="aspect-video w-full"
          />
          <span className="lg:max-w-[340px] font-alliance text-sm leading-5 text-brand-black pl-6 border-l border-[#D9D9D9]">
            OpenPassport lets users scan the NFC chip in their
            government-issued passport and prove the validity of their ID
            anonymously.
          </span>
        </div>
        <div className="lg:col-span-5">
          {bulletPoints.map(({ title, description, url }, index) => {
            return (
              <div className="flex flex-col gap-3" key={index}>
                <div className="flex flex-col gap-3 py-6">
                  <span className="font-normal text-black [&>strong]:!text-black/50 text-xl tracking-[-0.6px] leading-5 font-alliance">
                    {title}
                  </span>
                  <span className="text-black/70 font-alliance text-sm leading-5 md:max-w-[360px]">
                    {description}
                  </span>
                </div>
                <AppLink
                  className="relative group flex items-center gap-1 border-t border-b border-dashed py-3 border-light-black/25 duration-200 hover:border-light-black before:duration-300 before:bg-black before:absolute before:will-change-transform before:left-0 before:origin-bottom before:w-full before:h-full before:content-[''] before:bottom-0 before:scale-y-0 hover:before:scale-y-100 hover:border-transparent"
                  href={url.href}
                  external
                >
                  <span className="relative text-light-black text-base font-alliance group-hover:text-white duration-300">
                    {url.label}
                  </span>
                  <Icons.ExternalLink className="relative text-light-black group-hover:text-white duration-300" />
                </AppLink>
              </div>
            );
          })}
        </div>
      </AppContainer>
      <AppContainer className="flex flex-col gap-8 md:gap-24">
        <div className="flex flex-col gap-8 border-b border-dashed pb-8 border-b-light-black/25">
          <div className="flex flex-col">
            <h4 className=" font-alliance text-[32px] text-[#020202] tracking-[-0.96px]">
              Case studies
            </h4>
            <AppLink href={LINKS.READ_MORE} external>
              <Button icon={<Icons.ExternalLink className="text-white" />}>
                Read More
              </Button>
            </AppLink>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-8 lg:gap-16">
          <div className="lg:col-span-5">
            {caseStudies.map(
              ({ title, description, href, inEvidence }, index) => {
                if (inEvidence) return null;
                return (
                  <CaseStudyCard
                    key={index}
                    title={title}
                    description={description}
                    href={href}
                  />
                );
              }
            )}
          </div>
          <div className="lg:col-span-3">
            {caseStudies.map(
              ({ title, description, image, href, inEvidence }, index) => {
                if (!inEvidence) return null;
                return (
                  <CaseStudyCard
                    key={index}
                    title={title}
                    description={description}
                    image={image}
                    href={href}
                    inEvidence={inEvidence}
                  />
                );
              }
            )}
          </div>
        </div>
      </AppContainer>
    </section>
  );
};

CaseStudies.displayName = "CaseStudies";
export { CaseStudies };
