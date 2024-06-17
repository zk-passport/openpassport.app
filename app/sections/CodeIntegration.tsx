import { LINKS } from "@/common/settings";
import { AppContainer } from "@/components/AppContainer";
import { AppLink } from "@/components/AppLink";
import { Button } from "@/components/elements/Button";
import { Icons } from "@/components/elements/Icons";
import Image from "next/image";
import React from "react";

const CodeIntegration = () => {
  return (
    <section className="py-14 md:pb-20 md:pt-28 bg-center bg-cover bg-[url('/pattern/code-integration.jpg')]">
      <AppContainer className="flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col gap-12 mx-auto w-full max-w-[480px]">
          <div className="flex flex-col gap-6">
            <h3 className=" font-alliance text-white font-normal text-center text-2xl md:text-5xl md:leading-[46px] md:tracking-[-1.44px]">
              Integrate in two lines of code
            </h3>
            <span className="text-center font-alliance text-white text-sm leading-5">
              Open a PR in 5 mins and integrate Proof of Passport into your app.
              Verify the proof in 2 lines of code.
            </span>
          </div>
          <AppLink className="mx-auto" href={LINKS.DOCUMENTATION} external>
            <Button variant="secondary" icon={<Icons.ExternalLink />}>
              View Docs
            </Button>
          </AppLink>
        </div>
        <Image
          src="/illustrations/code-sample.svg"
          alt="Code Integration"
          width={800}
          height={400}
          layout="responsive"
          objectFit="cover"
          className="mx-auto max-w-[640px]"
        />
      </AppContainer>
    </section>
  );
};

CodeIntegration.displayName = "CodeIntegration";
export { CodeIntegration };
