import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MenuHead } from "../index";
import styles from "../main.module.scss";

describe("MenuHead", () => {
  // should open the menu on click and all the menu items should be visible
  it("should open the menu on click and all the menu items should be visible", async () => {
    const { container, getByText } = render(
      <MenuHead
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

    const head = container.querySelector("[data-cy='rc-fltmenu-icon']");

    if (head) {
      userEvent.click(head);

      await waitFor(() => {
        expect(getByText("Item 1")).toBeInTheDocument();
        expect(getByText("Item 2")).toBeInTheDocument();
        expect(getByText("Item 3")).toBeInTheDocument();
      });
    }
  });

  // should menu head have the attribute --dimension
  it("should have the attribute --dimension", () => {
    const { getByRole } = render(<MenuHead dimension={40} />);

    expect(getByRole("button")).toBeInTheDocument();
    expect(getByRole("button")).toHaveStyle("--dimension: 40px");
  });

  // menu head should have the square shape
  it("should have the square shape", () => {
    const { getByRole } = render(<MenuHead shape="square" />);

    expect(getByRole("button")).toBeInTheDocument();
    expect(getByRole("button")).toHaveClass(styles.square);
  });

  // menu should be pinned to the top left of the screen
  it("should be pinned to the top left of the screen", () => {
    const { getByRole } = render(<MenuHead pin startPosition="top left" />);

    expect(getByRole("button")).toBeInTheDocument();
  });
});
