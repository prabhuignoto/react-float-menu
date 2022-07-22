import { useCallback, useEffect, useRef } from "react";
import {
  getLeft,
  getStartingPosition,
  getTop,
  positionParams,
  usePositionType,
} from "../utils/helpers";

type Settings = positionParams;

const usePosition: usePositionType = <T extends HTMLElement>(
  settings: Settings
) => {
  const {
    onPointerDown,
    onPointerUp,
    onDragStart,
    onDragEnd,
    startPosition,
    dimension = 0,
    startOffset,
    onInit,
    pin,
    onClosed,
  } = settings;

  const ref = useRef<T | null>(null);
  const isClicked = useRef<boolean>(false);
  const isDragged = useRef<boolean>(false);
  const keyPressed = useRef<boolean>(false);

  const positionRef = useRef<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  const handlePointerDown = (ev: PointerEvent | KeyboardEvent) => {
    isClicked.current = true;
    const ele = ev.target as HTMLElement;
    ev.stopPropagation();

    if (ev instanceof PointerEvent) {
      keyPressed.current = false;
      ele.setPointerCapture(ev.pointerId);
    } else if (ev instanceof KeyboardEvent) {
      keyPressed.current = true;

      if (ev.key === "Escape") {
        onClosed();
      }

      if (ev.key !== "Enter") {
        return;
      }
    }

    onPointerDown?.();
  };

  const handlePointerUp = (ev: PointerEvent | KeyboardEvent) => {
    isClicked.current = false;

    const ele = ev.target as HTMLElement;

    if (ev instanceof PointerEvent) {
      ele.releasePointerCapture(ev.pointerId);
    } else if (ev instanceof KeyboardEvent && ev.key !== "Enter") {
      return;
    }

    if (!isDragged.current) {
      onPointerUp?.();
    } else {
      isDragged.current = false;
      onDragEnd?.(positionRef.current);
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    if (isClicked.current && ref.current && !keyPressed.current) {
      const halfWidth = Math.round(dimension / 2);
      const x = e.clientX - halfWidth;
      const y = e.clientY - halfWidth;

      const position = {
        left: getLeft(x, dimension),
        top: getTop(y, dimension),
      };

      if (!isDragged.current) {
        isDragged.current = true;
        onDragStart?.(position);
      }

      positionRef.current = position;
      ref.current.style.cssText += `top: ${position.top}px;left: ${position.left}px;`;
    }
  };

  const setup = useCallback((node: T) => {
    if (node) {
      ref.current = node;
      node.addEventListener("pointerdown", handlePointerDown);
      node.addEventListener("keydown", handlePointerDown);
      node.addEventListener("pointerup", handlePointerUp);
      node.addEventListener("keyup", handlePointerUp);
      node.style.touchAction = "none";
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
    // attach drag handlers if not pinned
    if (!pin) {
      document.addEventListener("pointermove", onPointerMove);

      // cleanup
      return () => {
        document.removeEventListener("pointermove", onPointerMove);
      };
    }
  }, []);

  return {
    ref,
    setup,
  };
};

export { usePosition };
