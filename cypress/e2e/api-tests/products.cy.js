describe("testing API products and response statuses", () => {
  it("should test to get the id of the product", () => {
    cy.apiRequest(
      "GET",
      "https://automationexercise.com/api/productsList"
    ).then(({ status, parseBody }) => {
      expect(status).to.be.eq(200);
      expect(parseBody).to.have.property("products");
      expect(parseBody.products[0]).to.have.property("id");
    });
  });

  it("should GET the content of the body", () => {
    cy.apiRequest(
      "GET",
      "https://automationexercise.com/api/productsList"
    ).then(({ status, parseBody }) => {
      expect(status).to.be.eq(200);
      expect(parseBody.products).to.be.an("array").not.to.be.empty;
      expect(parseBody).to.have.property("products");
      const firstProduct = parseBody.products[0];
      expect(firstProduct).to.have.property("category");
      expect(firstProduct).to.have.property("price");
      expect(firstProduct).to.have.property("brand");
    });
  });

  it("should POST to all the product list", () => {
    cy.apiRequest(
      "POST",
      "https://automationexercise.com/api/productsList"
    ).then(({ parseBody }) => {
      expect(parseBody.responseCode).to.be.eq(405);
      expect(parseBody.message).to.eq("This request method is not supported.");
    });
  });

  it("should GET all brand list", () => {
    cy.apiRequest("GET", "https://automationexercise.com/api/brandsList").then(
      ({ status, parseBody }) => {
        expect(status).to.be.eq(200);
        expect(parseBody).to.have.property("brands");
      }
    );
  });
});
