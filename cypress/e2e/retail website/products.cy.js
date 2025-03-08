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
      //   cy.get("p").should("contain.text", "Category:");
      cy.get("p")
        .invoke("text")
        .then((text) => {
          expect(text.trim()).to.not.be.empty; //ensure text is not empty alternative approach
        });
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
});
