import { RefObject, useCallback, useEffect, useRef } from "react";
import { Position } from "../models/position";

type positionParams = {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onDragStart: () => void;
  onDragEnd: (p: { left: number; top: number }) => void;
  startPosition: Position;
  dimension?: number;
};

type usePositionType = <T extends HTMLElement>(
  p: positionParams
) => {
  onInit: (node: T) => void;
  ref: RefObject<T>;
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
  dimension = 0,
}: positionParams) {
  const ref = useRef<T | null>(null);
  const isClicked = useRef<Boolean>(false);
  const isDragged = useRef<Boolean>(false);
  const positionRef = useRef<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  const handleMouseDown = (e: MouseEvent) => {
    isClicked.current = true;
    onMouseDown?.();
  };

  const handleMouseUp = (e: MouseEvent) => {
    isClicked.current = false;

    if (!isDragged.current) {
      onMouseUp?.();
    } else {
      isDragged.current = false;
      onDragEnd?.(positionRef.current);
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isClicked.current && ref.current) {
      const halfWidth = Math.round(dimension / 2);

      console.log(e);

      if (!isDragged.current) {
        isDragged.current = true;
        onDragStart?.();
      }

      const position = {
        left: e.clientX - halfWidth,
        top: e.clientY - halfWidth,
      };

      positionRef.current = position;

      ref.current.style.cssText += `
        left: ${position.left}px;
        top: ${position.top}px;
      `;
    }
  };

  const onInit = useCallback((node: T) => {
    if (node) {
      ref.current = node;
      node.addEventListener("mousedown", handleMouseDown);
      node.addEventListener("mouseup", handleMouseUp);
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
    ref,
  };
};

export { usePosition };
