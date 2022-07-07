export type MenuContainerProps = {
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
