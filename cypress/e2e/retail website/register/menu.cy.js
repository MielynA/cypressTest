import "cypress-file-upload";

describe("Testing menu bar of the automation website", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com");
    cy.clickLoginMenu();
  });

  it("should send and upload in contact us form", () => {
    cy.contains("Contact us").click();
    cy.get("div.contact-form").contains("Get In Touch").should("be.visible");
    cy.get('[data-qa="name"]').type("testMie");
    cy.get('[data-qa="email"]').type("testMie@email.com");
    cy.get('[data-qa="message"]').type("this is body message test");
    cy.get('input[type="file"]').attachFile("example.json");
    cy.submitButton();
  });

  it("should verify test cases menu", () => {
    cy.contains("Test Cases").click();
    cy.url().should("eq", "https://automationexercise.com/test_cases");
    cy.get(".panel-group").each(($el) => {
      cy.wrap($el).click().should("be.visible");
    });
  });
});
