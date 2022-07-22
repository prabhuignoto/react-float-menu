import { MutableRefObject, useEffect } from "react";

function useCloseOnEscape<T extends HTMLElement>(
  ref: MutableRefObject<T | undefined>,
  onClose: () => void
) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    ref.current?.addEventListener("keyup", handleEscape);

    return () => {
      ref.current?.removeEventListener("keyup", handleEscape);
    };
  }, [ref]);
}

export { useCloseOnEscape };
