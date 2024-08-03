export interface MenuItem {
  label: string;
  href: string;
  footerOnly?: boolean;
  external?: boolean;
  showInMobile?: boolean;
}

export const SITE_CONFIG = {
  ID: "proof-of-passport",
  NAME: "OpenPassport",
  DESCRIPTION: "Prove your humanity while staying anonymous",
};

export const LINKS: Record<string, string> = {
  //social
  GITHUB: "https://github.com/zk-passport/proof-of-passport",
  TWITTER: "https://twitter.com/proofofpassport",
  TELEGRAM: "https://t.me/proofofpassport",
  // app
  APP_DEMO: "https://testflight.apple.com/join/WfZnZWfn",
  APP_STORE: "https://testflight.apple.com/join/WfZnZWfn",
  DOCUMENTATION: "https://docs.openpassport.app/",
  BOOK_DEMO: "https://calendly.com/florent-tavernier/30min",
  BLOG: "https://blog.openpassport.app/",
  MAP: "https://map.openpassport.app/",
  BOUNTIES: "https://github.com/zk-passport/proof-of-passport/issues",
  READ_MORE: "https://blog.openpassport.app/",
  INTRODUCTION_TO_ZK: "https://docs.openpassport.app/",
};

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "How it works",
    href: "https://www.openpassport.app/#how-it-works",
  },
  {
    label: "Use cases",
    href: "https://www.openpassport.app/#use-cases",
  },
  {
    label: "Develop",
    href: "https://www.openpassport.app/#develop",
  },
  {
    label: "Blog",
    href: LINKS.BLOG,
  },
  {
    label: "Map",
    href: LINKS.MAP,
  },
  {
    label: "Docs",
    href: LINKS.DOCUMENTATION,
    external: true,
    footerOnly: true,
  },
  {
    label: "Blog",
    href: LINKS.BLOG,
    external: true,
    footerOnly: true,
  },
  {
    label: "Bounties",
    href: LINKS.BOUNTIES,
    external: true,
    footerOnly: true,
  },
];

export const SOCIAL_LINKS = [];
