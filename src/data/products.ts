import { contentApi } from "@/services/contentApi";
import { useContent } from "@/hooks/useContent";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "premix" | "mixing" | "dust" | "crusher";
  categoryName: string;
  summary: string;
  description: string;
  image: string;
  parameters: { label: string; value: string }[];
  features: string[];
  application: string;
}

export interface ProductCategory {
  key: string;
  name: string;
}

export interface ProductsState {
  categories: ProductCategory[];
  products: Product[];
}

export const productsApi = {
  get: () => contentApi.getProducts(),
};

export function useProducts() {
  return useContent(productsApi.get);
}

export function getProductBySlug(products: Product[], slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(products: Product[], category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}
