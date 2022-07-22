import React from "react";
import { MenuHeadProps } from "../models/menu-head.model";

type ContextModel = Pick<
  MenuHeadProps,
  | "dimension"
  | "items"
  | "shape"
  | "theme"
  | "disableHeader"
  | "width"
  | "iconSize"
  | "RTL"
  | "closeOnClickOutside"
>;

export const MenuContext = React.createContext<ContextModel>({});
