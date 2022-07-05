import classNames from "classnames";
import { nanoid } from "nanoid";
import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { CloseIcon } from "../../icons";
import { MenuContext } from "../context";
import { MenuItem } from "./menu-list-item";
import { MenuItemProps, MenuProps } from "./menu-model";
import styles from "./menu.module.scss";

const Menu: FunctionComponent<MenuProps> = (props) => {
  const {
    items = [],
    menuHeadPosition,
    open,
    onClose,
    disableAnimation,
    flip,
    onRender,
  } = props;

  const [_items] = useState<MenuItemProps[]>(() =>
    items.map((item) => ({ ...item, selected: false, id: nanoid() }))
  );

  const wrapperRef = useRef<HTMLUListElement>();

  const [height, setHeight] = useState(0);

  const { iconSize, icons, theme } = useContext(MenuContext);

  const style = useMemo(
    () =>
      ({
        "--menu-height": `${height}px`,
        "--rc-float-menu-theme-primary": theme?.primary,
      } as CSSProperties),
    [height, JSON.stringify(menuHeadPosition)]
  );

  const wrapperClass = useMemo(
    () =>
      classNames(
        styles.wrapper,
        flip ? styles.flip : "",
        open && !disableAnimation
          ? styles.menu_open
          : !disableAnimation
          ? styles.menu_close
          : styles.menu_close_no_animation
      ),
    [open, flip]
  );

  const onWrapperInit = useCallback((node: HTMLUListElement) => {
    if (node) {
      wrapperRef.current = node;
      setTimeout(() => {
        const height = node.clientHeight + 40;
        setHeight(height);
        onRender(height, node.clientWidth);
      }, 500);
    }
  }, []);

  const handleClose = useCallback(() => {
    onClose?.();
  }, []);

  return (
    <div className={wrapperClass} style={style}>
      <div className={styles.toolbar}>
        <span role="button" className={styles.close_btn} onClick={handleClose}>
          <CloseIcon />
        </span>
      </div>
      <ul className={styles.list} ref={onWrapperInit}>
        {_items.map((item, index) => (
          <MenuItem
            {...item}
            key={item.id}
            iconSize={iconSize}
            icon={icons && icons[index]}
          />
        ))}
      </ul>
    </div>
  );
};

export { Menu };
