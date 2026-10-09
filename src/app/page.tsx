import { Suspense } from "react";
import Hero from "@/components/hero";
import ProductGrid, { ProductGridSkeleton } from "@/components/product-grid";
import { getProducts } from "@/lib/api";
import { toBnDigits } from "@/lib/format";
import { topFallers, topRisers } from "@/lib/products";

function SectionTitle({ icon, iconClass, title }: { icon?: string; iconClass?: string; title: string }) {
  return (
    <h2 className="flex items-center gap-2 text-xl leading-7 font-bold">
      {icon && (
        <span aria-hidden className={`text-base leading-6 ${iconClass}`}>
          {icon}
        </span>
      )}
      {title}
    </h2>
  );
}

async function RisersGrid() {
  return <ProductGrid products={topRisers(await getProducts())} />;
}

async function FallersGrid() {
  return <ProductGrid products={topFallers(await getProducts())} />;
}

async function AllProducts() {
  const products = await getProducts();
  return (
    <>
      <p className="text-sm leading-5">মোট {toBnDigits(products.length)}টি পণ্য দেখানো হচ্ছে</p>
      <ProductGrid products={products} />
    </>
  );
}

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-6">
      <Hero />

      <section className="flex flex-col gap-3">
        <SectionTitle icon="▲" iconClass="text-error" title="আজ দাম বেড়েছে" />
        <Suspense fallback={<ProductGridSkeleton />}>
          <RisersGrid />
        </Suspense>
      </section>

      <section className="flex flex-col gap-3">
        <SectionTitle icon="▼" iconClass="text-success" title="আজ দাম কমেছে" />
        <Suspense fallback={<ProductGridSkeleton />}>
          <FallersGrid />
        </Suspense>
      </section>

      <section id="সব-পণ্য" className="flex scroll-mt-6 flex-col gap-3">
        <SectionTitle title="সব পণ্য" />
        <div className="flex flex-col gap-4">
          <Suspense
            fallback={
              <>
                <div className="skeleton h-5 w-40" />
                <ProductGridSkeleton count={9} />
              </>
            }
          >
            <AllProducts />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
