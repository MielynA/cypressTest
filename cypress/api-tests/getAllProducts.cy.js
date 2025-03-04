cy.request("GET", "https://automationexercise.com/api/productsList").should(
  (Response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property("id", 1);
  }
);
