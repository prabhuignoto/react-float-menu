import classNames from "classnames";
import {
  CSSProperties,
  FunctionComponent,
  MouseEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ChevronRight } from "../../icons";
import { MenuHeadProps } from "../../models/menu-head.model";
import { MenuContext } from "../context";
import { Menu } from "../menu";
import { MenuItemProps } from "../menu/menu-model";
import styles from "./menu-list-item.module.scss";

export type MenuItemViewModel = MenuItemProps & {
  icon?: ReactNode;
  open?: boolean | null;
  onSelect?: (path: string) => void;
} & Pick<MenuHeadProps, "iconSize">;

const MenuItem: FunctionComponent<MenuItemViewModel> = ({
  name,
  icon,
  iconSize,
  children,
  open,
  onSelect,
}) => {
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

  const toggleSubMenu = useCallback((ev: MouseEvent | TouchEvent) => {
    setShowSubMenu((prev) => !prev);
  }, []);

  const handleMouseLeave = useCallback(
    (ev: MouseEvent) => {
      if (showSubMenu) {
        toggleSubMenu(ev);
      }
    },
    [showSubMenu]
  );

  const handleClick = useCallback(
    (ev: MouseEvent | TouchEvent) => {
      ev.stopPropagation();
      onSelect?.(name);
    },
    [toggleSubMenu]
  );

  useEffect(() => {
    if (!open) {
      setShowSubMenu(false);
    }
  }, [open]);

  return (
    <li
      className={itemClass}
      style={iconStyle}
      onMouseDown={handleClick}
      onMouseEnter={toggleSubMenu}
      onMouseLeave={handleMouseLeave}
    >
      {icon && <span className={styles.list_item_icon}>{icon}</span>}
      <span className={styles.list_item_name}>{name}</span>
      {children && (
        <span className={styles.chevron_right}>
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
};

export { MenuItem };
