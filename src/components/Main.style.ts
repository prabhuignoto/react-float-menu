import styled from "@emotion/styled";

export const MainWrapper = styled.div<{ style: { left: string, top: string } }>`
  position: fixed;
  left: ${p => p.style.left}px;
  top: ${p => p.style.top}px;
`;

export const MenuContainer = styled.div<{ style: { minWidth: number } }>`
  min-width: ${p => p.style.minWidth}px;
  position: absolute;

`;

export const MenuHead = styled.div<{ style: { minWidth: number } }>`
  cursor: pointer;
  min-width: ${p => p.style.minWidth}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;