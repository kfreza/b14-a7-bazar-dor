import type { Product } from "./types";

export type SortOrder = "default" | "asc" | "desc";

export function topRisers(products: Product[], limit = 6): Product[] {
  return products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}

export function topFallers(products: Product[], limit = 6): Product[] {
  return products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, limit);
}

export function sortByPrice(products: Product[], order: SortOrder): Product[] {
  if (order === "default") return products;
  const direction = order === "asc" ? 1 : -1;
  return [...products].sort((a, b) => (a.today - b.today) * direction);
}
