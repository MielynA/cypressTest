//Products Menu

beforeEach(() => {
  cy.accessUrl();
  cy.navigateTo("Products", "/products");
  cy.contains("All Products").should("be.visible");
});

describe("Products Page", () => {
  it("should verify the products page", () => {
    cy.get("ul.nav a").then(($links) => {
      const randomIndex = Math.floor(Math.random() * $links.length);
      const selectedLink = $links[randomIndex];
      cy.wrap(selectedLink).click();
      cy.url().should("include", selectedLink.getAttribute("href"));
    });
    cy.get("h2").debug().should("exist").and("be.visible");
    // cy.get("span").should("contain.text", "Rs.");
    cy.get("span", { timeout: 10000 })
      .should("be.visible")
      .should("exist")
      .and("contain.text", "Rs.");
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

  it("should search products and verify cart after login", () => {
    cy.fixture("searchQueries").then((data) => {
      data.queries.forEach((name) => {
        cy.get("#search_product").clear().type(name);
      });
      cy.get(".features_items")
        .should("exist")
        .and("contain.text", "All Products")
        .should("be.visible");

      cy.get(".single-products").should("be.visible");
      cy.addToCart();
      cy.dismissCartModal();
      cy.clickLoginMenu();
      cy.validLoginUser();
      cy.navigateTo("Cart", "/view_cart").should("exist");
      cy.get("td.cart_description").should("exist");
      cy.get("td.cart_price").should("contain.text", "Rs");
      cy.get("td.cart_quantity").should("exist").and("not.to.be.empty");
    });
  });

  it("should able to add review on product", () => {
    cy.get('a[href="/product_details/1"]').contains("View Product").click();
    cy.get("#name").type("test").should("have.value", "test");
    cy.get("#email")
      .type("me@example.com")
      .should("have.value", "me@example.com");
    cy.get("#review")
      .type("this is a test review comment")
      .should("have.value", "this is a test review comment");
    cy.get("#button-review").contains("Submit").click();
    cy.get(".alert-success")
      .contains("Thank you for your review.")
      .should("exist");
  });
});
