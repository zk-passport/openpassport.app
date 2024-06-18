export interface MenuItem {
  label: string;
  href: string;
  footerOnly?: boolean;
  external?: boolean;
  showInMobile?: boolean;
}

export const SITE_CONFIG = {
  NAME: "Proof of Passport",
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
  DOCUMENTATION: "https://proof-of-passport.gitbook.io",
  BOOK_DEMO: "https://calendly.com/florent-tavernier/30min",
  MEDIA: "#",
  BLOG: "#",
  BOUNTIES: "https://github.com/zk-passport/proof-of-passport/issues",
  READ_MORE: "#",
};

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "How it works",
    href: "/#how-it-works",
  },
  {
    label: "User cases",
    href: "/#use-cases",
  },
  {
    label: "Develop",
    href: "/#develop",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Docs",
    href: LINKS.DOCUMENTATION,
    external: true,
    footerOnly: true,
  },
  {
    label: "Media",
    href: LINKS.MEDIA,
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
