describe("Login user", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com");
  });

  it("login user with correct email and password", () => {
    cy.clickLoginMenu();
    cy.createUser();
    cy.contains("Delete Account").click();
    cy.contains("Account Deleted!").should("be.visible");
    cy.clickContinue();
  });
});
