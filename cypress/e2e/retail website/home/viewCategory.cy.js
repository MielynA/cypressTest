beforeEach(() => {
  cy.accessUrl();
});

describe("Category Products", () => {
  it("should view and select category products", () => {
    cy.get(".left-sidebar").should("contain.text", "Category");
    // Open Women category and click the first link
    cy.get(".panel-title").contains("Women").click();
    cy.get("#Women .panel-body a").first().click();

    cy.get(".title").should("be.visible").and("contain.text", "Women");

    // Open Men category and click first link
    cy.get(".panel-title").contains("Men").click();
    cy.get("#Men .panel-body a").first().click();

    cy.get(".title").should("be.visible").and("contain.text", "Men");
  });
});
