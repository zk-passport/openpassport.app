import { classed } from "@tw-classed/react";

export const AppContainer = classed.div(
  "px-6 w-full mx-auto lg:px-6 2xl:px-0",
  {
    variants: {
      size: {
        sm: "max-w-7xl",
        md: "max-w-[1480px]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);
