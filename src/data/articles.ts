import { contentApi } from "@/services/contentApi";
import { useContent } from "@/hooks/useContent";

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  cover?: string;
  category: string;
  publishedAt: string;
  tags: string[];
}

export interface ArticlesState {
  categories: string[];
  articles: Article[];
}

export const articlesApi = {
  get: () => contentApi.getArticles(),
};

export function useArticles() {
  return useContent(articlesApi.get);
}

export function getArticleBySlug(articles: Article[], slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(articles: Article[], category: string): Article[] {
  if (category === "全部" || category === "All") return articles;
  return articles.filter((a) => a.category === category);
}
