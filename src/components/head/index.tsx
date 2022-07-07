import classNames from "classnames";
import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MenuHeadProps } from "../../models/menu-head.model";
import { usePosition } from "../../utils/usePosition";
import { MenuContext } from "../context";
import { MenuContainer } from "../menu-container/menu-container";
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
  disableHeader = false,
  width = 250,
  onSelect,
  startOffset = 10,
}) => {
  const [pressedState, setPressedState] = useState(false);
  const [openMenu, setMenuOpen] = useState<boolean | null>(null);
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

  const isFirstRender = useRef(true);

  const { setup, ref } = usePosition<HTMLDivElement>({
    dimension,
    onDragEnd: ({ left, top }) => {
      setHeadPosition({
        x: left || 0,
        y: (top || 0) + dimension + 10,
      });
      setPressedState(false);
    },
    onDragStart: ({ left, top }) => {
      setHeadPosition({
        x: left || 0,
        y: (top || 0) + dimension + 10,
      });
      setCloseMenuImmediate(true);
      setMenuOpen(false);
    },
    onInit: ({ left, top }) => {
      setHeadPosition({
        x: left || 0,
        y: (top || 0) + dimension + 10,
      });
    },
    onMouseDown: () => {
      setPressedState(true);
      setCloseMenuImmediate(false);
    },
    onMouseUp: useCallback(() => {
      setPressedState(false);
      setMenuOpen((prev) => !prev);
    }, []),
    startOffset,
    startPosition,
  });

  const style = useMemo(
    () =>
      ({
        "--dimension": `${dimension}px`,
        "--rc-float-menu-theme-primary": theme.primary,
        "--rc-float-menu-width": `${width}px`,
      } as CSSProperties),
    []
  );

  const pressedClass = useMemo(() => {
    if (isFirstRender.current) {
      return "";
    }
    return pressedState ? styles.pressed : styles.released;
  }, [pressedState]);

  const menuHeadClass = useMemo(() => {
    return classNames(styles.menu_head, pressedClass, {
      [styles[shape]]: true,
    });
  }, [pressedClass]);

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
    (menuHeight: number, menuWidth: number) =>
      setMenuDimension({ height: menuHeight, width: menuWidth }),
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

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  const handleSelection = useCallback((path: string) => {
    onSelect?.(path);
    handleMenuClose();
  }, []);

  return (
    <MenuContext.Provider
      value={{
        dimension,
        disableHeader,
        iconSize,
        icons,
        items,
        shape,
        theme,
        width,
      }}
    >
      <div className={menuHeadClass} ref={setup} role="button" style={style}>
        <span className={styles.icon_container}>{children}</span>
      </div>
      <MenuContainer
        closeImmediate={closeMenuImmediate}
        disableHeader={disableHeader}
        headPosition={headPosition}
        menuPosition={menuPosition}
        open={openMenu}
        shouldFlip={shouldFlip}
        onClose={handleMenuClose}
        onMenuRender={onMenuRender}
        onSelect={handleSelection}
      />
    </MenuContext.Provider>
  );
};

export { MenuHead };
