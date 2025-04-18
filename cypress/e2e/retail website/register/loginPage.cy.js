import "cypress-file-upload";

describe("Login user", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com");
  });

  it("should login user with correct email and password", () => {
    cy.clickLoginMenu();
    cy.createUser();
    cy.contains("Delete Account").click();
    cy.contains("Account Deleted!").should("be.visible");
    cy.clickContinue();
  });

  it("should login user with incorrect email and password", () => {
    cy.clickLoginMenu();
    cy.get('[data-qa="login-email"]').type("testwrong@example.com");
    cy.get('[data-qa="login-password"]').type("testWrong");
    cy.get('[data-qa="login-button"]').click();
    cy.get("p")
      .contains("Your email or password is incorrect!")
      .should("be.visible");
  });

  it("successfully login and logout user", () => {
    cy.clickLoginMenu();
    cy.validLoginUser();
    cy.logoutUser();
  });

  it("should NOT register existing email", () => {
    cy.clickLoginMenu();
    cy.get('[data-qa="signup-name"]').type("Mietest");
    cy.get('[data-qa="signup-email"]').type("testUsers2272025+3@example.com");
    cy.get('[data-qa="signup-button"]').click();
    cy.contains("Email Address already exist!").should("be.visible");
  });
});
