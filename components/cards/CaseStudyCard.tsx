import Image from "next/image";
import { Icons } from "../elements/Icons";
import { AppLink } from "../AppLink";

interface CaseStudyCardProps {
  title: string;
  description: string;
  href: string;
  image?: string;
  inEvidence?: boolean;
}

const CaseStudyCard = ({
  title,
  image,
  href,
  description,
  inEvidence,
}: CaseStudyCardProps) => {
  return (
    <AppLink
      href={href}
      className={`flex flex-col gap-8 duration-200 group ${
        !inEvidence
          ? "border-b border-dashed border-light-black/25 py-6 hover:border-light-black"
          : ""
      }`}
    >
      {image && inEvidence && (
        <Image
          className="aspect-video bg-center w-full object-cover rounded-[32px] overflow-hidden"
          src={image}
          height={560}
          width={320}
          alt={title}
        />
      )}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <h5 className="text-light-black text-[13px] font-alliance font-medium leading-3">
            {title}
          </h5>
          <Icons.ExternalLink className="text-light-black" />
        </div>
        <span
          className={`text-black/70 font-normal leading-5 font-alliance text-sm duration-200 group-hover:text-black ${
            !inEvidence ? "md:w-3/4" : ""
          }`}
        >
          {description}
        </span>
      </div>
    </AppLink>
  );
};

CaseStudyCard.displayName = "CaseStudyCard";
export { CaseStudyCard };
