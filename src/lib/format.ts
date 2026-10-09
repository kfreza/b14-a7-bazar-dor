import type { ChangeDir, Unit } from "./types";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBnDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

export function formatBnNumber(value: number): string {
  return toBnDigits(value.toLocaleString("en-IN"));
}

export function formatPrice(value: number): string {
  return `${formatBnNumber(value)} টাকা`;
}

const UNIT_LABELS: Record<Unit, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function unitLabel(unit: Unit): string {
  return UNIT_LABELS[unit] ?? unit;
}

export function perUnitLabel(unit: Unit): string {
  return `প্রতি ${unitLabel(unit)}`;
}

export function formatChange(dir: ChangeDir, pct: number): string {
  const value = toBnDigits(Math.abs(pct).toFixed(1));
  if (dir === "up") return `▲ ${value}%`;
  if (dir === "down") return `▼ ${value}%`;
  return `—${value}%`;
}

export function formatBnDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}
