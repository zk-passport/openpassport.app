import { classed } from "@tw-classed/react";

const Banner = classed.div("py-3", {
  variants: {
    variant: {
      black: "bg-brand-black",
    },
  },
  defaultVariants: {
    variant: "black",
  },
});

Banner.displayName = "Banner";
export { Banner };
