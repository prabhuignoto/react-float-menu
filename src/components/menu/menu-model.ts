import { MenuHeadProps } from "../../models/menu-head.model";

export interface MenuItemProps {
  name: string;
  id?: string;
  onSelected?: (id: string, name: string) => void;
  children?: MenuItemProps[];
  selected?: boolean;
}

export type MenuProps = Pick<MenuHeadProps, "items" | "disableHeader"> & {
  menuHeadPosition?: {
    x: number;
    y: number;
  };
  open?: boolean | null;
  onClose?: () => void;
  disableAnimation?: boolean;
  flip?: boolean;
  onRender?: (height: number, width: number) => void;
  isSubMenu?: boolean;
};
