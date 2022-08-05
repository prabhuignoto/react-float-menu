import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Menu } from "../index";

// should render menu items
describe("Menu", () => {
  it("renders menu items", () => {
    const { getByText } = render(
      <Menu
        items={[
          {
            name: "Item 1",
          },
          {
            name: "Item 2",
          },
          {
            name: "Item 3",
          },
        ]}
      />
    );
    expect(getByText("Item 1")).toBeInTheDocument();
    expect(getByText("Item 2")).toBeInTheDocument();
    expect(getByText("Item 3")).toBeInTheDocument();
  });

  // should call onClose when the close button is clicked
  it("calls onClose when the close button is clicked", async () => {
    const onClose = vi.fn();
    const { getByLabelText } = render(
      <Menu
        items={[
          {
            name: "Item 1",
          },
          {
            name: "Item 2",
          },
          {
            name: "Item 3",
          },
        ]}
        onClose={onClose}
      />
    );

    const closeButton = getByLabelText("Close");

    expect(closeButton).toBeInTheDocument();

    userEvent.pointer({
      keys: "[MouseLeft]",
      target: closeButton,
    });

    await waitFor(() => {
      expect(onClose).not.toBeCalled();
    });
  });

  // should not render the header
  it("should not render the header", () => {
    const { queryByLabelText } = render(
      <Menu
        disableHeader
        items={[
          {
            name: "Item 1",
          },
          {
            name: "Item 2",
          },
          {
            name: "Item 3",
          },
        ]}
      />
    );

    expect(queryByLabelText("Close")).not.toBeInTheDocument();
  });
});
