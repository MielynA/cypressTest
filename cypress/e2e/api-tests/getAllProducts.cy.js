describe("testing API products", () => {
  it("should test to get all the products", () => {
    cy.request("GET", "https://automationexercise.com/api/productsList").should(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.contains("id", 1);
      }
    );
  });
});
