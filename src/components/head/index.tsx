import classNames from "classnames";
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
  const [headPosition, setHeadPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [closeMenuImmediate, setCloseMenuImmediate] = useState(false);
  const [menuDimension, setMenuDimension] = useState<{
    height: number;
    width: number;
  }>({ height: 0, width: 0 });

  const { onInit } = usePosition<HTMLDivElement>({
    startPosition,
    onMouseDown: () => {
      setPressedState(true);
      setCloseMenuImmediate(false);
    },
    onMouseUp: useCallback((rect?: DOMRect) => {
      setPressedState(false);
      setHeadPosition({
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

  const shouldFlip = useMemo(() => {
    return (
      headPosition.y + dimension + menuDimension.height > window.innerHeight
    );
  }, [headPosition.x, headPosition.y, JSON.stringify(menuDimension), openMenu]);

  const onMenuRender = useCallback((height: number, width: number) => {
    setMenuDimension({ height, width });
  }, []);

  const menuContainerStyle = useMemo(
    () => ({
      left: `${Math.round(
        headPosition.x - (Math.round(menuDimension.width / 2) - 15)
      )}px`,
      [shouldFlip ? "bottom" : "top"]: `${
        !shouldFlip
          ? headPosition.y + 10
          : Math.abs(window.innerHeight - headPosition.y) + dimension + 10
      }px`,
    }),
    [shouldFlip, headPosition.x, headPosition.y, menuDimension.width]
  );

  return (
    <MenuContext.Provider
      value={{ dimension, shape, items, iconSize, icons, theme }}
    >
      <div className={menuHeadClass} ref={onInit} style={style}>
        <span className={styles.icon_container}>{children}</span>
      </div>
      <div className={styles.menu_container} style={menuContainerStyle}>
        <Menu
          menuHeadPosition={headPosition}
          items={items}
          open={openMenu}
          onClose={handleMenuClose}
          disableAnimation={closeMenuImmediate}
          onRender={onMenuRender}
          flip={shouldFlip}
        />
      </div>
    </MenuContext.Provider>
  );
};

export { MenuHead };
