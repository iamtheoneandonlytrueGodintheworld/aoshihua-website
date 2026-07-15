import type { CompanyInfo } from "@/data/company";
import type { Product, ProductCategory } from "@/data/products";
import type { Article } from "@/data/articles";

export interface HomeConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroBackground: string;
  ctaPrimary: string;
  ctaSecondary: string;
  introImage: string;
  aboutText: string;
}

export interface ProductsData {
  categories: ProductCategory[];
  products: Product[];
}

export interface ArticlesData {
  categories: string[];
  articles: Article[];
}

export interface ChatKnowledgeData {
  welcomeMessage: string;
  fallbackMessage: string;
  humanHandoffMessage: string;
  knowledge: {
    keywords: string[];
    response: string;
  }[];
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export const contentApi = {
  getCompany: () => fetchJson<CompanyInfo>("/content/company.json"),
  getHome: () => fetchJson<HomeConfig>("/content/home.json"),
  getProducts: () => fetchJson<ProductsData>("/content/products.json"),
  getArticles: () => fetchJson<ArticlesData>("/content/articles.json"),
  getChatKnowledge: () => fetchJson<ChatKnowledgeData>("/content/chat-knowledge.json"),
};
