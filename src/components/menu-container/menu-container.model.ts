import { MenuHeadProps } from "../../models/menu-head.model";

export type MenuContainerProps = Pick<MenuHeadProps, "disableHeader"> & {
  shouldFlip: boolean;
  menuPosition: {
    left: number;
    top?: number;
    bottom?: number;
  };
  headPosition: {
    x: number;
    y: number;
  };
  open: boolean | null;
  onClose: () => void;
  onMenuRender: (h: number, w: number) => void;
  closeImmediate?: boolean;
  onSelect?: (path: string) => void;
};
