import classNames from "classnames";
import {
  CSSProperties,
  KeyboardEvent,
  memo,
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

const MenuItem = memo(
  (props: MenuItemViewModel) => {
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
      iconSize,
    } = props;

    const iconStyle = useMemo(
      () =>
        ({
          "--rc-fltmenu-icon-size": `${iconSize}`,
        } as CSSProperties),
      []
    );

    const itemClass = useMemo(
      () => classNames(styles.list_item, icon ? styles.icon : styles.no_icon),
      [icon]
    );

    const { width = 250 } = useContext(MenuContext);

    const canShowSubMenu = useMemo(() => children && selected, [
      children,
      selected,
    ]);

    const handleMouseEnter = useCallback((ev: PointerEvent) => {
      if (ev.pointerType === "mouse") {
        onMouseEnter?.(id);
      }
    }, []);

    const handleMouseLeave = useCallback((ev: PointerEvent) => {
      if (ev.pointerType === "mouse") {
        onMouseLeave?.(id);
      }
    }, []);

    const handleClick = useCallback((ev: PointerEvent) => {
      ev.stopPropagation();
      ev.preventDefault();

      if (!children) {
        onSelect?.(name, index, id);
      } else {
        onToggleSubMenu?.(id);
      }
    }, []);

    const handleKeyUp = useCallback((ev: KeyboardEvent) => {
      if (ev.key !== "Enter") {
        return;
      }
      ev.stopPropagation();

      if (children) {
        onToggleSubMenu?.(id);
      } else {
        onSelect?.(name, index, id);
      }
    }, []);

    return (
      <li
        className={itemClass}
        style={iconStyle}
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
  },
  (prev, next) => {
    return prev.open === next.open && prev.selected === next.selected;
  }
);

MenuItem.displayName = "MenuItem";

export { MenuItem };
