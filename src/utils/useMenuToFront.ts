import { useEffect, useState } from "react";

type params = {
  startOffset: number;
  menuHiddenTowards?: "left" | "right" | null;
  menuWidth: number;
  dimension: number;
  menuOpen?: boolean | null;
};

type func = (p: params) => {
  position: {
    headLeft: number;
    menuLeft: number;
  };
};

const useMenuToFront: func = function ({
  startOffset,
  menuHiddenTowards,
  menuWidth,
  dimension,
  menuOpen,
}) {
  const [position, setPosition] = useState<{
    menuLeft: number;
    headLeft: number;
  }>({ headLeft: 0, menuLeft: 0 });

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const headHalfWidth = Math.round(dimension / 2);

    if (menuHiddenTowards === "left") {
      setPosition({
        headLeft: Math.round(menuWidth / 2) - headHalfWidth + startOffset,
        menuLeft: startOffset,
      });
    } else if (menuHiddenTowards === "right") {
      setPosition({
        headLeft: Math.round(innerWidth - menuWidth / 2) - headHalfWidth - 10,
        menuLeft: innerWidth - menuWidth - startOffset,
      });
    }
  }, [menuHiddenTowards, menuOpen, menuWidth]);

  return {
    position,
  };
};

export { useMenuToFront };
