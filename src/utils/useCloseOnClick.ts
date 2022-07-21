import { RefObject, useEffect } from "react";

function useCloseOnClick(ref: RefObject<HTMLElement>, menuOpen: boolean | null, onClose: () => void) {
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
