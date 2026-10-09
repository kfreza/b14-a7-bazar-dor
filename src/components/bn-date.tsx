"use client";

import { useSyncExternalStore } from "react";
import { formatBnDate } from "@/lib/format";

const subscribe = () => () => {};

export default function BnDate({ className }: { className?: string }) {
  const date = useSyncExternalStore(subscribe, () => formatBnDate(), () => null);

  return (
    <span className={className} suppressHydrationWarning>
      {date ?? " "}
    </span>
  );
}
