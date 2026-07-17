import type { CompanyInfo } from "@/data/company";
import type { Product, ProductCategory } from "@/data/products";
import type { Article } from "@/data/articles";

export interface HomeStat {
  value: number;
  suffix: string;
  label: string;
}

export interface HomeAdvantage {
  icon: string;
  title: string;
  desc: string;
}

export interface HomeConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroBackground: string;
  ctaPrimary: string;
  ctaSecondary: string;
  introImage: string;
  aboutText: string;
  stats: HomeStat[];
  advantages: HomeAdvantage[];
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

let currentLocale = "zh";

export function setContentLocale(locale: string) {
  currentLocale = locale;
}

export function getContentLocale(): string {
  return currentLocale;
}

function getContentPath(file: string): string {
  return `/content/${currentLocale}/${file}`;
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export const contentApi = {
  getCompany: () => fetchJson<CompanyInfo>(getContentPath("company.json")),
  getHome: () => fetchJson<HomeConfig>(getContentPath("home.json")),
  getProducts: () => fetchJson<ProductsData>(getContentPath("products.json")),
  getArticles: () => fetchJson<ArticlesData>(getContentPath("articles.json")),
  getChatKnowledge: () => fetchJson<ChatKnowledgeData>(getContentPath("chat-knowledge.json")),
};
