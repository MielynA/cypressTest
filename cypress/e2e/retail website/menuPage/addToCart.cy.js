beforeEach(() => {
  cy.accessUrl();
  cy.navigateTo("Products", "/products");
  cy.contains("All Products").should("be.visible");
});

describe("Add products in Cart", () => {
  it("should verify the product is successfully added to cart", () => {
    cy.addToCart();
    cy.dismissCartModal();
    //get the second product
    cy.get(".single-products").eq(2).trigger("mouseover");
    cy.get("a.btn.btn-default.add-to-cart").should("be.visible").eq(2).click();
    cy.dismissCartModal();
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

  it("should verify the quantity in the Cart", () => {
    cy.get('a[href="/product_details/1"]').contains("View Product").click();
    cy.get("#quantity").clear().type(4).should("have.value", "4");
    cy.get(".btn.btn-default.cart").should("be.visible").click();
    cy.get(".modal-content").should("be.visible");
    cy.get('[data-dismiss="modal"]')
      .should("contain.text", "Continue Shopping")
      .click();
    cy.navigateTo("Cart", "/view_cart").should("exist");
    cy.get(".disabled").should("have.text", "4");
  });
});
