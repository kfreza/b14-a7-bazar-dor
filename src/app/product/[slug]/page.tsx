import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductDetail, { ProductDetailSkeleton } from "@/components/product-detail";
import { getProductBySlug, getProducts } from "@/lib/api";
import { requireSession } from "@/lib/session";
import type { Product } from "@/lib/types";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.nameBn} — আজকের দাম` : "পণ্য পাওয়া যায়নি" };
}

async function ProtectedProduct({ product }: { product: Product }) {
  await requireSession(`/product/${product.slug}`);
  return <ProductDetail product={product} />;
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProtectedProduct product={product} />
    </Suspense>
  );
}
