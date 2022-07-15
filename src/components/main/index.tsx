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
import { defaultTheme } from "../../utils/helpers";
import { usePosition } from "../../utils/usePosition";
import { MenuContext } from "../context";
import { MenuContainer } from "../menu-container/menu-container";
import styles from "./main.module.scss";

const MenuHead: FunctionComponent<MenuHeadProps> = ({
  dimension = 30,
  children,
  shape = "circle",
  items = [],
  startPosition = "top left",
  theme = {
    menuBackgroundColor: "#FFFFFF",
    menuItemHoverColor: "#318CE7",
    menuItemHoverTextColor: "#fff",
    menuItemTextColor: "#000",
    primary: "#318CE7",
    secondary: "#FFFFFF",
  },
  disableHeader = false,
  width = 250,
  onSelect,
  startOffset = 10,
  closeOnClickOutside = true,
  autoFlipMenu = true,
  bringMenuToFocus = true,
  iconSize = "1rem",
  pin,
}) => {
  const [pressedState, setPressedState] = useState(false);
  const [openMenu, setMenuOpen] = useState<boolean | null>(null);
  const [headPosition, setHeadPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [closeMenuImmediate, setCloseMenuImmediate] = useState(false);
  const [isDragged, setIsDragged] = useState(false);

  const finalTheme = useMemo(() => ({ ...defaultTheme, ...theme }), []);

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

  const { setup, ref } = usePosition<HTMLDivElement>(
    !pin
      ? {
          dimension,
          onDragEnd: ({ left, top }) => {
            setHeadPosition({
              x: left || 0,
              y: (top || 0) + dimension + 10,
            });
            setMenuOpen(false);
            setPressedState(false);
            setIsDragged(false);
          },
          onDragStart: ({ left, top }) => {
            setHeadPosition({
              x: left || 0,
              y: (top || 0) + dimension + 10,
            });
            setCloseMenuImmediate(true);
            setMenuOpen(false);
            setIsDragged(true);
          },
          onInit: ({ left, top }) => {
            setHeadPosition({
              x: left || 0,
              y: (top || 0) + dimension + 10,
            });
          },
          onPointerDown: () => {
            setPressedState(true);
            setCloseMenuImmediate(false);
          },
          onPointerUp: useCallback(() => {
            setPressedState(false);
            setMenuOpen((prev) => !prev);
          }, []),
          startOffset,
          startPosition,
        }
      : null
  );

  const style = useMemo(
    () =>
      ({
        "--dimension": `${dimension}px`,
        "--rc-fltmenu-primary": finalTheme.primary,
        "--rc-fltmenu-width": `${width}px`,
      } as CSSProperties),
    [finalTheme.primary]
  );

  const pressedClass = useMemo(() => {
    if (isFirstRender.current) {
      return "";
    }
    return pressedState ? styles.pressed : styles.released;
  }, [pressedState]);

  const menuHeadClass = useMemo(() => {
    return classNames(
      styles.menu_head,
      pressedClass,
      isDragged ? styles.is_dragged : "",
      {
        [styles[shape]]: true,
      }
    );
  }, [pressedClass, isDragged]);

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false);
    setCloseMenuImmediate(false);

    ref?.current?.focus();
  }, []);

  const shouldFlip = useMemo(() => {
    return (
      autoFlipMenu &&
      headPosition.y + dimension + menuDimension.height > window.innerHeight
    );
  }, [
    headPosition.x,
    headPosition.y,
    JSON.stringify(menuDimension),
    openMenu,
    autoFlipMenu,
  ]);

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
    if (!bringMenuToFocus) {
      return;
    }

    const { left } = menuPosition;
    const { width: menuWidth } = menuDimension;
    if (left < 0) {
      setMenuHiddenTowards("left");
    } else if (left + menuWidth > window.innerWidth) {
      setMenuHiddenTowards("right");
    } else {
      setMenuHiddenTowards(null);
    }
  }, [menuPosition.left, menuDimension.width, bringMenuToFocus]);

  useEffect(() => {
    if (!openMenu || !bringMenuToFocus || !ref?.current) {
      return;
    }

    if (menuHiddenTowards === "left") {
      setMenuPosition({
        left: 10,
      });
      ref.current.style!.cssText += `left: ${
        Math.round(menuDimension.width / 2) - headHalfWidth + startOffset
      }px;`;
    } else if (menuHiddenTowards === "right") {
      setMenuPosition({
        left: window.innerWidth - menuDimension.width - startOffset,
      });
      ref.current.style!.cssText += `left: ${
        Math.round(window.innerWidth - menuDimension.width / 2) -
        headHalfWidth -
        10
      }px;`;
    }
  }, [
    menuHiddenTowards,
    openMenu,
    menuDimension.width,
    headHalfWidth,
    bringMenuToFocus,
  ]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    if (!closeOnClickOutside) {
      return;
    }

    const handleClosure = (ev: PointerEvent) => {
      const isChild = ref?.current?.contains(ev.target as Node);

      if (!isChild) {
        handleMenuClose();
      }
    };

    if (ref?.current) {
      document.addEventListener("pointerdown", handleClosure);

      return () => {
        document.removeEventListener("pointerdown", handleClosure);
      };
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
        items,
        shape,
        theme: finalTheme,
        width,
      }}
    >
      <div
        className={classNames(menuHeadClass)}
        data-cy="rc-fltmenu-head"
        ref={setup}
        role="button"
        style={style}
        tabIndex={0}
      >
        <span
          className={classNames(styles.icon_container)}
          data-cy="rc-fltmenu-icon"
        >
          {children}
        </span>
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
