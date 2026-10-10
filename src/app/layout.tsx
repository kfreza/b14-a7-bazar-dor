import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PriceTicker from "@/components/price-ticker";
import ToastProvider from "@/components/toast-provider";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ প্রয়োজনীয় পণ্যের আজকের বাজার দর — বিভিন্ন বাজারভিত্তিক দাম এক নজরে।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="bazardor"
      data-scroll-behavior="smooth"
      className={hindSiliguri.variable}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col overflow-x-hidden bg-base-200 font-sans font-light text-base-content antialiased"
      >
        <Navbar />
        <PriceTicker />
        <main className="flex-1 pb-12">{children}</main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
