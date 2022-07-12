import { ReactNode } from "react";
import { MenuHeadProps } from "../../models/menu-head.model";
import { MenuItemProps } from "../menu/menu-model";

export type MenuItemViewModel = MenuItemProps & {
  icon?: ReactNode;
  open?: boolean | null;
  onSelect?: (path: string, index: number, id?: string) => void;
  index: number;
  onCloseSubMenu?: () => void;
  onMouseEnter?: (id?: string) => void;
  onMouseLeave?: (id?: string) => void;
  onToggleSubMenu?: (id?: string) => void;
} & Pick<MenuHeadProps, "iconSize">;
