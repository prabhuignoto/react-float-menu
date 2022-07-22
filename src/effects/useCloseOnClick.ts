import { RefObject, useEffect } from "react";

function useCloseOnClick<T extends HTMLElement>(
  ref: RefObject<T>,
  menuOpen: boolean | undefined | null,
  onClose: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && menuOpen) {
        onClose();
      }
    };

    document.addEventListener("pointerdown", handleClick);

    return () => {
      document.removeEventListener("pointerdown", handleClick);
    };
  }, [ref, onClose, menuOpen]);
}

export { useCloseOnClick };
