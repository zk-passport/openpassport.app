import React from "react";
import { AppContainer } from "@/components/AppContainer";
import { BlogArticles } from "@/components/blog/BlogArticles";

export default function BlogPage() {
  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-center background-gradient z-0 pt-20 pb-8 md:pt-[120px] md:pb-[60px] overflow-hidden !bg-auto md:!bg-cover">
        <div className="hidden bg-intro-gradient dark:bg-intro-gradient-dark md:absolute z-0"></div>
        <section className={`relative my-6 z-[2]`}>
          <AppContainer className="flex flex-col gap-6">
            <div className="flex flex-col gap-8 text-center mx-auto max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-black font-alliance uppercase leading-none">
                Blog
              </h1>
            </div>
          </AppContainer>
        </section>
      </div>

      <div className="bg-white dark:bg-gray-1000 pt-10 -mt-16 md:mt-0 md:pt-16 pb-16 z-[4]">
        <BlogArticles />
      </div>
    </div>
  );
}
