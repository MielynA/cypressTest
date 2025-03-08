//Products Menu

beforeEach(() => {
  cy.accessUrl();
  cy.navigateTo("Products", "/products");
  cy.contains("All Products").should("be.visible");
});

describe("Products Page", () => {
  it.skip("should verify the products page", () => {
    cy.get("ul.nav a").then(($links) => {
      const randomIndex = Math.floor(Math.random() * $links.length);
      const selectedLink = $links[randomIndex];
      cy.wrap(selectedLink).click();
      cy.url().should("include", selectedLink.getAttribute("href"));
    });
    cy.get("h2").should("exist").and("be.visible");
    cy.get("span").should("contain.text", "Rs.");
    cy.get("p")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.not.be.empty; //ensure text is not empty alternative approach
      });
    cy.get("p").should(($paragraph) => {
      const text = $paragraph.text();
      expect(text).to.include("Availability");
      expect(text).to.include("Brand");
      expect(text).to.include("Condition");
    });
    cy.get("p")
      .should("be.visible")
      .and(($el) => {
        expect($el.text().trim()).to.not.be.empty;
      });
  });

  it("should search the products", () => {
    // cy.get("#search_product").should("be.visible").type("women"); alternative way
    cy.fixture("searchQueries").then((data) => {
      data.queries.forEach((name) => {
        cy.get("#search_product").clear().type(name);
      });
      cy.get(".features_items")
        .should("exist")
        .and("contain.text", "All Products")
        .should("be.visible");

      cy.get(".single-products").should("be.visible");
    });
  });
  //verify the search product by clicking the search icon button
  //verify the search product by hitting return or enter key
});
