import { RefObject } from "react";
import { Theme } from "../models/menu-head.model";
import { Position } from "../models/position";

export const getStartingPosition = (pos: Position, offset: number = 10) => {
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

export const getLeft = (left: number, dimension: number) => {
  if (left < 0) {
    return 0;
  } else if (left + dimension > window.innerWidth) {
    return window.innerWidth - dimension;
  } else {
    return left;
  }
};

export const getTop = (top: number, dimension: number) => {
  if (top < 0) {
    return 0;
  } else if (top + dimension > window.innerHeight) {
    return window.innerHeight - dimension;
  } else {
    return top;
  }
};

export type positionParams = {
  onPointerDown: () => void;
  onPointerUp: () => void;
  onDragStart: (p: { left: number; top: number }) => void;
  onDragEnd: (p: { left: number; top: number }) => void;
  onClosed: () => void;
  startPosition: Position;
  dimension?: number;
  startOffset?: number;
  onInit: (p: { left: number; top: number }) => void;
  pin?: boolean;
};

export type usePositionType = <T extends HTMLElement>(
  p: positionParams
) => {
  setup: (node: T) => void;
  ref: RefObject<T>;
};

export const defaultTheme: Theme = {
  menuBackgroundColor: "#FFFFFF",
  primary: "#318CE7",
  secondary: "#cecece",
};
