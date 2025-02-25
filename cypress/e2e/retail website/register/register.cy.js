//Register User

describe("Register user", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com");
  });

  it("verify home page successfully", () => {
    cy.url("https://automationexercise.com/").should(
      "eq",
      "https://automationexercise.com/"
    );
  });
  it("should have the correct page title", () => {
    cy.title().should("eq", "Automation Exercise");
  });

  it("should successfully click signup/login button", () => {
    cy.clickLoginMenu();
  });

  it("should verify new sign up is visible", () => {
    cy.get(".navbar-nav").should("be.visible");
    cy.get('a[href="/login"]').should("contain", "Signup / Login").click();
    cy.url().should("include", "/login");
    cy.get(".signup-form").should("be.visible");
  });

  it("should enter name and email address", () => {
    cy.clickLoginMenu();
    cy.createUser();
    cy.contains("Delete Account").click();
    cy.contains("Account Deleted!").should("be.visible");
    cy.clickContinue();
  });
});
