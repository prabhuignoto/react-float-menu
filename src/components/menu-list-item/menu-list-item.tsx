import classNames from "classnames";
import {
  CSSProperties,
  KeyboardEvent,
  memo,
  PointerEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ChevronRight } from "../../icons";
import { MenuContext } from "../context";
import { Menu } from "../menu";
import { MenuItemViewModel } from "./menu-list-item.model";
import styles from "./menu-list-item.module.scss";

const MenuItem = memo(
  (props: MenuItemViewModel) => {
    const { name, icon, iconSize, children, open, onSelect, index } = props;
    const iconStyle = useMemo(
      () =>
        ({
          "--rc-float-menu-icon-size": `${iconSize}`,
        } as CSSProperties),
      []
    );

    const itemClass = useMemo(
      () => classNames(styles.list_item, icon ? styles.icon : styles.no_icon),
      [icon]
    );

    const [showSubMenu, setShowSubMenu] = useState(false);

    const { width = 250 } = useContext(MenuContext);

    const canShowSubMenu = useMemo(() => children && showSubMenu, [
      children,
      showSubMenu,
    ]);

    const toggleSubMenu = useCallback(() => {
      setShowSubMenu((prev) => !prev);
    }, []);

    const handleMouseLeave = useCallback(() => {
      if (showSubMenu) {
        toggleSubMenu();
      }
    }, [showSubMenu]);

    const handleClick = useCallback(
      (ev: PointerEvent) => {
        ev.stopPropagation();

        if (!children) {
          onSelect?.(name, index);
        } else {
          toggleSubMenu();
        }
      },
      [toggleSubMenu]
    );

    const handleKeyUp = useCallback((ev: KeyboardEvent) => {
      if (ev.key !== "Enter") {
        return;
      }
      ev.stopPropagation();

      if (children) {
        toggleSubMenu?.();
      } else {
        onSelect?.(name, index);
      }
    }, []);

    useEffect(() => {
      if (!open) {
        setShowSubMenu(false);
      }
    }, [open]);

    return (
      <li
        className={itemClass}
        style={iconStyle}
        tabIndex={0}
        onKeyUp={handleKeyUp}
        onPointerDown={handleClick}
        onPointerEnter={toggleSubMenu}
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
