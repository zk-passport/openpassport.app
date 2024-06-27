import { Button } from "@/components/elements/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="bg-cover bg-[url('/pattern/partnership-gradient.svg')] flex items-center justify-center h-full-screen">
      <div className="flex flex-col gap-8 max-w-[315px]">
        <Image
          src="/images/404.png"
          height={150}
          width={200}
          className="w-32"
          alt="404 image"
          priority
        />
        <h1 className="font-alliance leading-7 tracking-[-0.96px] text-[32px]">
          404
        </h1>
        <div className="flex flex-col gap-3">
          <strong className="pl-3 text-brand-black font-medium leading-5 font-alliance text-sm border-l-[1.88px] border-l-black">
            Nothing here yet.
          </strong>
          <span className="font-alliance text-[#151515]/60 [&>strong]:text-black text-sm">
            This url might have moved, or might be broken. You can help report
            bugs by <strong>{`emailing us <3`}</strong>
          </span>
        </div>
        <div>
          <Link href="/">
            <Button>Reterun to home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
