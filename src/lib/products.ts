import type { MarketPrice, Product } from "./types";

export interface PriceSummary {
  min: number;
  max: number;
  avg: number;
  cheapest: MarketPrice;
  priciest: MarketPrice;
}

export function marketAverage(market: MarketPrice): number {
  return Math.round((market.min + market.max) / 2);
}

export function priceSummary(product: Product): PriceSummary | null {
  const { markets } = product;
  if (markets.length === 0) return null;

  const cheapest = markets.reduce((a, b) => (b.min < a.min ? b : a));
  const priciest = markets.reduce((a, b) => (b.max > a.max ? b : a));
  const midpointTotal = markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0);

  return {
    min: cheapest.min,
    max: priciest.max,
    avg: Math.round(midpointTotal / markets.length),
    cheapest,
    priciest,
  };
}

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
