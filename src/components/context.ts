import React from "react";
import { MenuHeadProps } from "../models/menu-head.model";

export const MenuContext = React.createContext<MenuHeadProps>({
  items: [],
  dimension: 30,
  shape: "circle",
  iconSize: "1rem"
});
