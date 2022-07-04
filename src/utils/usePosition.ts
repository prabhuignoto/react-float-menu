import { useCallback, useEffect, useRef } from "react";
import { Position } from "../models/position";

type positionParams = {
  onMouseDown: () => void;
  onMouseUp: (d?: DOMRect) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  startPosition: Position;
};

type usePositionType = <T extends HTMLElement>(
  p: positionParams
) => {
  onInit: (node: T) => void;
};

const getStartingPosition = (pos: Position) => {
  const offset = 10;
  switch (pos) {
    case "top left":
      return `left: ${offset}px;top: ${offset}px;`;
    case "top right":
      return `right: ${offset}px;top: ${offset}px;`;
    case "bottom left":
      return `left: ${offset}px;bottom: ${offset}px;`;
    case "bottom right":
      return `right: ${offset}px;bottom: ${offset}px;`;
    default:
      return `left: ${offset}px;top: ${offset}px;`;
  }
};

const usePosition: usePositionType = function <T extends HTMLElement>({
  onMouseDown,
  onMouseUp,
  onDragStart,
  onDragEnd,
  startPosition,
}: positionParams) {
  const ref = useRef<T>();
  const isClicked = useRef<Boolean>(false);
  const targetDimensions = useRef<DOMRect>();
  const isDragged = useRef<Boolean>(false);

  const handleMouseDown = (e: MouseEvent) => {
    isClicked.current = true;
    onMouseDown?.();
  };

  const handleMouseUp = (e: MouseEvent) => {
    isClicked.current = false;

    setTimeout(() => {
      if (!isDragged.current) {
        onMouseUp?.(ref.current?.getBoundingClientRect());
      } else {
        isDragged.current = false;
        onDragEnd?.();
      }
    }, 100);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isClicked.current && ref.current && targetDimensions.current) {
      const { width } = targetDimensions.current;
      const halfWidth = Math.round(width / 2);

      if (!isDragged.current) {
        isDragged.current = true;
        onDragStart?.();
      }

      ref.current.style.cssText += `
        left: ${e.clientX - halfWidth}px;
        top: ${e.clientY - halfWidth}px;
      `;
    }
  };

  const onInit = useCallback((node: T) => {
    if (node) {
      ref.current = node;
      node.addEventListener("mousedown", handleMouseDown);
      node.addEventListener("mouseup", handleMouseUp);
      targetDimensions.current = node.getBoundingClientRect();
      node.style.cssText += `position: absolute;z-index: 9999;${getStartingPosition(
        startPosition
      )}`;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);

    // cleanup
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return {
    onInit,
  };
};

export { usePosition };
