beforeEach(() => {
  cy.accessUrl();
});

describe("Category Products", () => {
  it.skip("should view and select category products", () => {
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

  it("should view and cart brand products", () => {
    cy.navigateTo("Products", "/products");
    cy.contains("All Products").should("be.visible");
    cy.get(".left-sidebar").should("contain.text", "Category").should("exist");
    cy.get(".panel-title").contains("Women").click();
    cy.get("#Women .panel-body a").first().click();
    cy.get(".panel-title").contains("Men").click();
    cy.get("#Men .panel-body a").first().click();
    cy.get(".title").should("be.visible").and("contain.text", "Men");
  });
});
