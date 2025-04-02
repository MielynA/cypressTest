describe("Verify scroll up and down of the page", () => {
  beforeEach(() => {
    cy.accessUrl();
  });

  it('should verify the scroll up using "arrow" and scroll down functionality', () => {
    cy.navigateTo("Home", "/").should("exist");
    cy.scrollTo("bottom");
    cy.get("#scrollUp").should("be.visible").click();
    cy.window().its("scrollY").should("equal", 0);
    cy.get(".header-middle").should("be.visible");
  });
});
