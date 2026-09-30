import { useSyncExternalStore } from "react";

// true em celulares/tablets (toque como entrada principal).
const query = "(hover: none), (pointer: coarse)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function useIsTouch() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
