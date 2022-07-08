import { ReactNode } from "react";
import { MenuHeadProps } from "../../models/menu-head.model";

export interface MenuItemProps {
  name: string;
  id?: string;
  onSelected?: (id: string, name: string) => void;
  children?: MenuItemProps[];
  selected?: boolean;
  icon?: ReactNode;
}

export type MenuProps = Pick<MenuHeadProps, "items" | "disableHeader"> & {
  menuHeadPosition?: {
    x: number;
    y: number;
  };
  open?: boolean | null;
  onClose?: () => void;
  closeImmediate?: boolean;
  flip?: boolean;
  onRender?: (height: number, width: number) => void;
  isSubMenu?: boolean;
  disableAnimation?: boolean;
  onSelect?: (path: string, index: number) => void;
};
