import { ProductGridSkeleton } from "@/components/product-grid";

export default function CategoryLoading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-6" aria-busy="true">
      <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="skeleton size-10 rounded-xl" />
        <div className="flex flex-col gap-2">
          <div className="skeleton h-6 w-24" />
          <div className="skeleton h-4 w-48" />
        </div>
      </div>
      <div className="flex justify-end rounded-2xl border border-base-300 bg-base-100 p-4">
        <div className="skeleton h-8 w-36" />
      </div>
      <div className="skeleton h-5 w-40" />
      <ProductGridSkeleton count={6} />
      <span className="sr-only">লোড হচ্ছে…</span>
    </div>
  );
}
