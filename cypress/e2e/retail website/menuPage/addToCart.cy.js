beforeEach(() => {
  cy.accessUrl();
  cy.navigateTo("Products", "/products");
  cy.contains("All Products").should("be.visible");
});

const proceedToCheckout = () => {
  cy.navigateTo("Cart", "/view_cart").should("exist");
  cy.get(".btn.btn-default.check_out")
    .should("contain.text", "Proceed To Checkout")
    .click();
};

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

  it("should place order and register WHILE checkout", () => {
    cy.addToCart();
    cy.dismissCartModal();
    proceedToCheckout();
    cy.get('.modal-body a[href="/login"]')
      .should("contain.text", "Register / Login")
      .click();
    cy.createUser();
    proceedToCheckout();
    cy.get(".heading").eq(1).should("be.visible");
    cy.get(".btn.btn-default.check_out")
      .should("contain.text", "Place Order")
      .click();
    cy.get('[data-qa="name-on-card"]')
      .type("test name")
      .should("have.value", "test name");
    cy.get('[data-qa="card-number"]')
      .type("122333444455555")
      .should("have.value", "122333444455555");
    cy.get('[data-qa="cvc"]').type("123").should("have.value", "123");
    cy.get('[data-qa="expiry-month"]').type("10").should("have.value", "10");
    cy.get('[data-qa="expiry-year"]').type("2030").should("have.value", "2030");
    cy.get('[data-qa="pay-button"]').click();
    cy.get('[data-qa="order-placed"]').should("contain.text", "Order Placed!");
    cy.deleteUser();
  });

  it("should place order and REGISTER before checkout", () => {
    cy.navigateTo(" Signup / Login", "/login");
    cy.createUser();
    cy.addToCart();
    cy.dismissCartModal();
    proceedToCheckout();
    cy.get(".heading").eq(1).should("be.visible");
    cy.get(".btn.btn-default.check_out")
      .should("contain.text", "Place Order")
      .click();
    cy.get('[data-qa="name-on-card"]')
      .type("test name")
      .should("have.value", "test name");
    cy.get('[data-qa="card-number"]')
      .type("122333444455555")
      .should("have.value", "122333444455555");
    cy.get('[data-qa="cvc"]').type("123").should("have.value", "123");
    cy.get('[data-qa="expiry-month"]').type("10").should("have.value", "10");
    cy.get('[data-qa="expiry-year"]').type("2030").should("have.value", "2030");
    cy.get('[data-qa="pay-button"]').click();
    cy.get('[data-qa="order-placed"]').should("contain.text", "Order Placed!");
    cy.deleteUser();
  });

  it("should place order and LOGIN before checkout", () => {
    cy.navigateTo(" Signup / Login", "/login");
    cy.createUser();
    cy.addToCart();
    proceedToCheckout();
    cy.get(".heading").eq(1).should("be.visible");
    cy.get(".btn.btn-default.check_out")
      .should("contain.text", "Place Order")
      .click();
    cy.get('[data-qa="name-on-card"]')
      .type("test name")
      .should("have.value", "test name");
    cy.get('[data-qa="card-number"]')
      .type("122333444455555")
      .should("have.value", "122333444455555");
    cy.get('[data-qa="cvc"]').type("123").should("have.value", "123");
    cy.get('[data-qa="expiry-month"]').type("10").should("have.value", "10");
    cy.get('[data-qa="expiry-year"]').type("2030").should("have.value", "2030");
    cy.get('[data-qa="pay-button"]').click();
    cy.get('[data-qa="order-placed"]').should("contain.text", "Order Placed!");
    cy.deleteUser();
  });

  it("should remove products from cart", () => {
    cy.addToCart();
    cy.dismissCartModal();
    cy.navigateTo("Cart", "/view_cart").should("exist");
    cy.get(".cart_quantity_delete").click();
    cy.get("#empty_cart")
      .should("be.visible")
      .and("contain.text", "Cart is empty!");
  });
});
