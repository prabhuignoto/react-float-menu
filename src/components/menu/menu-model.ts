export interface MenuItemProps {
  name: string;
  id?: string;
  onSelected?: (id: string, name: string) => void;
  children?: MenuItemProps[];
  selected?: boolean;
}

export type MenuProps = {
  items: MenuItemProps[];
  menuHeadPosition: {
    x: number;
    y: number;
  };
  open?: boolean;
  onClose?: () => void;
  disableAnimation?: boolean;
  flip?: boolean;
  onRender: (height: number, width: number) => void;
};
