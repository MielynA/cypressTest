beforeEach(() => {
  cy.accessUrl();
  cy.navigateTo("Products", "/products");
  cy.contains("All Products").should("be.visible");
});

describe("Add products in Cart", () => {
  it("should verify the product is successfully added to cart", () => {
    cy.get(".single-products").first().trigger("mouseover");
    cy.get("a.btn.btn-default.add-to-cart")
      .should("be.visible")
      .first()
      .click();

    cy.get(".modal-content").should("be.visible");
    cy.get('[data-dismiss="modal"]')
      .should("contain.text", "Continue Shopping")
      .click();
    //get the second product
    cy.get(".single-products").eq(2).trigger("mouseover");
    cy.get("a.btn.btn-default.add-to-cart").should("be.visible").eq(2).click();
    cy.get(".modal-content").should("be.visible");
    cy.get('[data-dismiss="modal"]')
      .should("contain.text", "Continue Shopping")
      .click();
    cy.navigateTo("Cart", "/view_cart").should("exist");
    cy.get('tr[id^="product-"]').each(($row) => {
      const productId = $row.attr("id"); // to get dynamic id
      cy.get(`tr#${productId}`).within(() => {
        cy.get("td.cart_description").should("exist");
        cy.get("td.cart_price").should("contain.text", "Rs");
        cy.get("td.cart_quantity").should("exist").and("not.to.be.empty");
      });
    });
  });
});
