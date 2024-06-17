"use client";

import { AppContainer } from "@/components/AppContainer";
import { Card } from "@/components/elements/Card";
import { Icons } from "@/components/elements/Icons";
import { useCases } from "@/content/use-cases";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const UseCases = () => {
  const controls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-300px",
  });

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, x: 0 });
    }
  }, [isInView, controls]);

  return (
    <section ref={ref} id="use-cases" className="pt-28 pb-10 md:pt-32 md:pb-12">
      <AppContainer className=" flex flex-col gap-8">
        <h2 className="text-brand-black tracking-[-0.77px] text-2xl leading-6l md:tracking-[-1.44px] md:text-5xl md:leading-[46px]">
          Explore use cases
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
          {useCases.map(({ image, title, items, inEvidence }, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={controls}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.2,
                }}
                className={`col-span-1 ${
                  inEvidence ? "md:col-span-3" : "md:col-span-2"
                }`}
              >
                <Card.Base>
                  <div
                    className={`relative  min-h-[210px]  ${
                      inEvidence ? "md:min-h-[180x]" : "md:min-h-[190px]"
                    } ${!image ? "bg-black/20" : ""}`}
                  >
                    {image && (
                      <Image
                        className=" object-cover"
                        src={image}
                        alt={title}
                        fill
                      />
                    )}
                  </div>
                  <Card.Content className="flex flex-col gap-4">
                    <h4 className="font-alliance text-black text-base tracking-[-0.48px] left-4 md:text-xl md:tracking-[-0.6px] md:leading-5">
                      {title}
                    </h4>
                    <div className="flex flex-col gap-2">
                      {items?.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-[13px_1fr] items-start gap-2"
                        >
                          <Icons.CheckedCircle className="mt-1" />
                          <span className=" font-alliance text-black/80 text-sm leading-5">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card.Content>
                </Card.Base>
              </motion.div>
            );
          })}
        </div>
      </AppContainer>
    </section>
  );
};
