interface CaseStudy {
  title: string;
  description: string;
  href: string;
  image?: string;
  inEvidence?: boolean; // if true, the image will be displayed
}

export const caseStudies: CaseStudy[] = [
  {
    href: "#",
    title: "Arbitrum Airdrop",
    description:
      "During their airdrop, the Arbitrum Foundation lost an estimated $253M to airdrop farmers. That's 21.8% of the supply.",
  },
  {
    href: "#",
    title: "Random Article Nav",
    description:
      "During their airdrop, the Arbitrum Foundation lost an estimated $253M to airdrop farmers. That's 21.8% of the supply.",
  },
  {
    href: "#",
    title: "Name of Artilce",
    description:
      "During their airdrop, the Arbitrum Foundation lost an estimated $253M to airdrop farmers. That's 21.8% of the supply.",
  },
  {
    href: "#",
    title: "Name of Artilce",
    description:
      "During their airdrop, the Arbitrum Foundation lost an estimated $253M to airdrop farmers. That's 21.8% of the supply.",
    inEvidence: true,
    image: "/illustrations/airdrop-use-case.jpg",
  },
];
