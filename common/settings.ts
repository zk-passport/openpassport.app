export interface MenuItem {
  label: string;
  href: string;
  footerOnly?: boolean;
  external?: boolean;
  showInMobile?: boolean;
}

export const SITE_CONFIG = {
  ID: "openpassport",
  NAME: "OpenPassport",
  DESCRIPTION: "Prove your humanity while staying anonymous",
};

export const LINKS: Record<string, string> = {
  //social
  GITHUB: "https://github.com/zk-passport/openpassport",
  TWITTER: "https://x.com/openpassportapp",
  TELEGRAM: "https://t.me/openpassport",
  // app
  APP_DEMO: "https://openpassport.app/playground",
  DOCUMENTATION: "https://docs.openpassport.app/",
  BOOK_DEMO: "https://calendly.com/florent-tavernier/30min",
  BLOG: "https://blog.openpassport.app/",
  MAP: "https://map.openpassport.app/",
  BOUNTIES: "https://github.com/zk-passport/openpassport/issues",
  READ_MORE: "https://blog.openpassport.app/",
  INTRODUCTION_TO_ZK: "https://docs.openpassport.app/",
  REGISTRY: "https://openpassport.app/registry",
  PLAYGROUND: "https://openpassport.app/playground",
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
    label: "Blog",
    href: LINKS.BLOG,
  },
  {
    label: "Map",
    href: LINKS.MAP,
  },
  {
    label: "Registry",
    href: LINKS.REGISTRY,
  },
  // {
  //   label: "Registry",
  //   href: LINKS.REGISTRY,
  // },
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
