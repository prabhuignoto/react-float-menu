import { render } from "@testing-library/react";
import { MenuHead } from "../index";
import styles from "../main.module.scss";

describe("MenuHead", () => {
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
});
