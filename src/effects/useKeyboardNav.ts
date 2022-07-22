import { MutableRefObject, useEffect, useRef } from "react";

function useKeyboardNav<T extends HTMLElement, U>(
  ref: MutableRefObject<T | undefined>,
  items: U[],
  onNav: (newIndex: number) => void
) {
  const activeIndex = useRef<number>(0);

  useEffect(() => {
    const handleNavigation = (ev: KeyboardEvent) => {
      if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
        let nextIndex = activeIndex.current + (ev.key === "ArrowDown" ? 1 : -1);

        if (nextIndex < 0) {
          nextIndex = items.length - 1;
        } else if (nextIndex > items.length - 1) {
          nextIndex = 0;
        }

        activeIndex.current = nextIndex;

        onNav(nextIndex);
      }
    };

    ref.current?.addEventListener("keyup", handleNavigation);

    return () => {
      ref.current?.removeEventListener("keyup", handleNavigation);
    };
  }, [ref, items]);
}

export { useKeyboardNav };
