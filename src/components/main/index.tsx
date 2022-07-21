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
import { defaultTheme } from "../../utils/theme-default";
import { useCloseOnClick } from "../../utils/useCloseOnClick";
import { useMenuHidden } from "../../utils/useMenuHidden";
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
  theme = defaultTheme,
  disableHeader = false,
  width = 250,
  onSelect,
  startOffset = 10,
  closeOnClickOutside = true,
  autoFlipMenu = true,
  bringMenuToFocus = true,
  iconSize = "1rem",
  pin,
  RTL = false,
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

  const { setup, ref } = usePosition<HTMLDivElement>({
    dimension,
    onClosed: () => {
      setMenuOpen(false);
      setPressedState(false);
    },
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
    onPointerUp: () => {
      setPressedState(false);
      setMenuOpen((prev) => !prev);
    },
    pin,
    startOffset,
    startPosition,
  });

  useCloseOnClick(ref, openMenu, () => {
    if (closeOnClickOutside) {
      setMenuOpen(false);
    }
  });

  useMenuHidden(menuPosition.left, menuDimension.width, (dir) => {
    setMenuHiddenTowards(dir);
  });

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

  const handleMenuClose = () => {
    if (openMenu) {
      setMenuOpen(false);
      setCloseMenuImmediate(false);

      ref?.current?.focus();
    }
  };

  const shouldFlipVertical = useMemo(() => {
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
      [shouldFlipVertical ? "bottom" : "top"]: !shouldFlipVertical
        ? headPosition.y + 10
        : Math.abs(window.innerHeight - headPosition.y) + dimension + 20,
    });
  }, [
    shouldFlipVertical,
    headPosition.x,
    headPosition.y,
    menuDimension.width,
    headHalfWidth,
  ]);

  const shouldAdjustMenuPosition = useMemo(
    () => !!(!isFirstRender.current && bringMenuToFocus && ref?.current),
    [openMenu, bringMenuToFocus]
  );

  useEffect(() => {
    if (!shouldAdjustMenuPosition) {
      return;
    }

    const alignedTo = startPosition.split(" ")[1];
    const { width: menuWidth } = menuDimension;
    const { innerWidth } = window;
    const headRef = ref.current as HTMLDivElement;

    if (menuHiddenTowards === "left") {
      setMenuPosition({
        left: startOffset,
      });
      headRef.style.cssText += `left: ${
        Math.round(menuWidth / 2) - headHalfWidth + startOffset
      }px;`;
    } else if (menuHiddenTowards === "right") {
      setMenuPosition({
        left: innerWidth - menuWidth - startOffset,
      });
      headRef.style.cssText += `left: ${
        Math.round(innerWidth - menuWidth / 2) - headHalfWidth - 10
      }px;`;
    } else if (alignedTo === "left" && headPosition.x <= startOffset && pin) {
      headRef.style.cssText += `left: ${startOffset}px;`;
      setMenuPosition((prev) => ({
        ...prev,
        left: -menuWidth,
      }));
    } else if (
      alignedTo === "right" &&
      headPosition.x >= innerWidth - dimension - startOffset &&
      pin
    ) {
      headRef.style.cssText += `left: ${
        innerWidth - dimension - startOffset
      }px;`;
      setMenuPosition((prev) => ({
        ...prev,
        left: innerWidth,
      }));
    }
  }, [openMenu, headPosition.x, shouldAdjustMenuPosition]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  const handleSelection = (path: string) => {
    onSelect?.(path);
    handleMenuClose();
  };

  return (
    <MenuContext.Provider
      value={{
        RTL,
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
        shouldFlipVertical={shouldFlipVertical}
        onClose={handleMenuClose}
        onMenuRender={onMenuRender}
        onSelect={handleSelection}
      />
    </MenuContext.Provider>
  );
};

export { MenuHead };
