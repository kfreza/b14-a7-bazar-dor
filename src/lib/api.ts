import { cacheLife } from "next/cache";
import fallbackCategories from "@/data/categories.json";
import fallbackProducts from "@/data/products.json";
import type { Category, Product } from "./types";

const BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function request<T>(path: string): Promise<T> {
  const failures: string[] = [];

  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(8000) });
      if (res.ok) return (await res.json()) as T;
      failures.push(`${base} → ${res.status} ${res.statusText}`);
    } catch (error) {
      failures.push(`${base} → ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  throw new Error(`Bazar Dor API request failed: ${path}\n${failures.join("\n")}`);
}

async function withFallback<T>(path: string, fallback: T): Promise<T> {
  try {
    return await request<T>(path);
  } catch (error) {
    console.warn(`${(error as Error).message}\nUsing bundled snapshot data instead.`);
    return fallback;
  }
}

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  return withFallback("/products", fallbackProducts as Product[]);
}

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  return withFallback("/categories", fallbackCategories as Category[]);
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === slug);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getCategory(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}
