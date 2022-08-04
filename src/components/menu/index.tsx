import classNames from "classnames";
import { nanoid } from "nanoid";
import {
  CSSProperties,
  FunctionComponent,
  KeyboardEvent,
  memo,
  PointerEvent,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useCloseOnClick } from "../../effects/useCloseOnClick";
import { useCloseOnEscape } from "../../effects/useCloseOnEscape";
import { useKeyboardNav } from "../../effects/useKeyboardNav";
import { CloseIcon } from "../../icons";
import { MenuContext } from "../context";
import { MenuItem } from "../menu-list-item/menu-list-item";
import { MenuItemProps, MenuProps } from "./menu-model";
import styles from "./menu.module.scss";

const Menu: FunctionComponent<MenuProps> = memo((props) => {
  const {
    items = [],
    menuHeadPosition,
    open,
    onClose,
    closeImmediate,
    onRender,
    disableHeader = false,
    disableAnimation = false,
    isSubMenu = false,
    onSelect,
  } = props;

  const [_items, setItems] = useState<MenuItemProps[]>(() =>
    items.map((item) => ({ ...item, id: nanoid(), selected: false }))
  );

  const listRef = useRef<HTMLUListElement>();
  const outerRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);

  const { theme, iconSize, RTL, closeOnClickOutside } = useContext(MenuContext);

  useCloseOnEscape<HTMLUListElement>(listRef, () => {
    handleClose();
  });

  if (closeOnClickOutside) {
    useCloseOnClick<HTMLDivElement>(outerRef, open, () => {
      handleClose();
    });
  }

  useKeyboardNav(listRef, _items, (index) => {
    const elementToFocus = listRef.current?.querySelectorAll(
      `li:nth-of-type(${index + 1})`
    )[0] as HTMLElement;

    elementToFocus?.focus();
  });

  const activeIndex = useRef<number>(0);

  const style = useMemo(
    () =>
      ({
        "--menu-height": `${height}px`,
        "--rc-fltmenu-icon-size": iconSize,
        "--rc-fltmenu-menu-bg-color": theme?.menuBackgroundColor,
        "--rc-fltmenu-menu-item-hover": theme?.menuItemHoverColor,
        "--rc-fltmenu-menu-item-hover-text": theme?.menuItemHoverTextColor,
        "--rc-fltmenu-menu-item-text": theme?.menuItemTextColor,
        "--rc-fltmenu-primary": theme?.primary,
        "--rc-fltmenu-secondary": theme?.secondary,
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
        RTL ? styles.flip : "",
        disableAnimation ? styles.no_animation : "",
        closeImmediate ? styles.no_animation : "",
        isSubMenu ? styles.is_sub_menu : "",
        openClass
      ),
    [canOpen, RTL, canClose]
  );
  const listClass = useMemo(
    () => classNames(styles.list, !open ? styles.close : ""),
    [open]
  );

  const onWrapperInit = useCallback(
    (node: HTMLUListElement) => {
      if (node) {
        listRef.current = node;

        setTimeout(() => {
          const wrapperHeight = node.clientHeight + 40;
          setHeight(wrapperHeight);
          onRender?.(wrapperHeight, node.clientWidth);
        }, 500);
      }
    },
    [_items.length, activeIndex]
  );

  const handleClose = useCallback(
    (ev?: PointerEvent) => {
      ev?.stopPropagation();
      // activeIndex.current = -1;
      onClose?.();
    },
    [onClose]
  );

  const handleCloseViaKeyboard = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key === "Enter") {
        onClose?.();
      }
    },
    [onClose]
  );

  const handleSelection = (name: string, index?: number, id?: string) => {
    onSelect?.(name, index);
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.id === id,
      }))
    );
  };

  const handleMouseEnter = (id?: string) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.id === id,
      }))
    );
  };

  const onToggleSubMenu = useCallback((id?: string) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.id === id ? !item.selected : false,
      }))
    );
  }, []);

  const onCloseSubMenu = useCallback((id?: string) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.id === id ? false : item.selected,
      }))
    );
  }, []);

  return (
    <div className={wrapperClass} ref={outerRef} style={style}>
      {!disableHeader && (
        <div className={classNames(styles.toolbar, RTL ? styles.flip : "")}>
          <span
            aria-label="Close"
            className={classNames(styles.close_btn, RTL ? styles.flip : "")}
            data-cy="rc-fltmenu-close"
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
            index={index}
            items={item.items}
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
});

Menu.displayName = "Menu";

export { Menu };
