import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EmptyState from "@/components/empty-state";
import SortableProducts from "@/components/sortable-products";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/api";
import { toBnDigits } from "@/lib/format";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  return { title: category ? `${category.nameBn} — আজকের দাম` : "ক্যাটাগরি পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) notFound();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-6">
      <header className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <span aria-hidden className="text-4xl leading-10">
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl leading-8 font-bold">{category.nameBn}</h1>
          <p className="text-sm leading-5">
            {toBnDigits(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </header>

      {products.length > 0 ? (
        <SortableProducts products={products} />
      ) : (
        <EmptyState
          icon={category.icon}
          title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
          message="এই মুহূর্তে এই ক্যাটাগরির কোনো পণ্যের দাম পাওয়া যাচ্ছে না। অন্য ক্যাটাগরি দেখে আসুন।"
        />
      )}
    </div>
  );
}
