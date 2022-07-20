import classNames from "classnames";
import {
  FunctionComponent,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { MenuContext } from "../context";
import { Menu } from "../menu";
import { MenuContainerProps } from "./menu-container.model";
import styles from "./menu-container.module.scss";

const MenuContainer: FunctionComponent<MenuContainerProps> = memo(
  ({
    shouldFlipVertical,
    menuPosition,
    headPosition,
    open,
    onClose,
    onMenuRender,
    closeImmediate,
    onSelect,
    disableHeader,
  }) => {
    const { left, top, bottom } = menuPosition;

    const { items, width, theme } = useContext(MenuContext);

    const isFirstRender = useRef(true);

    const menuContainerStyle = useMemo(() => {
      return {
        "--rc-fltmenu-menu-bg-color": theme?.menuBackgroundColor,
        "--rc-fltmenu-width": `${width}px`,
        [shouldFlipVertical ? "bottom" : "top"]: `${
          shouldFlipVertical ? bottom : top
        }px`,
        left: `${left}px`,
      };
    }, [
      shouldFlipVertical,
      width,
      left,
      top,
      bottom,
      theme?.menuBackgroundColor,
    ]);

    const arrowClass = useMemo(
      () =>
        classNames(
          styles.menu_arrow,
          open ? styles.menu_open : styles.menu_close,
          shouldFlipVertical ? styles.flip : ""
        ),
      [open, shouldFlipVertical]
    );

    const menuContainerClass = useMemo(
      () =>
        classNames(styles.menu_container, open ? styles.open : styles.close),
      [open]
    );

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      }
    }, []);

    return (
      <div
        className={menuContainerClass}
        data-cy="rc-fltmenu-container"
        style={menuContainerStyle}
      >
        <span className={arrowClass}></span>
        <Menu
          closeImmediate={closeImmediate}
          disableHeader={disableHeader}
          items={items}
          menuHeadPosition={headPosition}
          open={open}
          onClose={onClose}
          onRender={onMenuRender}
          onSelect={onSelect}
        />
      </div>
    );
  }
);

MenuContainer.displayName = "MenuContainer";

export { MenuContainer };
