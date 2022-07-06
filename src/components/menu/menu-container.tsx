import classNames from "classnames";
import {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Menu } from ".";
import { MenuContext } from "../context";
import styles from "./menu.module.scss";

export type MenuContainerProps = {
  shouldFlip: boolean;
  menuPosition: {
    left: number;
    top?: number;
    bottom?: number;
  };
  headPosition: {
    x: number;
    y: number;
  };
  open: boolean | null;
  onClose: () => void;
  onMenuRender: (h: number, w: number) => void;
  disableAnimation?: boolean;
};

const MenuContainer: FunctionComponent<MenuContainerProps> = ({
  shouldFlip,
  menuPosition,
  headPosition,
  open,
  onClose,
  onMenuRender,
  disableAnimation,
}) => {
  const { left, top, bottom } = menuPosition;

  const { items, width } = useContext(MenuContext);

  const isFirstRender = useRef(true);

  const menuContainerStyle = useMemo(() => {
    return {
      "--rc-float-menu-width": `${width}px`,
      [shouldFlip ? "bottom" : "top"]: `${shouldFlip ? bottom : top}px`,
      left: `${left}px`,
    };
  }, [JSON.stringify(menuPosition), shouldFlip, width]);

  const arrowClass = useMemo(
    () =>
      classNames(
        styles.menu_arrow,
        open ? styles.menu_open : "",
        shouldFlip ? styles.flip : ""
      ),
    [open, shouldFlip]
  );

  const menuContainerClass = useMemo(
    () =>
      classNames(styles.menu_container, open ? styles.menu_open : styles.close),
    [open]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  return (
    <div className={menuContainerClass} style={menuContainerStyle}>
      <span className={arrowClass}></span>
      <Menu
        disableAnimation={disableAnimation}
        flip={shouldFlip}
        items={items}
        menuHeadPosition={headPosition}
        open={open}
        onClose={onClose}
        onRender={onMenuRender}
      />
    </div>
  );
};

export { MenuContainer };
