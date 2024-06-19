"use client";
import React, { useEffect, useState } from "react";
import { Banner } from "./Banner";
import { Icons } from "../elements/Icons";
import { AppLink } from "../AppLink";
import { LINKS } from "@/common/settings";

const TestFlightBanner = () => {
  const BANNER_STORAGE_ID = "POP-TEST-FLIGHT-BANNER";
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const bannerRemoved = localStorage.getItem(BANNER_STORAGE_ID);
    if (bannerRemoved === null) setShowBanner(true);
  }, []);

  if (!showBanner) return null;

  return (
    <Banner className="flex fixed left-0 right-0 z-[2] top-[52px] md:top-[66px] w-full">
      <div className="flex items-center gap-4 mx-auto">
        <AppLink
          href={LINKS.APP_STORE}
          className="flex gap-4 items-center mx-auto"
          external
        >
          <Icons.Online className="animate-pulse" />
          <span className="font-alliance text-sm leading-5 text-white/60 [&>strong]:text-white">
            Join our <strong>{`Testflight >`}</strong> iOS Beta is{" "}
            <strong>Live!</strong>
          </span>
        </AppLink>
        <button
          aria-label="close"
          type="button"
          onClick={() => {
            localStorage.setItem(BANNER_STORAGE_ID, "true");
            setShowBanner(false);
          }}
        >
          <Icons.Close />
        </button>
      </div>
    </Banner>
  );
};

TestFlightBanner.displayName = "TestFlightBanner";

export { TestFlightBanner };
