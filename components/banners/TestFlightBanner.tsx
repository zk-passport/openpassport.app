"use client";
import React, { useState } from "react";
import { Banner } from "./Banner";
import { Icons } from "../elements/Icons";
import { AppLink } from "../AppLink";
import { LINKS } from "@/common/settings";

const TestFlightBanner = () => {
  const [showBanner, setShowBanner] = useState(true);

  if (!showBanner) return null;
  return (
    <Banner className="flex sticky top-0">
      <AppLink
        href={LINKS.APP_STORE}
        className="flex gap-4 items-center mx-auto"
        external
      >
        <Icons.Online className=" animate-pulse" />
        <span className="font-alliance text-sm leading-5 text-white/60 [&>strong]:text-white">
          Join our <strong>{`Testflight >`}</strong> iOS Beta is{" "}
          <strong>Live!</strong>
        </span>
        <button
          aria-label="close"
          type="button"
          onClick={() => {
            setShowBanner(false);
          }}
        >
          <Icons.Close />
        </button>
      </AppLink>
    </Banner>
  );
};

TestFlightBanner.displayName = "TestFlightBanner";

export { TestFlightBanner };
