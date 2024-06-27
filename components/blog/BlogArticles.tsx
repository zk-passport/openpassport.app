import { AppContainer } from "../AppContainer";
import { Article, getArticles } from "@/common/lib/posts";
import { BlogCard } from "../cards/BlogCard";

export const BlogArticles = () => {
  const articles = getArticles();
  return (
    <AppContainer className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-x-8 lg:gap-y-8">
      {articles.map(({ id, title, image, tldr = "" }: Article) => {
        const url = `/${id}`;

        return (
          <BlogCard
            key={id}
            title={title}
            image={image}
            tldr={tldr}
            url={url}
          />
        );
      })}
    </AppContainer>
  );
};
