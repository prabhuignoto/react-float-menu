import { ReactNode } from "react";
import { MenuItemProps } from "../components/menu/menu-model";
import { Position } from "./position";

export interface Theme {
  primary?: string;
  secondary?: string;
  menuBackgroundColor?: string;
  menuItemHoverColor?: string;
  menuItemHoverTextColor?: string;
}

export interface MenuHeadProps {
  children?: ReactNode;
  dimension?: number;
  iconSize?: string;
  icons?: ReactNode[];
  items?: MenuItemProps[];
  shape?: "circle" | "square";
  startPosition?: Position;
  theme?: Theme;
  disableHeader?: boolean;
  width?: number;
  onSelect?: (path: string) => void;
  startOffset?: number;
  closeOnClickOutside?: boolean;
}
