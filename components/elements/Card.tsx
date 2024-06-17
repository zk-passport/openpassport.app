import { classed } from "@tw-classed/react";

const CardBase = classed.div("border border-gray rounded-2xl overflow-hidden");
const CardContent = classed.div("px-6 py-10 md:px-12 ");

const Card = {
  displayName: "Card",
  Base: CardBase,
  Content: CardContent,
};

export { Card };
