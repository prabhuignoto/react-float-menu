import { useEffect } from "react";

type Dir = "left" | "right" | null;

function useMenuHidden(
  menuLeft: number,
  menuWidth: number,
  cb: (dir: Dir) => void
) {
  useEffect(() => {
    let dir: Dir;
    if (menuLeft < 0) {
      dir = "left";
    } else if (menuLeft + menuWidth > window.innerWidth) {
      dir = "right";
    } else {
      dir = null;
    }
    cb(dir);
  }, [menuLeft, menuWidth]);
}

export { useMenuHidden };
