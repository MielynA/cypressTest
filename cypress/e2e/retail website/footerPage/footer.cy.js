beforeEach(() => {
  cy.accessUrl();
  cy.navigateTo("Home", "/");
  cy.scrollTo("bottom");
  cy.get(".single-widget").should("be.visible");
});

describe("Verify the footer of the page", () => {
  it("should validate subscription", () => {
    cy.get("#susbscribe_email").type("test@sample.com");
    cy.get("#subscribe").click();
    cy.get(".alert-success")
      .should("exist")
      .contains("You have been successfully subscribed!");
  });

  it("should validate required email field", () => {
    cy.get("#subscribe").click();
    cy.get(".alert-sucess").should("not.exist");
  });
});
//should not do anything when email is not populated
// cy.get("##susbscribe_email").should("have.attr", "required");
