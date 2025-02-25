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

  it("login user with incorrect email and password", () => {
    cy.clickLoginMenu();
    cy.get('[data-qa="login-email"]').type("testwrong@example.com");
    cy.get('[data-qa="login-password"]').type("testWrong");
    cy.get('[data-qa="login-button"]').click();
    cy.get("p")
      .contains("Your email or password is incorrect!")
      .should("be.visible");
  });
});
