import classNames from "classnames";
import { nanoid } from "nanoid";
import {
  CSSProperties,
  FunctionComponent,
  KeyboardEvent,
  PointerEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CloseIcon } from "../../icons";
import { MenuContext } from "../context";
import { MenuItem } from "../menu-list-item/menu-list-item";
import { MenuItemProps, MenuProps } from "./menu-model";
import styles from "./menu.module.scss";

const Menu: FunctionComponent<MenuProps> = (props) => {
  const {
    items = [],
    menuHeadPosition,
    open,
    onClose,
    closeImmediate,
    flip,
    onRender,
    disableHeader = false,
    disableAnimation = false,
    isSubMenu = false,
    onSelect,
  } = props;

  const [_items, setItems] = useState<MenuItemProps[]>(() =>
    items.map((item) => ({ ...item, id: nanoid(), selected: false }))
  );

  const wrapperRef = useRef<HTMLUListElement>();

  const [height, setHeight] = useState(0);

  const { iconSize, theme } = useContext(MenuContext);

  const isFirstRender = useRef(true);

  const activeIndex = useRef<number>(0);

  const style = useMemo(
    () =>
      ({
        "--menu-height": `${height}px`,
        "--rc-float-menu-theme-primary": theme?.primary,
      } as CSSProperties),
    [height, JSON.stringify(menuHeadPosition)]
  );

  const canOpen = useMemo(() => open && !closeImmediate && !disableAnimation, [
    open,
    closeImmediate,
  ]);

  const canClose = useMemo(() => !closeImmediate && open !== null, [open]);

  const openClass = useMemo(() => {
    if (canOpen) {
      return styles.menu_open;
    } else if (canClose) {
      return styles.menu_close;
    } else if (!isSubMenu) {
      return styles.hide;
    } else {
      return "";
    }
  }, [canOpen, canClose]);

  const wrapperClass = useMemo(
    () =>
      classNames(
        styles.wrapper,
        flip ? styles.flip : "",
        disableAnimation ? styles.no_animation : "",
        closeImmediate ? styles.no_animation : "",
        isSubMenu ? styles.is_sub_menu : "",
        openClass
      ),
    [canOpen, flip, canClose]
  );
  const listClass = useMemo(
    () => classNames(styles.list, !open ? styles.close : ""),
    [open]
  );

  const onWrapperInit = useCallback(
    (node: HTMLUListElement) => {
      if (node) {
        wrapperRef.current = node;

        setTimeout(() => {
          const wrapperHeight = node.clientHeight + 40;
          setHeight(wrapperHeight);
          onRender?.(wrapperHeight, node.clientWidth);
        }, 500);
      }
    },
    [_items.length, activeIndex]
  );

  const handleClose = useCallback((ev?: PointerEvent) => {
    ev?.stopPropagation();
    activeIndex.current = -1;
    onClose?.();
  }, []);

  const handleCloseViaKeyboard = useCallback((ev: KeyboardEvent) => {
    if (ev.key === "Enter") {
      onClose?.();
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    wrapperRef.current?.addEventListener("keyup", (ev) => {
      if (
        ev.key !== "ArrowDown" &&
        ev.key !== "ArrowUp" &&
        ev.key !== "Escape"
      ) {
        return;
      }

      ev.stopPropagation();

      if (ev.key === "Escape") {
        handleClose();
      } else if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
        let nextIndex = activeIndex.current + (ev.key === "ArrowDown" ? 1 : -1);

        if (nextIndex < 0) {
          nextIndex = _items.length - 1;
        } else if (nextIndex > _items.length - 1) {
          nextIndex = 0;
        }

        const elementToFocus = wrapperRef.current?.querySelectorAll(
          `li:nth-of-type(${nextIndex + 1})`
        )[0] as HTMLElement;

        elementToFocus?.focus();

        activeIndex.current = nextIndex;
      }
    });
  }, [_items.length]);

  const handleSelection = useCallback(
    (name: string, index: number, id?: string) => {
      onSelect?.(name, index);
      setItems((prev) =>
        prev.map((item) => ({
          ...item,
          selected: item.id === id,
        }))
      );
    },
    []
  );

  const handleMouseEnter = (id?: string) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.id === id,
      }))
    );
  };

  const onToggleSubMenu = (id?: string) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.id === id ? !item.selected : false,
      }))
    );
  };

  const onCloseSubMenu = (id?: string) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.id === id ? false : item.selected,
      }))
    );
  };

  return (
    <div className={wrapperClass} style={style}>
      {!disableHeader && (
        <div className={styles.toolbar}>
          <span
            className={styles.close_btn}
            role="button"
            tabIndex={0}
            onKeyUp={handleCloseViaKeyboard}
            onPointerDown={handleClose}
          >
            <CloseIcon />
          </span>
        </div>
      )}
      <ul className={listClass} ref={onWrapperInit}>
        {_items.map((item, index) => (
          <MenuItem
            {...item}
            icon={item.icon}
            iconSize={iconSize}
            index={index}
            key={item.id}
            open={open}
            onCloseSubMenu={onCloseSubMenu}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={onCloseSubMenu}
            onSelect={handleSelection}
            onToggleSubMenu={onToggleSubMenu}
          />
        ))}
      </ul>
    </div>
  );
};

export { Menu };
