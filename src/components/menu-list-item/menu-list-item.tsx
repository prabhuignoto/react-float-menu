import classNames from "classnames";
import {
  KeyboardEvent,
  PointerEvent,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { ChevronRight } from "../../icons";
import { MenuContext } from "../context";
import { Menu } from "../menu";
import { MenuItemViewModel } from "./menu-list-item.model";
import styles from "./menu-list-item.module.scss";

const MenuItem = (props: MenuItemViewModel) => {
  const {
    name,
    icon,
    children,
    open,
    onSelect,
    index,
    id,
    onMouseEnter,
    onMouseLeave,
    onToggleSubMenu,
    selected,
  } = props;

  const itemClass = useMemo(
    () => classNames(styles.list_item, icon ? styles.icon : styles.no_icon),
    [icon]
  );

  const { width = 250 } = useContext(MenuContext);

  const canShowSubMenu = useMemo(() => children && selected, [
    children,
    selected,
  ]);

  // handler for showing submenu on mouse enter
  const handleMouseEnter = useCallback((ev: PointerEvent) => {
    if (ev.pointerType === "mouse") {
      onMouseEnter?.(id);
    }
  }, []);

  // handler for hiding submenu on mouse leave
  const handleMouseLeave = useCallback((ev: PointerEvent) => {
    if (ev.pointerType === "mouse") {
      onMouseLeave?.(id);
    }
  }, []);

  // handler for opening a submenu or selecting menu item
  const handleClick = useCallback(
    (ev: PointerEvent) => {
      ev.stopPropagation();
      ev.preventDefault();

      if (!children) {
        onSelect?.(name, index, id);
      } else {
        onToggleSubMenu?.(id);
      }
    },
    [onSelect, onToggleSubMenu]
  );

  // handler for opening submenu or selection
  const handleKeyUp = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key !== "Enter") {
        return;
      }
      ev.stopPropagation();

      if (children) {
        onToggleSubMenu?.(id);
      } else {
        onSelect?.(name, index, id);
      }
    },
    [onToggleSubMenu, onSelect]
  );

  return (
    <li
      className={itemClass}
      data-cy="rc-fltmenu-list-item"
      tabIndex={0}
      onKeyUp={handleKeyUp}
      onPointerDown={handleClick}
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
    >
      {icon && (
        <span className={styles.list_item_icon} role="img">
          {icon}
        </span>
      )}
      <span
        aria-label={name}
        className={classNames(
          styles.list_item_name,
          !icon ? styles.no_icon : ""
        )}
      >
        {name}
      </span>
      {children && (
        <span
          aria-label="expand menu"
          className={styles.chevron_right}
          role="img"
        >
          <ChevronRight />
        </span>
      )}
      <div
        className={styles.child_menu_wrapper}
        data-cy="rc-fltmenu-submenu"
        style={{ width: `${width}px` }}
      >
        {canShowSubMenu && (
          <Menu
            disableAnimation
            disableHeader
            isSubMenu
            items={children}
            open={open}
            onSelect={onSelect}
          />
        )}
      </div>
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export { MenuItem };
