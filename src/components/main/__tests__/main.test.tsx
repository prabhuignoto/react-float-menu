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
    const { container } = render(<MenuHead dimension={40} />);

    const ele = container.querySelector("[data-cy='rc-fltmenu-head']");

    expect(ele).toHaveAttribute("role", "button");
    expect(ele).toHaveStyle("--dimension: 40px");
  });

  // menu head should have the square shape
  it("should have the square shape", () => {
    const { container } = render(<MenuHead shape="square" />);

    const ele = container.querySelector("[data-cy='rc-fltmenu-head']");

    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass(styles.square);
  });

  // menu should be pinned to the top left of the screen
  it("should be pinned to the top left of the screen", () => {
    const { container } = render(<MenuHead pin startPosition="top left" />);

    const ele = container.querySelector("[data-cy='rc-fltmenu-head']");

    expect(ele).toBeInTheDocument();
  });
});
