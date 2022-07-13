import { ReactNode } from "react";
import { MenuItemProps } from "../components/menu/menu-model";
import { Position } from "./position";

export interface Theme {
  menuBackgroundColor?: string;
  menuItemHoverColor?: string;
  menuItemHoverTextColor?: string;
  primary?: string;
  secondary?: string;
}

export interface MenuHeadProps {
  autoFlipMenu?: boolean;
  bringMenuToFocus?: boolean;
  children?: ReactNode;
  closeOnClickOutside?: boolean;
  dimension?: number;
  disableHeader?: boolean;
  iconSize?: string;
  icons?: ReactNode[];
  items?: MenuItemProps[];
  onSelect?: (path: string) => void;
  shape?: "circle" | "square";
  startOffset?: number;
  startPosition?: Position;
  theme?: Theme;
  width?: number;
}
