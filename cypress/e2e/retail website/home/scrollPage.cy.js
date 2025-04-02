describe("Verify scroll up and down of the page", () => {
  beforeEach(() => {
    cy.accessUrl();
    cy.navigateTo("Home", "/").should("exist");
  });

  it('should verify the scroll up using "arrow" and scroll down functionality', () => {
    cy.scrollTo("bottom");
    cy.window().its("scrollX").should("equal", 0);
    cy.get(".single-widget").contains("Subscription").should("be.visible");
    cy.get("#scrollUp").should("be.visible").click();
    cy.window().its("scrollY").should("equal", 0);
    cy.get(".header-middle").should("be.visible");
  });

  it("should verify scroll up withou arrow button and scroll down functionality", () => {
    cy.scrollTo("bottom");
    cy.window().its("scrollX").should("equal", 0);
    cy.get(".single-widget").contains("Subscription").should("be.visible");
    cy.scrollTo("top");
    cy.window().its("scrollY").should("equal", 0);
    cy.get(".header-middle").should("be.visible");
  });
});
