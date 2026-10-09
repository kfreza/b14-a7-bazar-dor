import type { Product } from "@/lib/types";
import ProductCard from "./product-card";

export const GRID_CLASS = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className={GRID_CLASS}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-4">
      <div className="flex items-start gap-3">
        <div className="skeleton size-12 shrink-0 rounded-xl" />
        <div className="flex flex-1 flex-col gap-2 pt-1">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-6 w-20" />
        </div>
        <div className="skeleton h-6 w-14 rounded-xl" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul className={GRID_CLASS} aria-busy="true" aria-label="লোড হচ্ছে…">
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
