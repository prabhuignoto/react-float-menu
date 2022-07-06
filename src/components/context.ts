import React from "react";
import { MenuHeadProps } from "../models/menu-head.model";

type ContextModel = Pick<
  MenuHeadProps,
  | "dimension"
  | "iconSize"
  | "items"
  | "shape"
  | "icons"
  | "theme"
  | "disableHeader"
  | "width"
>;

export const MenuContext = React.createContext<ContextModel>({});
