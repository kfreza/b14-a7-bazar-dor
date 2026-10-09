import Image from "next/image";
import BnDate from "./bn-date";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-base-300 bg-base-100">
      <div className="flex flex-col items-center gap-6 px-4 py-8 md:flex-row md:items-start md:justify-between md:py-10">
        <div className="flex w-full max-w-xl flex-col items-start gap-2">
          <BnDate className="rounded-[14px] bg-primary/10 px-3 py-1 text-sm leading-5 font-medium text-primary" />
          <h1 className="text-[28px] leading-9 font-bold sm:text-4xl sm:leading-11.25">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-1 text-base leading-6">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
            সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm mt-3 sm:btn-md">
            সব পণ্য দেখুন
          </a>
        </div>
        <Image
          src="/images/bazar-hero.svg"
          alt="সবজি ও ফলের ঝুড়ি"
          width={315}
          height={263}
          preload
          className="h-auto w-48 shrink-0 sm:w-60 md:w-78.75"
        />
      </div>
    </section>
  );
}
