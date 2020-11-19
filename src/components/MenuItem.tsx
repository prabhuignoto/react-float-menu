import React from "react";
import { MenuItemContent, MenuItemMain } from "./MenuItem.style";

export interface MenuItemModel {
  name: string;
  id: string | number;
}

const MenuItem: React.FunctionComponent<MenuItemModel> = ({ name, id }) => {
  return (
    <MenuItemMain>
      <MenuItemContent>{name}</MenuItemContent>
    </MenuItemMain>
  );
};

export { MenuItem };
