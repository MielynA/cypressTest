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

  it("should add to cart from recommended items", () => {
    cy.get(".recommended_items").should("be.visible");
    cy.get("#recommended-item-carousel .item.active .add-to-cart")
      .should("have.length.greaterThan", 0)
      .then(($items) => {
        const randomIndex = Math.floor(Math.random() * $items.length);
        cy.wrap($items[randomIndex]).click();
      });
    cy.dismissCartModal();
    cy.navigateTo("Cart", "/view_cart").should("exist");
    cy.get("td.cart_description").should("exist");
    cy.get("td.cart_price").should("contain.text", "Rs");
    cy.get("td.cart_quantity").should("exist").and("not.to.be.empty");
  });
});
