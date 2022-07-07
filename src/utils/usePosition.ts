import { RefObject, useCallback, useEffect, useRef } from "react";
import { Position } from "../models/position";

type positionParams = {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onDragStart: (p: { left: number; top: number }) => void;
  onDragEnd: (p: { left: number; top: number }) => void;
  startPosition: Position;
  dimension?: number;
  startOffset?: number;
  onInit: (p: { left: number; top: number }) => void;
};

type usePositionType = <T extends HTMLElement>(
  p: positionParams
) => {
  setup: (node: T) => void;
  ref: RefObject<T>;
};

const getStartingPosition = (pos: Position, offset: number = 10) => {
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
  startOffset,
  onInit,
}: positionParams) {
  const ref = useRef<T | null>(null);
  const isClicked = useRef<boolean>(false);
  const isDragged = useRef<boolean>(false);
  const positionRef = useRef<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  const handleMouseDown = () => {
    isClicked.current = true;
    onMouseDown?.();
  };

  const handleMouseUp = () => {
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
      const position = {
        left: e.clientX - halfWidth,
        top: e.clientY - halfWidth,
      };

      if (!isDragged.current) {
        isDragged.current = true;
        onDragStart?.(position);
      }

      positionRef.current = position;

      ref.current.style.cssText += `left: ${position.left}px;`;

      if (position.top >= 0) {
        ref.current.style.cssText += `top: ${
          position.top < 0 ? 0 : position.top
        }px`;
      }
    }
  };

  const setup = useCallback((node: T) => {
    if (node) {
      ref.current = node;
      node.addEventListener("mousedown", handleMouseDown);
      node.addEventListener("mouseup", handleMouseUp);
      node.style.cssText += `position: absolute;z-index: 9999;${getStartingPosition(
        startPosition,
        startOffset
      )}`;
      const { left, top } = node.getBoundingClientRect();
      onInit({
        left,
        top,
      });
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
    ref,
    setup,
  };
};

export { usePosition };
