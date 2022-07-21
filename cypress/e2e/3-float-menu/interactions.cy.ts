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
      .trigger("pointerdown", {
        pointerId: 1,
      });

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
      .trigger("pointerdown", {
        pointerId: 2,
      });

    // menu should be closed when clicked on the head
    cy.get('[data-cy="rc-fltmenu-head"]').click();

    cy.get('[data-cy="rc-fltmenu-container"]').should("not.be.visible");
  });

  // drag the menu head 200px to right and 300px down
  it("should drag the menu head 200px to right and 300px down", () => {
    cy.get('[data-cy="rc-fltmenu-head"]').click();

    cy.get('[data-cy="rc-fltmenu-head"]')
      .trigger("pointerdown", {
        pointerId: 1,
      })
      .trigger("pointermove", {
        clientX: 300,
        clientY: 200,
        pointerId: 1,
      })
      .trigger("pointerup", {
        pointerId: 1,
      });

    // open the menu
    cy.get('[data-cy="rc-fltmenu-head"]').click();

    // check if the menu is opened at the right position
    cy.get('[data-cy="rc-fltmenu-container"]').should("be.visible");
  });

  // drag and drop the menu head to the bottom center of the screen and check if the menu is flipped
  it("should drag and drop the menu head to the bottom center of the screen", () => {
    cy.get('[data-cy="rc-fltmenu-head"]').click();

    // get cypress viewport height
    const cypressViewportHeight = Cypress.config("viewportHeight");

    cy.get('[data-cy="rc-fltmenu-head"]')
      .trigger("pointerdown", {
        pointerId: 1,
      })
      .trigger("pointermove", {
        clientX: 300,
        clientY: cypressViewportHeight - 50,
        pointerId: 1,
      })
      .trigger("pointerup", {
        pointerId: 1,
      });

    // open the menu
    cy.get('[data-cy="rc-fltmenu-head"]').click();

    // check if the menu is opened at the right position
    cy.get('[data-cy="rc-fltmenu-container"]').should("be.visible");
  });

  // drag and drop the menu head to the top right corner of the screen and check if the menu is visible
  it("should drag and drop the menu head to the top right corner of the screen", () => {
    cy.get('[data-cy="rc-fltmenu-head"]').click();

    cy.get('[data-cy="rc-fltmenu-head"]')
      .trigger("pointerdown", {
        pointerId: 1,
      })
      .trigger("pointermove", {
        clientX: Cypress.config("viewportWidth") - 50,
        clientY: 50,
        pointerId: 1,
      })
      .trigger("pointerup", {
        pointerId: 1,
      });

    // open the menu
    cy.get('[data-cy="rc-fltmenu-head"]').click();

    // check if the menu is opened at the right position
    cy.get('[data-cy="rc-fltmenu-container"]').should("be.visible");
  });

  // drag and drop the menu head to a random place 10 times and check if the menu is visible
  it("should drag and drop the menu head to a random place 10 times", () => {
    cy.get('[data-cy="rc-fltmenu-head"]').click();

    for (let i = 0; i < 30; i++) {
      cy.get('[data-cy="rc-fltmenu-head"]')
        .trigger("pointerdown", {
          pointerId: 1,
        })
        .trigger("pointermove", {
          clientX: Math.floor(Math.random() * Cypress.config("viewportWidth")),
          clientY: Math.floor(Math.random() * Cypress.config("viewportHeight")),
          pointerId: 1,
        })
        .trigger("pointerup", {
          pointerId: 1,
        });
      // open the menu
      cy.get('[data-cy="rc-fltmenu-head"]').click();

      // check if the menu is opened at the right position
      cy.get('[data-cy="rc-fltmenu-container"]').should("be.visible");
    }
  });

  // open the menu head by triggering the pointer down event on menu head
  it("should open the menu head by triggering the pointer down event on menu head", () => {
    // focus menu head
    cy.get('[data-cy="rc-fltmenu-head"]').focus();

    cy.get('[data-cy="rc-fltmenu-head"]').trigger("pointerup", {
      pointerId: 1,
    });

    // check if the menu is opened
    cy.get('[data-cy="rc-fltmenu-container"]').should("be.visible");

    cy.get('[data-cy="rc-fltmenu-head"]').trigger("pointerup", {
      pointerId: 1,
    });

    // check if the menu is opened
    cy.get('[data-cy="rc-fltmenu-container"]').should("not.be.visible");
  });

  it("Should close the menu when pressing Escape", () => {
    // focus menu head
    cy.get('[data-cy="rc-fltmenu-head"]').focus();

    cy.get('[data-cy="rc-fltmenu-head"]').trigger("pointerup", {
      pointerId: 1,
    });

    // check if the menu is opened
    cy.get('[data-cy="rc-fltmenu-container"]').should("be.visible");

    cy.get('[data-cy="rc-fltmenu-head"]').trigger("keyup", {
      key: "Escape",
    });

    // check if the menu is opened
    cy.get('[data-cy="rc-fltmenu-container"]').should("not.be.visible");
  });
});
