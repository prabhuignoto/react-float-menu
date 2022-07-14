describe("Menu head", () => {
  // visit the page
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  // check if the menu head exists
  it("should have a menu head", () => {
    cy.get('[data-cy="rc-fltmenu-head"]').should("exist");
  });

  // check if the icon is rendered inside the menu head
  it("should have an icon", () => {
    cy.get('[data-cy="rc-fltmenu-head"]')
      .find('[data-cy="rc-fltmenu-icon"]')
      .should("exist");
  });

  // should render svg icon inside menu head
  it("should have a svg icon", () => {
    cy.get('[data-cy="rc-fltmenu-head"]')
      .find('[data-cy="rc-fltmenu-icon"]')
      .find("svg")
      .should("exist");
  });

  // check if the menu is available on clicking the menu head
  it("should have a menu", () => {
    cy.get('[data-cy="rc-fltmenu-head"]')
      .find('[data-cy="rc-fltmenu-icon"]')
      .click();
    cy.get('[data-cy="rc-fltmenu-container"]').should("exist");
    cy.get('[data-cy="rc-fltmenu-container"]').find("ul").should("be.visible");
  });

  // the menu should have a close button
  it("should have a close button", () => {
    cy.get('[data-cy="rc-fltmenu-head"]').click();

    cy.get('[data-cy="rc-fltmenu-container"]')
      .find('[role="button"], [data-cy="rc-fltmenu-close"]')
      .should("exist");
  });

  // should close the menu on clicking the close button
  it("should close the menu on clicking the close button", () => {
    cy.get('[data-cy="rc-fltmenu-head"]').click();

    cy.get('[data-cy="rc-fltmenu-container"]')
      .find('[role="button"], [data-cy="rc-fltmenu-close"]')
      .click();

    cy.get('[data-cy="rc-fltmenu-container"]').should("not.be.visible");
  });

  // should close the menu on clicking outside the menu
  it("should close the menu on clicking outside the menu", () => {
    cy.get('[data-cy="rc-fltmenu-head"]').click();

    cy.get('[data-cy="rc-fltmenu-container"]').click().should("not.be.visible");
  });

  // should have exactly 6 menu items when the menu is opened
  it("should have exactly 6 menu items when the menu is opened", () => {
    cy.get('[data-cy="rc-fltmenu-head"]').click();

    cy.get('[data-cy="rc-fltmenu-container"]')
      .find("ul")
      .find("li")
      .should("have.length", 6);
  });

  // check if the submenu open when the menu item "Edit" is clicked
  it("should open the submenu when the menu item 'Edit' is clicked", () => {
    cy.get('[data-cy="rc-fltmenu-head"]').click();

    cy.get('[data-cy="rc-fltmenu-container"]')
      .find("ul")
      .find("li")
      .contains("Edit")
      .trigger("pointerdown");

    cy.get('[data-cy="rc-fltmenu-submenu"]').should("exist");
    cy.get('[data-cy="rc-fltmenu-submenu"]').should("be.visible");

    cy.get('[data-cy="rc-fltmenu-submenu"]')
      .find("li")
      .should("have.length", 2);

    cy.get('[data-cy="rc-fltmenu-submenu"]').find("li").contains("Cut");

    // click on the menu item "Cut"
    cy.get('[data-cy="rc-fltmenu-submenu"]')
      .find("li")
      .contains("Cut")
      .trigger("pointerdown");

    // menu should be closed when clicked on the head
    cy.get('[data-cy="rc-fltmenu-head"]').click();

    cy.get('[data-cy="rc-fltmenu-container"]').should("not.be.visible");
  });
});
