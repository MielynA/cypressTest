//Products Menu

beforeEach(() => {
  cy.accessUrl();
});

describe("Products Page", () => {
  it("should verify the products page", () => {
    cy.navigateTo("Products", "/products");
    cy.contains("All Products").should("be.visible");
    // cy.get("ul.nav").contains("a", "View Product").click();
    cy.get("ul.nav a").then(($links) => {
      const randomIndex = Math.floor(Math.random() * $links.length);
      const selectedLink = $links[randomIndex];
      cy.wrap(selectedLink).click();
      cy.url().should("include", selectedLink.getAttribute("href"));
      cy.get("h2").should("exist").and("be.visible");
      cy.get("span").should("contain.text", "Rs.");
      cy.get("p").should("contain.text", "Category:");
    });
  });
});
