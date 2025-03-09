import { validateFooter } from "../../../support/footerUtils";

export default { validateFooter };

beforeEach(() => {
  cy.accessUrl();
});

describe("Verify the footer of the Homepage", () => {
  it("should validate subscription", () => {
    cy.navigateTo("Home", "/");
    validateFooter();
    cy.get("#susbscribe_email").type("test@sample.com");
    cy.get("#subscribe").click();
    cy.get(".alert-success")
      .should("exist")
      .contains("You have been successfully subscribed!");
  });

  it("should validate required email field", () => {
    cy.navigateTo("Home", "/");
    validateFooter();
    cy.get("#subscribe").click();
    cy.get(".alert-sucess").should("not.exist");
  });

  it("should verify input types and attributes", () => {
    cy.get("#susbscribe_email").should("have.attr", "type", "email");
    cy.get("#subscribe").should("have.attr", "type", "submit");
  });

  it("should verify subscription footer in Cart menu", () => {
    cy.navigateTo("Cart", "/view_cart");
    validateFooter();
    cy.get("#susbscribe_email").type("test@sample.com");
    cy.get("#subscribe").click();
    cy.get(".alert-success")
      .should("exist")
      .contains("You have been successfully subscribed!");
  });
});
