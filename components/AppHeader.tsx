"use client";

import { classed } from "@tw-classed/react";
import { AppLink } from "./AppLink";
import { useState, useEffect } from "react";
import useSettings from "../hooks/useSettings";
import { AppContainer } from "./AppContainer";
import { Button } from "./elements/Button";
import { LINKS, MENU_ITEMS, SOCIAL_LINKS } from "@/common/settings";
import { Icons } from "./elements/Icons";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const LinkItem = classed.div(
  "relative flex items-center text-sm py-2 px-4 font-alliance text-light-black/60 duration-300 tracking-[0.16px]"
);

function MobileNav() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { clientHeight } = useSettings();

  // prevent scrolling of body element when mobile nav is open
  useEffect(() => {
    if (!isMobileNavOpen) {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    } else {
      document.body.style.overflow = "hidden";
      document.body.style.height = `${clientHeight}px`;
    }
  }, [clientHeight, isMobileNavOpen]);

  const menuAppearAnimation = {
    initial: { opacity: 0.6, transform: "translateX(100%)" },
    animate: { opacity: 1, transform: "translateX(0%)" },
    transition: { duration: 0.3 },
  };

  return (
    <div className="flex items-center lg:hidden">
      <button
        type="button"
        aria-label="burgher menu"
        onClick={() => {
          setMobileNavOpen(true);
        }}
      >
        <Icons.Burgher className="text-black" />
      </button>
      {isMobileNavOpen && (
        <motion.div
          {...menuAppearAnimation}
          aria-hidden="true"
          aria-label="mobile nav overlay"
          onClick={() => setMobileNavOpen(false)}
          className="z-5 fixed inset-0 flex justify-end bg-light-black opacity-100"
        />
      )}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            {...menuAppearAnimation}
            className="fixed gap-10 pt-[10px] px-4 pr-[24px] sm:gap-6 sm:pt-6 overflow-hidden inset-y-0 right-0 z-10 flex w-full max-w-[440px] flex-col bg-baltic-sea-950 text-white"
          >
            <div className="flex justify-center ml-auto items-center border border-dashed border-white rounded-full h-[34px] w-[32px]">
              <button
                type="button"
                aria-label="close mobile nav"
                onClick={() => setMobileNavOpen(false)}
              >
                <Icons.CloseModal size={18} className="text-white" />
              </button>
            </div>
            <div className="flex flex-col h-full">
              <div className="flex w-full flex-col gap-5 text-base font-medium">
                <div className="flex items-center gap-4">
                  <AppLink href={LINKS.APP_DEMO} external>
                    <Button
                      icon={<Icons.ExternalLink />}
                      className="mx-auto text-[15px]"
                    >
                      Launch App
                    </Button>
                  </AppLink>
                  <AppLink href={LINKS.DOCUMENTATION} external>
                    <Button
                      icon={<Icons.ExternalLink />}
                      variant="secondary"
                      className="mx-auto text-[15px]"
                    >
                      Read Docs
                    </Button>
                  </AppLink>
                </div>
                <div className="flex flex-col gap-2">
                  {MENU_ITEMS.map(
                    (
                      { footerOnly, label, href, external, showInMobile },
                      index
                    ) => {
                      if (footerOnly && !showInMobile) return null;

                      return (
                        <AppLink
                          key={index}
                          href={href}
                          onClick={() => setMobileNavOpen(false)}
                          external={external}
                          className="flex items-center py-3 font-alliance tracking-[-0.22px] font-base gap-0.5 p-2 border-b border-dashed border-white/40"
                        >
                          {label}
                          {external && (
                            <Icons.ExternalLink
                              className="text-white"
                              size={20}
                            />
                          )}
                        </AppLink>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 md:gap-12 mt-auto overflow-hidden">
                <div className="grid grid-cols-1 gap-8 py-6 items-center border-t border-white/25">
                  <div className="flex items-center gap-2">
                    <AppLink className="w-8" href={LINKS.GITHUB} external>
                      <Icons.Github size={32} className="text-white" />
                    </AppLink>
                    <AppLink
                      className="flex w-8 ml-2 items-center justify-center"
                      href={LINKS.TWITTER}
                      external
                    >
                      <Icons.X size={22} className="text-white" />
                    </AppLink>
                    <AppLink className="w-8" href={LINKS.TELEGRAM} external>
                      <Icons.Telegram size={48} className="text-white" />
                    </AppLink>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-alliance text-white/70 text-sm">
                      MIT Licence. 2024.
                    </span>
                    <span className="font-alliance text-white/40 text-sm">
                      © openpassport.app
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DesktopNav() {
  const pathname = usePathname();
  return (
    <>
      <ul className="hidden lg:flex lg:items-center">
        {MENU_ITEMS.map(({ label, href, footerOnly, external }, index) => {
          if (footerOnly) return null; // this is a footer only item

          const pathParts = href.split("/").filter(Boolean);
          const isHome = pathname === "/" && href === "/";

          // is home or the first part of the path matches the first part of the href
          const isActive =
            isHome ||
            (pathname !== null && pathParts[0] === pathname.split("/")[1]);

          return (
            <div key={index} className="flex items-center group">
              <LinkItem key={index}>
                <div className={`flex items-center gap-[6px]`}>
                  <AppLink
                    className={`duration-200 tracking-[-0.22px] hover:text-black ${isActive ? "text-black border-b border-b-black" : ""
                      }`}
                    href={href}
                    external={external}
                  >
                    {label}
                  </AppLink>
                </div>
              </LinkItem>
              {external && (
                <Icons.ExternalLink className="duration-300  group-hover:text-classic-rose-500" />
              )}
            </div>
          );
        })}
      </ul>

      <div className="hidden md:flex items-center gap-4 ml-auto lg:ml-0">
        <AppLink href={LINKS.APP_DEMO} external>
          <Button icon={<Icons.ExternalLink />}>Launch App</Button>
        </AppLink>
        <AppLink href={LINKS.DOCUMENTATION} external>
          <Button
            variant="secondary"
            icon={<Icons.ExternalLink />}
            className="!border-none"
          >
            Read Docs
          </Button>
        </AppLink>
      </div>
    </>
  );
}

const AppHeader = () => {
  return (
    <header className="top-0 sticky z-50 bg-white customHeader">
      <AppContainer
        size="md"
        className="flex items-center justify-between py-[10px]"
      >
        <AppLink href="https://www.openpassport.app/">
          <Image
            className="hidden md:block"
            src="/images/logo.svg"
            // width={170}
            // height={19}
            width={130}
            height={14}
            alt="logo"
          />
          <Image
            className="block md:hidden"
            src="/images/logo-mobile.svg"
            width={36}
            height={15}
            alt="logo"
          />
        </AppLink>
        <DesktopNav />
        <MobileNav />
      </AppContainer>
    </header>
  );
};

AppHeader.displayName = "AppHeader";

export { AppHeader };
