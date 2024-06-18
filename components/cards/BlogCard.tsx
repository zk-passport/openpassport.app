import React from "react";
import Image from "next/image";
import { AppLink } from "../AppLink";
import { Icons } from "../elements/Icons";

interface BlogCardProps {
  title: string;
  tldr: string;
  image?: string;
  url: string;
}

const BlogCard = ({ title, tldr, image, url }: BlogCardProps) => {
  return (
    <AppLink className="group flex flex-col gap-8" href={url} rel="noreferrer">
      <div className="md:min-h-[200px] bg-cover bg-slate-900/50 rounded-[32px] overflow-hidden">
        {image && (
          <Image
            className="aspect-video bg-center bg-cover w-full object-cover"
            src={image}
            height={560}
            width={320}
            alt={title}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <h5 className="text-light-black text-[13px] font-alliance font-medium leading-3 group-hover:underline duration-200">
            {title}
          </h5>
          <Icons.ExternalLink />
        </div>
        <span
          className={`text-black/70 font-normal leading-5 font-alliance text-sm`}
        >
          {tldr}
        </span>
      </div>
    </AppLink>
  );
};

BlogCard.displayName = "BlogCard";

export { BlogCard };
