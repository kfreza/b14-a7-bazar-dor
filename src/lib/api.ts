import { cacheLife } from "next/cache";
import type { Category, Product } from "./types";

const BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function request<T>(path: string): Promise<T | null> {
  let lastError: unknown;

  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return (await res.json()) as T;
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(`Bazar Dor API request failed: ${path}`, { cause: lastError });
}

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  return (await request<Product[]>("/products")) ?? [];
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  return (
    (await request<Product[]>(`/products?category=${encodeURIComponent(slug)}`)) ?? []
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  cacheLife("hours");
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  return (await request<Category[]>("/categories")) ?? [];
}

export async function getCategory(slug: string): Promise<Category | null> {
  "use cache";
  cacheLife("hours");
  return request<Category>(`/categories/${encodeURIComponent(slug)}`);
}
