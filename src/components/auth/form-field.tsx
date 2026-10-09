import type { InputHTMLAttributes } from "react";

export default function FormField({
  label,
  error,
  ...input
}: { label: string; error?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm leading-5.25 font-medium">{label}</span>
      <input
        {...input}
        aria-invalid={error ? true : undefined}
        className={`input w-full bg-base-100 text-sm ${error ? "input-error" : "border-base-300"}`}
      />
      {error && <span className="text-xs leading-4 text-error">{error}</span>}
    </label>
  );
}
