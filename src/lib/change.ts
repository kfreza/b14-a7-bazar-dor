import type { ChangeDir } from "./types";

export const CHANGE_TEXT_CLASS: Record<ChangeDir, string> = {
  up: "text-error",
  down: "text-success",
  flat: "text-base-content/50",
};
