interface CaseStudy {
  title: string;
  description: string;
  href: string;
  image?: string;
  inEvidence?: boolean; // if true, the image will be displayed
}

export const caseStudies: CaseStudy[] = [
  {
    href: "/blog/nap",
    title: "Reflecting on the New Democratic Primary",
    description:
      "On shipping a new democratic primary in two weeks.",
    image: "/nap.jpg",
  },
  {
    href: "/blog/playground",
    title: "Announcing the OpenPassport Playground",
    description:
      "Try out the playground now!",
    image: "/playground.jpg",
  },
  {
    href: "/blog/introducing-op",
    title: "Introducing OpenPassport",
    description:
      "OpenPassport lets applications check their user's identity while preserving their privacy.",
  },
  {
    href: "/blog/introducing-op",
    title: "Introducing OpenPassport",
    description:
      "OpenPassport lets applications check their user's identity while preserving their privacy.",
    inEvidence: true,
    image: "/introducing-op.jpg",
  },
  // {
  //   href: "/blog/arbitrum",
  //   title: "Arbitrum Airdrop",
  //   description:
  //     "During their airdrop, the Arbitrum Foundation lost an estimated $253M to airdrop farmers. That's 21.8% of the supply.",
  //   inEvidence: true,
  //   image: "/illustrations/airdrop-use-case.jpg",
  // },
];
