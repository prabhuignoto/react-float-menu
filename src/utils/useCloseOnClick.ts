import { RefObject, useEffect } from "react";

function useCloseOnClick(ref: RefObject<HTMLElement>, onClose: () => void) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("pointerdown", handleClick);

    return () => {
      document.removeEventListener("pointerdown", handleClick);
    };
  }, [ref, onClose]);
}

export { useCloseOnClick };
