import React, { useCallback, useEffect, useRef, useState } from "react";
import { MainWrapper, MenuContainer, MenuHead } from "./Main.style";
import { MenuItemModel } from "./MenuItem";
import { MenuItems } from "./MenuItems";

const Main: React.FunctionComponent<{
  items: MenuItemModel[];
  children: React.ReactNode;
  minWidth: number;
}> = ({ items, children, minWidth = 200 }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const dragStart = useRef(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const [menuHeadStyle, setMenuHeadStyle] = useState({
    left: "0px",
    top: "0px",
  });

  const handleToggleMenu = () => {
    if (!dragStart.current) {
      setToggleMenu(!toggleMenu);
    }
  };

  const handleDragStart = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.stopPropagation();

      dragStart.current = true;
    },
    []
  );

  const handleDragEnd = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.stopPropagation();

      dragStart.current = false;
    },
    []
  );

  useEffect(() => {
    const isTouch = window.ontouchstart !== undefined;

    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();

      const mainWrapper = mainRef.current;
      let position = {
        left: "",
        top: "",
      };

      if (dragStart.current && mainWrapper) {
        if (event instanceof MouseEvent) {
          const deltaX = event.movementX;
          const deltaY = event.movementY;
          const rect = mainWrapper.getBoundingClientRect();

          position = {
            left: rect.x + deltaX + "px",
            top: rect.y + deltaY + "px",
          };
        } else if (event instanceof TouchEvent) {
          const touch = event.touches[0];

          const deltaX = touch.clientX;
          const deltaY = touch.clientY;
          position = {
            left: deltaX - mainWrapper.clientWidth / 2 + "px",
            top: deltaY - mainWrapper.clientHeight / 2 + "px",
          };
        }
        setMenuHeadStyle({
          left: position.left,
          top: position.top,
        });
      }
    };

    document.addEventListener(
      isTouch ? "touchmove" : "mousemove",
      handleMouseMove,
      {
        passive: false,
      }
    );
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <MainWrapper
      ref={mainRef}
      onClick={handleToggleMenu}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
      draggable
      style={menuHeadStyle}
    >
      <MenuHead style={{ minWidth }}>{children}</MenuHead>
      {toggleMenu && (
        <MenuContainer style={{ minWidth }}>
          <MenuItems items={items} />
        </MenuContainer>
      )}
    </MainWrapper>
  );
};

export default Main;
