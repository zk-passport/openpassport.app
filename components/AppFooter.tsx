import React from "react";
import { AppContainer } from "./AppContainer";
import { LINKS, MenuItem } from "@/common/settings";
import { AppLink } from "./AppLink";
import { Icons } from "./elements/Icons";

const FOOTER_LINKS: MenuItem[] = [
  {
    label: "Blog",
    href: LINKS.BLOG,
  },
  {
    label: "Github",
    href: LINKS.GITHUB,
    external: true,
  },
  {
    label: "Docs",
    href: LINKS.DOCUMENTATION,
    external: true,
  },
  {
    label: "Bounties",
    href: LINKS.BOUNTIES,
    external: true,
  },
  {
    label: "Map",
    href: LINKS.MAP,
  },
];

const AppFooter = () => {
  return (
    <footer className="pt-8 overflow-hidden bg-cover bg-[url('/pattern/footer-gradient.jpg')]">
      <AppContainer className="!relative flex flex-col items-center ">
        <div className="w-full">
          <div className="flex flex-col gap-6 pb-56">
            <div className="grid grid-cols-1 gap-5 pb-6 items-center border-b border-white/25 md:pb-2 md:grid-cols-3 md:gap-0">
              <div className=" flex items-center gap-2">
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
              <span className="md:mx-auto font-alliance text-white/70 text-sm">
                MIT Licence. 2024.
              </span>
              <span className="md:ml-auto font-alliance text-white/70 text-sm">
                © proofofpassport.com
              </span>
            </div>
            <div>
              {FOOTER_LINKS.map(({ href, label, external }, index) => {
                return (
                  <div
                    key={index}
                    className="group py-3 border-b border-b-white/40 border-dashed"
                  >
                    <div className="flex items-center gap-1">
                      <AppLink href={href} external={external}>
                        <div className="flex items-center gap-1">
                          <span className="font-alliance text-base text-white">
                            {label}
                          </span>
                          {external && (
                            <Icons.ExternalLink className="w-2 h-2 text-white" />
                          )}
                        </div>
                      </AppLink>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <span className="text-white text-gradient-white leading-none absolute left-0 bottom-0 lg:bottom-[-3rem] text-[calc(100vw/5)] md:text-[calc(100vw/9)] lg:text-[calc(100vw/8.7)] xl:text-[calc(100vw/11)]">
          Proof of Passport
        </span>
      </AppContainer>
    </footer>
  );
};

AppFooter.displayName = "AppFooter";

export { AppFooter };
