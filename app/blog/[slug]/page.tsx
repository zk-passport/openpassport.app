export const generateStaticParams = async () => {
  const articles = getArticles();
  return articles.map(({ id }) => ({
    slug: id,
  }));
};

export async function generateMetadata({ params }: any) {
  const post = getArticleById(params.slug);

  return {
    title: post?.title ? `${post?.title} - Proof of Passport` : "Proof of Passport",
    description:
      post?.tldr ??
      "Prove your humanity while staying anonymous.",
  };
}

import { getArticles, getArticleById } from "@/common/lib/posts";
import { AppContainer } from "@/components/AppContainer";
import { BlogContent } from "@/components/blog/BlogContent";
import React from "react";

export default function BlogArticle({ params }: any) {
  const slug = params.slug;
  const post = getArticleById(slug);

  if (!post) return null;
  return (
    <div className="flex flex-col xl:mx-72 lg:mx-48 md:mx-24">
      <div className="flex items-start justify-center background-gradient z-0 pt-10 pb-8 md:pb-10">
        <section className={`relative my-6 w-full z-0`}>
          <AppContainer>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 w-full">
                <small className="text-xs font font-alliance text-light-black/60">
                  {post?.date ?? "Loading..."}
                </small>
                <div className="flex flex-col gap-4">
                  <h1 className="text-brand-black tracking-[-0.77px] text-2xl leading-6 md:tracking-[-1.44px] md:text-5xl md:leading-[46px]">
                    {post?.title ?? "Loading..."}
                  </h1>
                  {post?.tldr
                    ? <span className="border-l border-[#2E2E2F] [&>strong]:text-light-black py-0.5 pl-6 text-light-black/60 text-sm font-normal leading-5">
                        {post.tldr}
                      </span>
                    : null
                  }
                </div>
              </div>
            </div>
          </AppContainer>
        </section>
      </div>
      <div className="pt-5 pb-32">
        <BlogContent post={post} />
      </div>
    </div>
  );
}
