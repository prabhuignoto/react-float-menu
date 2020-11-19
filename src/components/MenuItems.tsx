import React from "react";
import { MenuItem, MenuItemModel } from "./MenuItem";
import { MenuItemsMain, MenuItemsWrapper } from "./MenuItems.style";

const MenuItems: React.FunctionComponent<{ items: MenuItemModel[] }> = ({
  items,
}) => {
  const _items = items.map(item => Object.assign({}, item, {
    id: Math.floor(Math.random()  * 1000)
  }))
  return (
    <MenuItemsWrapper>
      <MenuItemsMain>
        {_items.map((item) => (
          <MenuItem name={item.name} id={item.id} key={item.id}/>
        ))}
      </MenuItemsMain>
    </MenuItemsWrapper>
  );
};

export { MenuItems };
