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
  it.skip("should have the correct page title", () => {
    cy.title().should("eq", "Automation Exercise");
  });

  it.skip("should successfully click signup/login button", () => {
    cy.get(".navbar-nav").should("be.visible");
    cy.get('a[href="/login"]').should("contain", "Signup / Login").click();
    cy.url().should("include", "/login");
  });

  it.skip("should verify new sign up is visible", () => {
    cy.get(".navbar-nav").should("be.visible");
    cy.get('a[href="/login"]').should("contain", "Signup / Login").click();
    cy.url().should("include", "/login");
    cy.get(".signup-form").should("be.visible");
  });

  it("should enter name and email address", () => {
    cy.get(".navbar-nav").should("be.visible");
    cy.get('a[href="/login"]').should("contain", "Signup / Login").click();
    cy.url().should("include", "/login");
    cy.get(".signup-form").should("be.visible");
    const timestamp = new Date(Date.now())
      .toLocaleDateString("en-US")
      .replace(/\//g, "");

    const uniqueName = `testUsers_${timestamp}`;
    const emailAdd = `testUsers${timestamp}+12@example.com`;

    cy.get('[data-qa="signup-name"]').type(uniqueName);
    cy.get('[data-qa="signup-email"]').type(emailAdd);
    cy.get('[data-qa="signup-button"]').click();
    cy.get(".login-form").contains("Enter Account Information"); //verify the account information page

    //verify without @in the email

    cy.get('.radio input[type="radio"]')
      .its("length")
      .then((count) => {
        const randomIndex = Math.floor(Math.random() * count);
        cy.get('.radio input[type="radio"]')
          .eq(randomIndex)
          .check({ force: true });
      });
    //Populate password
    cy.get('[data-qa="password"]').type("Password123");
    //random select of dropdown birthdate
    cy.randomSelect('[data-qa="days"]');
    cy.randomSelect('[data-qa="months"]');
    cy.randomSelect('[data-qa="years"]');

    //checkboxes
    cy.get("#newsletter").check();
    cy.get("#optin").check();

    //fill forms
    cy.fillform(
      "Mietest",
      "test",
      "123 houston texas",
      "United States",
      "Texas",
      "houston",
      "11123",
      "123-456-5567"
    );
    cy.get('[data-qa="create-account"]').click();
    cy.contains("Account Created").should("be.visible");
    cy.clickContinue();
    console.log(uniqueName);
    cy.get(".navbar-nav").contains("Logged in as " + uniqueName);
    cy.contains("Delete Account").click();
    cy.contains("Account Deleted!").should("be.visible");
    cy.clickContinue();
  });
});
