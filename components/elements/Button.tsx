import { classed } from "@tw-classed/react";
import { forwardRef } from "react";

type Position = "top" | "right" | "bottom" | "left";

const ButtonBase = classed.button(
  "font-alliance relative self-start duration-200 ease-in-out disabled:cursor-not-allowed",
  {
    variants: {
      rounded: {
        true: "rounded-full",
        false: "",
      },
    },
    defaultVariants: {
      rounded: true,
    },
  }
);

const ButtonComponent = classed(ButtonBase, {
  variants: {
    variant: {
      primary: "bg-black-gradient text-white border border-black-gradient",
      secondary: "bg-white border text-light-black border-[#15151580]",
      transparent:
        "bg-transparent text-white border border-white border-dashed",
    },
    size: {
      md: "px-8 py-3 text-sm font-normal",
      lg: "px-4 py-3 text-base font-normal",
    },
  },
  // Set default settings
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const IconPositionMapping: Record<Position, string> = {
  top: "flex flex-col items-center justify-center",
  right: "flex flex-row-reverse gap-2 items-center justify-center",
  bottom: "flex flex-col-reverse gap-2 items-center justify-center",
  left: "flex items-center gap-1 justify-center",
};

type ButtonProps = React.ComponentProps<typeof ButtonComponent> & {
  icon?: React.ReactNode; // Add an icon prop
  iconPosition?: Position;
};

const DEFAULT_ICON_POSITION: Position = "right";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      icon,
      children,
      iconPosition = DEFAULT_ICON_POSITION,
      ...rest
    } = props;
    return (
      <ButtonComponent {...rest} ref={ref}>
        <div
          className={IconPositionMapping[iconPosition ?? DEFAULT_ICON_POSITION]}
        >
          {icon}
          <span>{children}</span>
        </div>
      </ButtonComponent>
    );
  }
);

Button.displayName = "Button";
