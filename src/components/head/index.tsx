import classNames from "classNames";
import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { MenuHeadProps } from "../../models/menu-head.model";
import { usePosition } from "../../utils/usePosition";
import { MenuContext } from "../context";
import { Menu } from "../menu";
import styles from "./menu-head.module.scss";

const MenuHead: FunctionComponent<MenuHeadProps> = ({
  dimension = 30,
  children,
  shape = "circle",
  items = [],
  iconSize = "1rem",
  icons,
  startPosition = "top left",
  theme = {
    primary: "#318CE7",
    secondary: "#FFFFFF",
  },
}) => {
  const [pressedState, setPressedState] = useState(false);
  const [openMenu, setMenuOpen] = useState(false);
  const [menuHeadPosition, setMenuHeadPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [closeMenuImmediate, setCloseMenuImmediate] = useState(false);

  const { onInit } = usePosition<HTMLDivElement>({
    startPosition,
    onMouseDown: () => {
      setPressedState(true);
      setCloseMenuImmediate(false);
    },
    onMouseUp: useCallback((rect?: DOMRect) => {
      setPressedState(false);
      setMenuHeadPosition({
        x: rect?.left || 0,
        y: (rect?.top || 0) + dimension,
      });
      setMenuOpen((prev) => !prev);
    }, []),
    onDragStart: () => {
      setCloseMenuImmediate(true);
      setMenuOpen(false);
    },
    onDragEnd: (rect?: DOMRect) => {
      setPressedState(false);
    },
  });

  const style = useMemo(
    () =>
      ({
        "--dimension": `${dimension}px`,
        "--rc-float-menu-theme-primary": theme.primary,
      } as CSSProperties),
    []
  );

  const menuHeadClass = useMemo(
    () =>
      classNames(
        styles.menu_head,
        pressedState ? styles.pressed : styles.released,
        {
          [styles[shape]]: true,
        }
      ),
    [pressedState]
  );

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false);
    setCloseMenuImmediate(false);
  }, []);

  return (
    <MenuContext.Provider
      value={{ dimension, shape, items, iconSize, icons, theme }}
    >
      <div className={menuHeadClass} ref={onInit} style={style}>
        <span className={styles.icon_container}>{children}</span>
      </div>
      <div className={styles.menu_container}>
        <Menu
          menuHeadPosition={menuHeadPosition}
          items={items}
          open={openMenu}
          onClose={handleMenuClose}
          disableAnimation={closeMenuImmediate}
        />
      </div>
    </MenuContext.Provider>
  );
};

export { MenuHead };
