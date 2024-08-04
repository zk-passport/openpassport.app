"use client";

import { LINKS } from "@/common/settings";
import { AppContainer } from "@/components/AppContainer";
import { AppLink } from "@/components/AppLink";
import { Button } from "@/components/elements/Button";
import { Icons } from "@/components/elements/Icons";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const CodeIntegration = () => {
  const controls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [isInView, controls]);

  return (
    <section
      id="develop"
      className="py-14 md:pb-20 md:pt-28 bg-center bg-cover bg-[url('/pattern/code-integration.jpg')]"
    >
      <AppContainer className="flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col gap-12 mx-auto w-full max-w-[480px]">
          <div className="flex flex-col gap-6">
            <h3 className=" font-alliance text-white font-normal text-center tracking-[-0.96px] text-2xl md:text-5xl md:leading-[46px] md:tracking-[-1.44px]">
              Integrate in <strong className="opacity-50">two lines</strong> of
              code
            </h3>
            <span className="text-sm leading-5 font-alliance z-[2] text-center text-white/80">
              Open a PR in 5 mins and integrate OpenPassport into your app.
              Verify the proof in 2 lines of code.
            </span>
          </div>
          <AppLink className="mx-auto" href={LINKS.DOCUMENTATION} external>
            <Button variant="secondary" icon={<Icons.ExternalLink />}>
              View Docs
            </Button>
          </AppLink>
        </div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={controls}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          <Image
            src="/illustrations/code-sample.svg"
            alt="Code Integration"
            width={800}
            height={400}
            layout="responsive"
            objectFit="cover"
            className="mx-auto max-w-[640px]"
          />
        </motion.div>
      </AppContainer>
    </section>
  );
};

CodeIntegration.displayName = "CodeIntegration";
export { CodeIntegration };
