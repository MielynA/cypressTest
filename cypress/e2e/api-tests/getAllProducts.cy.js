describe("testing API products and response statuses", () => {
  it("should test to get the id of the product", () => {
    cy.request("GET", "https://automationexercise.com/api/productsList").should(
      (response) => {
        console.log(response);
        expect(response.status).to.eq(200);
        expect(response.body).to.have.contains("id", 1);
      }
    );
  });

  it("should GET the content of the body", () => {
    cy.request("GET", "https://automationexercise.com/api/productsList").should(
      (response) => {
        expect(response.status).to.eq(200);

        const jsonParse = JSON.parse(response.body);
        expect(jsonParse.products).to.be.an("array").not.to.be.empty;

        expect(jsonParse).to.have.property("products");

        const firstProduct = jsonParse.products[0];

        expect(firstProduct).to.have.property("category");
        expect(firstProduct).to.have.property("price");
        expect(firstProduct).to.have.property("brand");
      }
    );
  });

  it("should POST to all the product list", () => {
    cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/productsList",
      failOnStatusCode: false,
    }).then((response) => {
      const bodyResponse = JSON.parse(response.body);
      expect(bodyResponse.responseCode).to.eq(405);
      expect(bodyResponse.message).to.eq(
        "This request method is not supported."
      );
    });
  });

});
