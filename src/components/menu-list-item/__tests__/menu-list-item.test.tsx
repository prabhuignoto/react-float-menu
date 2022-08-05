import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { MenuItem } from "../menu-list-item";

describe("MenuListItem", () => {
  it.concurrent("should render", () => {
    const { getByText } = render(<MenuItem name="menu item" />);
    expect(getByText("menu item")).toBeInTheDocument();
  });

  // should have icon rendered
  it.concurrent("should have icon rendered", () => {
    const { getByText, getByRole } = render(
      <MenuItem icon={<span>icon</span>} name="menu item" />
    );
    expect(getByText("icon")).toBeInTheDocument();
    expect(getByRole("img")).toBeInTheDocument();
  });

  // should call onSelect when clicked
  it.concurrent("should call onSelect when clicked", () => {
    const onSelect = vi.fn();
    const { getByText } = render(
      <MenuItem name="menu item" onSelect={onSelect} />
    );

    fireEvent.pointerDown(getByText("menu item"));

    expect(onSelect).toBeCalled();
  });

  // should call onMouseEnter when mouse enters the menu item
  it("should call onMouseEnter when mouse enters the menu item", async () => {
    const onMouseEnter = vi.fn();
    const user = userEvent.setup();

    const { getByText } = render(
      <MenuItem
        id="123"
        index={0}
        name="menu item 1"
        onMouseEnter={onMouseEnter}
      />,
      { container: document.body }
    );

    expect(getByText("menu item 1")).toBeInTheDocument();

    user.hover(getByText("menu item 1"));

    await waitFor(() => {
      expect(onMouseEnter).toBeCalled();
    });
  });

  // should call onMouseLeave when mouse leaves the menu item
  it("should call onMouseLeave when mouse leaves the menu item", async () => {
    const user = userEvent.setup();
    const onMouseLeave = vi.fn();
    const { getByText } = render(
      <MenuItem
        id="123"
        index={0}
        name="menu item 1"
        onMouseEnter={onMouseLeave}
      />,
      { container: document.body }
    );

    expect(getByText("menu item 1")).toBeInTheDocument();

    user.hover(getByText("menu item 1"));

    await waitFor(() => {
      expect(onMouseLeave).toBeCalled();
    });
  });

  // trigger enter key on the menu item
  it("trigger enter key on the menu item", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const { getByText } = render(
      <MenuItem name="menu item" onSelect={onSelect} />
    );

    expect(getByText("menu item")).toBeInTheDocument();

    user.click(getByText("menu item"));

    await waitFor(() => {
      expect(onSelect).toBeCalled();
    });
  });

  // should open the sub menu when clicked
  it("should open the sub menu when clicked", async () => {
    const user = userEvent.setup();
    const onToggleSubMenu = vi.fn();
    const { getByText } = render(
      <MenuItem
        items={[
          {
            items: [
              {
                name: "Copy",
              },
            ],
            name: "Edit",
          },
          {
            name: "Exit",
          },
        ]}
        name="File"
        onToggleSubMenu={onToggleSubMenu}
      />,
      {
        container: document.body,
      }
    );

    user.click(getByText("File"));

    await waitFor(() => {
      expect(onToggleSubMenu).toBeCalled();
    });
  });
});
