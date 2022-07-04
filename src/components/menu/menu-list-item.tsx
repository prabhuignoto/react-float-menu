import classNames from "classnames";
import { CSSProperties, FunctionComponent, ReactNode, useMemo } from "react";
import { MenuHeadProps } from "../../models/menu-head.model";
import styles from "./menu-list-item.module.scss";
import { MenuItemProps } from "./menu-model";

export type MenuItemViewModel = MenuItemProps & {
  icon?: ReactNode;
} & Pick<MenuHeadProps, "iconSize">;

const MenuItem: FunctionComponent<MenuItemViewModel> = ({
  name,
  icon,
  iconSize,
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

  return (
    <li className={itemClass} style={iconStyle}>
      {icon && <span className={styles.list_item_icon}>{icon}</span>}
      <span className={styles.list_item_name}>{name}</span>
      {/* <div className={styles.child_menu_wrapper}> */}
      {/* {item.children && (
                <Menu
                  items={item.children}
                  menuHeadPosition={menuHeadPosition}
                />
              )} */}
      {/* </div> */}
    </li>
  );
};

export { MenuItem };
