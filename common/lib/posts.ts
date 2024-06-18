import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Article {
  id: string;
  title: string;
  image?: string;
  tldr?: string;
  content: string;
  date: string;
  authors?: string[];
}

const postsDirectory = path.join(process.cwd(), "posts");

// Get all articles from /posts
export function getArticles() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");
    if (id.toLowerCase() === "readme") {
      return null;
    }

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
      content: matterResult.content,
    };
  });
  // Sort posts by date
  return allPostsData.filter(Boolean).sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  }) as Article[];
}

export function getArticleById(slug?: string) {
  const articles = getArticles();

  return articles.find((article) => article.id === slug);
}

const lib = { getArticles, getArticleById };

export default lib;
