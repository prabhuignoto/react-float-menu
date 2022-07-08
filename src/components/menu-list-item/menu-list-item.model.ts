import { ReactNode } from "react";
import { MenuHeadProps } from "../../models/menu-head.model";
import { MenuItemProps } from "../menu/menu-model";

export type MenuItemViewModel = MenuItemProps & {
  icon?: ReactNode;
  open?: boolean | null;
  onSelect?: (path: string, index: number) => void;
  index: number;
} & Pick<MenuHeadProps, "iconSize">;
