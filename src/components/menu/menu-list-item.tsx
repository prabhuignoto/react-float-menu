import classNames from "classnames";
import {
  CSSProperties,
  FunctionComponent,
  MouseEvent,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Menu } from ".";
import { ChevronRight } from "../../icons";
import { MenuHeadProps } from "../../models/menu-head.model";
import { MenuContext } from "../context";
import styles from "./menu-list-item.module.scss";
import { MenuItemProps } from "./menu-model";

export type MenuItemViewModel = MenuItemProps & {
  icon?: ReactNode;
} & Pick<MenuHeadProps, "iconSize">;

const MenuItem: FunctionComponent<MenuItemViewModel> = ({
  name,
  icon,
  iconSize,
  children,
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

  const handleClick = useCallback(
    (ev: MouseEvent) => {
      setShowSubMenu(!showSubMenu);
    },
    [showSubMenu]
  );

  return (
    <li className={itemClass} style={iconStyle} onClick={handleClick}>
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
          <Menu disableAnimation disableHeader isSubMenu items={children} />
        )}
      </div>
    </li>
  );
};

export { MenuItem };
