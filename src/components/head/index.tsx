import classNames from "classnames";
import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
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
  const [menuPosition, setMenuPosition] = useState<{
    left: number;
    top?: number;
    bottom?: number;
  }>({ bottom: 0, left: 0, top: 0 });

  const [menuHiddenTowards, setMenuHiddenTowards] = useState<
    "left" | "right" | null
  >();

  const headHalfWidth = useMemo(() => Math.round(dimension / 2), [dimension]);

  const { onInit, ref } = usePosition<HTMLDivElement>({
    dimension,
    onDragEnd: ({ left, top }) => {
      setHeadPosition({
        x: left || 0,
        y: (top || 0) + dimension + 10,
      });
      setPressedState(false);
    },
    onDragStart: () => {
      setCloseMenuImmediate(true);
      setMenuOpen(false);
    },
    onMouseDown: () => {
      setPressedState(true);
      setCloseMenuImmediate(false);
    },
    onMouseUp: useCallback((rect?: DOMRect) => {
      setPressedState(false);
      setMenuOpen((prev) => !prev);
    }, []),
    startPosition,
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

  const onMenuRender = useCallback(
    (height: number, width: number) => setMenuDimension({ height, width }),
    []
  );

  useEffect(() => {
    setMenuPosition({
      left: Math.round(
        headPosition.x - (Math.round(menuDimension.width / 2) - headHalfWidth)
      ),
      [shouldFlip ? "bottom" : "top"]: !shouldFlip
        ? headPosition.y + 10
        : Math.abs(window.innerHeight - headPosition.y) + dimension + 20,
    });
  }, [
    shouldFlip,
    headPosition.x,
    headPosition.y,
    menuDimension.width,
    headHalfWidth,
  ]);

  useEffect(() => {
    if (menuPosition.left < 0) {
      setMenuHiddenTowards("left");
    } else if (menuPosition.left + menuDimension.width > window.innerWidth) {
      setMenuHiddenTowards("right");
    } else {
      setMenuHiddenTowards(null);
    }
  }, [menuPosition.left, menuDimension.width]);

  useEffect(() => {
    if (!openMenu) {
      return;
    }
    if (menuHiddenTowards === "left") {
      setMenuPosition({
        left: 10,
      });
      ref.current!.style.cssText += `left: ${
        Math.round(menuDimension.width / 2) - headHalfWidth + 10
      }px;`;
    } else if (menuHiddenTowards === "right") {
      setMenuPosition({
        left: window.innerWidth - menuDimension.width - 10,
      });
      ref.current!.style.cssText += `left: ${
        Math.round(window.innerWidth - menuDimension.width / 2) -
        headHalfWidth -
        10
      }px;`;
    }
  }, [menuHiddenTowards, openMenu, menuDimension.width, headHalfWidth]);

  const menuContainerStyle = useMemo(() => {
    return {
      left: `${menuPosition.left}px`,
      [shouldFlip ? "bottom" : "top"]: `${
        shouldFlip ? menuPosition.bottom : menuPosition.top
      }px`,
    };
  }, [JSON.stringify(menuPosition), shouldFlip]);

  const arrowClass = useMemo(
    () =>
      classNames(
        styles.menu_arrow,
        openMenu ? styles.menu_open : "",
        shouldFlip ? styles.flip : ""
      ),
    [openMenu, shouldFlip]
  );

  return (
    <MenuContext.Provider
      value={{ dimension, iconSize, icons, items, shape, theme }}
    >
      <div className={menuHeadClass} ref={onInit} style={style}>
        <span className={styles.icon_container}>{children}</span>
      </div>
      <div className={styles.menu_container} style={menuContainerStyle}>
        <span className={arrowClass}></span>
        <Menu
          disableAnimation={closeMenuImmediate}
          flip={shouldFlip}
          items={items}
          menuHeadPosition={headPosition}
          open={openMenu}
          onClose={handleMenuClose}
          onRender={onMenuRender}
        />
      </div>
    </MenuContext.Provider>
  );
};

export { MenuHead };
