import { useScroll } from "motion/react";
import type { RefObject } from "react";

export function useSectionScroll(ref: RefObject<HTMLElement | null>) {
  return useScroll({ target: ref, offset: ["start end", "end start"] });
}
