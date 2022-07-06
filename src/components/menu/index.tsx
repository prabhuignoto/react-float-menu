import classNames from "classnames";
import { nanoid } from "nanoid";
import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CloseIcon } from "../../icons";
import { MenuContext } from "../context";
import { MenuItem } from "../menu-list-item/menu-list-item";
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
    disableHeader = false,
    isSubMenu = false,
  } = props;

  const [_items] = useState<MenuItemProps[]>(() =>
    items.map((item) => ({ ...item, id: nanoid(), selected: false }))
  );

  const wrapperRef = useRef<HTMLUListElement>();

  const [height, setHeight] = useState(0);

  const { iconSize, icons, theme } = useContext(MenuContext);

  const isFirstRender = useRef(true);

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
        disableAnimation ? styles.no_animation : "",
        isSubMenu ? styles.is_sub_menu : "",
        open && !disableAnimation
          ? styles.menu_open
          : !disableAnimation && open !== null
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
        onRender?.(height, node.clientWidth);
      }, 500);
    }
  }, []);

  const handleClose = useCallback(() => {
    onClose?.();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  return (
    <div className={wrapperClass} style={style}>
      {!disableHeader && (
        <div className={styles.toolbar}>
          <span
            className={styles.close_btn}
            role="button"
            onClick={handleClose}
          >
            <CloseIcon />
          </span>
        </div>
      )}
      <ul className={styles.list} ref={onWrapperInit}>
        {_items.map((item, index) => (
          <MenuItem
            {...item}
            icon={icons && icons[index]}
            iconSize={iconSize}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
};

export { Menu };
