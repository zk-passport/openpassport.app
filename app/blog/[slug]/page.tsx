export const generateStaticParams = async () => {
  const articles = getArticles();
  return articles.map(({ id }) => ({
    slug: id,
  }));
};

export async function generateMetadata({ params }: any) {
  const post = getArticleById(params.slug);

  return {
    title: post?.title ? `${post?.title} - Cursive` : "Cursive",
    description:
      post?.tldr ??
      "A cryptography and design lab focused on applications of signed data.",
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
    <div className="flex flex-col">
      <div className="flex items-start justify-center background-gradient z-0 pt-10 pb-8 md:pb-[80px]">
        <section className={`relative my-6 w-full z-0`}>
          <AppContainer>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 w-full">
                <small className="text-sm font font-alliance text-light-black">
                  {post?.date ?? "Loading..."}
                </small>
                <h1 className="w-full text-3xl md:text-[48px] font-black text-black dark:text-white md:leading-[48px] text-left">
                  {post?.title ?? "Loading..."}
                </h1>

                <span className="text-[20px] font-alliance text-gray-600">
                  {post?.tldr ?? "Loading..."}
                </span>
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
