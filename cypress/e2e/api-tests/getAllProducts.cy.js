describe("testing API products and response status to 200", () => {
  it("should test to get the id of the product", () => {
    cy.request("GET", "https://automationexercise.com/api/productsList").should(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.contains("id", 1);
      }
    );
  });
});
