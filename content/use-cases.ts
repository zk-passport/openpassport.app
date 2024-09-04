interface UseCase {
  title: string;
  items?: string[]; // list of bullet points description
  image?: string;
  inEvidence?: boolean; // If true, the use case will be displayed with bigger space
}

export const useCases: UseCase[] = [
  {
    image: "/illustrations/airdrops.jpg",
    title: "Airdrops",
    inEvidence: true,
    items: [
      "Reward humans, not bots.",
      "Protect yourself from farmers' flash selling.",
    ],
  },
  {
    image: "/illustrations/social-media.jpg",
    title: "Social media",
    inEvidence: true,
    items: [
      "Add a humanity checkmark to your users' profiles.",
      "Prevent bot attacks on your network.",
      "Protect your users from phishing.",
    ],
  },
  {
    image: "/illustrations/quadratic-funding-proof.jpg",
    title: "Quadratic funding",
    items: [
      "Introduce Sybil resistance.",
      "Fund meaningful projects supported by humans, not farmers.",
    ],
  },
  {
    image: "/illustrations/obfuscated-compliance.jpg",
    title: "Identity verification",
    items: [
      "Verify users are from a specific country or above a certain age.",
      "Check they are not on sanctions lists.",
      "Let them keep all other details private.",
    ],
  },
  {
    image: "/illustrations/wallet-recovery.jpg",
    title: "Wallet recovery",
    items: [
      "Safeguard your assets using your IDs as recovery sources.",
      "Add new signers on your multisig for increased security.",
    ],
  },
];
