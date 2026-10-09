import type { Metadata } from "next";
import EmptyState from "@/components/empty-state";

export const metadata: Metadata = {
  title: "পেজ পাওয়া যায়নি",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10">
      <EmptyState
        icon="🔍"
        code="৪০৪"
        title="দুঃখিত, পেজটি পাওয়া যায়নি"
        message="আপনি যে পণ্য, ক্যাটাগরি বা পেজটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।"
      />
    </div>
  );
}
