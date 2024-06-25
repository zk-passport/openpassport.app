import React from "react";
import { AppContainer } from "@/components/AppContainer";
import { BlogArticles } from "@/components/blog/BlogArticles";

export default function BlogPage() {
  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-center background-gradient z-0 pt-10 md:pt-20 overflow-hidden !bg-auto md:!bg-cover">
        <div className="hidden bg-intro-gradient dark:bg-intro-gradient-dark md:absolute z-0"></div>
        <section className={`relative my-6 z-[2] w-full`}>
          <AppContainer className="flex flex-col gap-6">
            <div className="flex flex-col gap-8">
              <h1 className="text-brand-black border-l-[1.88px] border-l-black pl-3 tracking-[-0.77px] text-2xl leading-6 md:tracking-[-1.44px] md:text-5xl md:leading-[46px]">
                Blog
              </h1>
            </div>
          </AppContainer>
        </section>
      </div>

      <div className="bg-white dark:bg-gray-1000 pt-10 md:mt-0 md:pt-16 pb-16 z-[4]">
        <BlogArticles />
      </div>
    </div>
  );
}
