import { CHANGE_TEXT_CLASS } from "@/lib/change";
import { formatChange } from "@/lib/format";
import type { PriceChange } from "@/lib/types";

export default function ChangeBadge({ change }: { change: PriceChange }) {
  return (
    <span
      className={`inline-flex items-center rounded-xl bg-base-200 px-2 py-1 text-xs leading-4 font-semibold whitespace-nowrap ${CHANGE_TEXT_CLASS[change.dir]}`}
    >
      {formatChange(change.dir, change.pct)}
    </span>
  );
}
