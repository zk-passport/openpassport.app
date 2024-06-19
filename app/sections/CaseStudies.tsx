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
      <AppContainer className="grid gap-8 md:grid-cols-8 md:gap-16">
        <div className="flex flex-col gap-12 md:col-span-3">
          <Image
            src="/illustrations/proof-of-passport.jpg"
            width={560}
            height={320}
            alt="case-studies"
            className="aspect-video"
          />
          <span className="md:max-w-[340px] font-alliance text-sm leading-5 text-brand-black pl-6 border-l border-[#D9D9D9]">
            Proof of Passport lets users scan the NFC chip in their
            government-issued passport and prove the correctness of the
            signature in a zk-SNARK.
          </span>
        </div>
        <div className="md:col-span-5">
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
                  className="flex items-center gap-1 border-t border-b border-dashed py-3 border-light-black/25 duration-200 hover:border-light-black"
                  href={url.href}
                  external
                >
                  <span className="text-light-black text-base font-alliance">
                    {url.label}
                  </span>
                  <Icons.ExternalLink />
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
              <Button icon={<Icons.ExternalLink />}>Read More</Button>
            </AppLink>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-8 md:gap-16">
          <div className="md:col-span-5">
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
          <div className="md:col-span-3">
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
