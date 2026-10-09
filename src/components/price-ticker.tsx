import { getProducts } from "@/lib/api";
import { CHANGE_TEXT_CLASS } from "@/lib/change";
import { formatBnNumber, formatChange, unitLabel } from "@/lib/format";
import type { Product } from "@/lib/types";

function TickerItem({ product }: { product: Product }) {
  return (
    <li className="flex shrink-0 items-center gap-1.5 border-r border-base-200 py-2 pr-[17px] pl-4">
      <span aria-hidden>{product.image}</span>
      <span className="font-medium">{product.nameBn}</span>
      <span>
        {formatBnNumber(product.today)} টাকা/{unitLabel(product.unit)}
      </span>
      <span className={`font-semibold ${CHANGE_TEXT_CLASS[product.change.dir]}`}>
        {formatChange(product.change.dir, product.change.pct)}
      </span>
    </li>
  );
}

export default async function PriceTicker() {
  const products = await getProducts();
  if (products.length === 0) return null;

  return (
    <div className="w-full min-w-0 overflow-hidden border-b border-base-300 bg-base-100">
      <div className="flex w-max animate-marquee text-sm leading-5 whitespace-nowrap hover:[animation-play-state:paused]">
        <ul className="flex">
          {products.map((product) => (
            <TickerItem key={product.id} product={product} />
          ))}
        </ul>
        <ul className="flex" aria-hidden>
          {products.map((product) => (
            <TickerItem key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </div>
  );
}
