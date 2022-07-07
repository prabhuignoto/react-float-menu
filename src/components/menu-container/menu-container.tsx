import classNames from "classnames";
import {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { MenuContext } from "../context";
import { Menu } from "../menu";
import { MenuContainerProps } from "./menu-container.model";
import styles from "./menu-container.module.scss";

const MenuContainer: FunctionComponent<MenuContainerProps> = ({
  shouldFlip,
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

  const { items, width } = useContext(MenuContext);

  const isFirstRender = useRef(true);

  const menuContainerStyle = useMemo(() => {
    return {
      "--rc-float-menu-width": `${width}px`,
      [shouldFlip ? "bottom" : "top"]: `${shouldFlip ? bottom : top}px`,
      left: `${left}px`,
    };
  }, [shouldFlip, width, left, top, bottom]);

  const arrowClass = useMemo(
    () =>
      classNames(
        styles.menu_arrow,
        open ? styles.menu_open : "",
        shouldFlip ? styles.flip : ""
      ),
    [open, shouldFlip]
  );

  const menuContainerClass = useMemo(
    () => classNames(styles.menu_container, open ? styles.open : styles.close),
    [open]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  return (
    <div className={menuContainerClass} style={menuContainerStyle}>
      <span className={arrowClass}></span>
      <Menu
        closeImmediate={closeImmediate}
        disableHeader={disableHeader}
        flip={shouldFlip}
        items={items}
        menuHeadPosition={headPosition}
        open={open}
        onClose={onClose}
        onRender={onMenuRender}
        onSelect={onSelect}
      />
    </div>
  );
};

export { MenuContainer };
