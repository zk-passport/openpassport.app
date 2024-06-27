import { HtmlHTMLAttributes } from "react";

interface HowItWorkCardProps
  extends Pick<HtmlHTMLAttributes<HTMLDivElement>, "className" | "onClick"> {
  title: string;
  description: string;
  isActive?: boolean;
  stepIndex: number; // number of the step
}

const HowItWorkCard = ({
  title,
  description,
  isActive,
  className = "",
  stepIndex,
  ...props
}: HowItWorkCardProps) => {
  return (
    <div
      {...props}
      className={`relative group cursor-pointer flex flex-col gap-2 py-6 px-8 duration-200 before:duration-300 before:bg-black before:absolute before:will-change-transform before:left-0 before:origin-bottom before:w-full before:h-full before:content-[''] before:bottom-0 before:scale-y-0 hover:before:scale-y-100  ${className}`}
      style={{
        background: isActive
          ? "#FFFFFF"
          : "linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(153, 153, 153, 0.00) 100%)",
      }}
    >
      <div className="flex gap-3 items-center z-[2]">
        <div
          className={`rounded-full  text-[8px] group-hover:!bg-white group-hover:!text-black font-bold w-[18px] h-[18px] flex items-center text-center justify-center" ${
            isActive ? "text-white bg-black" : "text-[#DCD5D5] bg-white/25"
          }`}
        >
          <div className="mx-auto">{stepIndex}</div>
        </div>
        <span
          className={`text-base tracking-[-0.48px] font-alliance z-[2] group-hover:!text-white ${
            isActive ? "text-black " : "text-white"
          }`}
        >
          {title}
        </span>
      </div>
      <span
        className={`text-sm leading-5 font-alliance z-[2] group-hover:!text-white/80 ${
          isActive ? "text-black/80" : "text-white/60"
        }`}
      >
        {description}
      </span>
    </div>
  );
};

export { HowItWorkCard };
