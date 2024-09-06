"use client";

import Image from "next/image";
import { AppContainer } from "@/components/AppContainer";
import { Button } from "@/components/elements/Button";
import { Icons } from "@/components/elements/Icons";
import { AppLink } from "@/components/AppLink";
import { LINKS } from "@/common/settings";
import { motion } from "framer-motion";

const Intro = () => {
  return (
    <section
      id="intro"
      className="flex flex-col gap-12 relative h-full-screen pt-10 md:pt-0 lg:gap-0"
    >
      <AppContainer className="grid grid-cols-1 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-[70px] col-span-1 md:col-span-2 pt-14 md:pt-24 md:max-w-[438px]"
        >
          <h1 className="text-brand-black tracking-[-0.77px] text-2xl leading-6 md:tracking-[-1.44px] md:text-5xl md:leading-[46px]">
            Prove your humanity while staying
            <br />
            <motion.span
              initial={{
                filter: "blur(2px)",
                opacity: 0.48,
              }}
              animate={{
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3,
              }}
            >
              anonymous
            </motion.span>
          </h1>
          <div className="flex flex-col gap-8 md:gap-12">
            <span className="border-l border-[#2E2E2F] [&>strong]:text-light-black py-0.5 pl-6 text-light-black/60 text-sm font-normal leading-5">
              OpenPassport lets applications check their users are humans with a{" "}
              <strong>few lines of code</strong>, while preserving their
              privacy.
            </span>
            <div className="flex items-center gap-4">
              <AppLink href={LINKS.APP_DEMO} external>
                <Button icon={<Icons.ExternalLink />}>Launch App</Button>
              </AppLink>
              <AppLink href={LINKS.DOCUMENTATION} external>
                <Button icon={<Icons.ExternalLink />} variant="secondary">
                  Read Docs
                </Button>
              </AppLink>
            </div>
          </div>
        </motion.div>
      </AppContainer>
      <div className="overflow-hidden w-full min-h-[430px] pt-10 md:mt-0 relative lg:w-1/2 md:max-w-1/2 lg:absolute lg:right-0 lg:bottom-0 lg:top-0 bg-cover">
        <Image
          src="/images/intro-pop.jpg"
          alt="intro openpassport"
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
