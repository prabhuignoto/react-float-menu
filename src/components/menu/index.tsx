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
    closeImmediate,
    flip,
    onRender,
    disableHeader = false,
    disableAnimation = false,
    isSubMenu = false,
    onSelect,
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
        closeImmediate ? styles.no_animation : "",
        isSubMenu ? styles.is_sub_menu : "",
        open && !closeImmediate && !disableAnimation
          ? styles.menu_open
          : !closeImmediate && open !== null
          ? styles.menu_close
          : !isSubMenu
          ? styles.hide
          : ""
      ),
    [open, flip]
  );

  const listClass = useMemo(
    () => classNames(styles.list, !open ? styles.close : ""),
    [open]
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
      <ul className={listClass} ref={onWrapperInit}>
        {_items.map((item, index) => (
          <MenuItem
            {...item}
            icon={icons && icons[index]}
            iconSize={iconSize}
            key={item.id}
            open={open}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
};

export { Menu };
