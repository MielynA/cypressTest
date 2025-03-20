// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add("login", (email, password) => {
//   cy.visit("/login");
//   cy.get("#email").type(email);
//   cy.get("#password").type(password);
//   cy.get('button[type="submit"]').click();
// });
Cypress.Commands.add("accessUrl", () => {
  cy.visit("http://automationexercise.com");
});

Cypress.Commands.add("navigateTo", (menuText, directedToPath) => {
  cy.get(".navbar-nav")
    .contains(menuText)
    .should("have.attr", "href", directedToPath)
    .click();

  cy.url().should("include", directedToPath);
});

Cypress.Commands.add("randomSelect", (selector) => {
  cy.get(selector)
    .find("option")
    .then(($options) => {
      const values = $options
        .map((_, el) => el.value)
        .get()
        .filter(Boolean);
      console.log(values);
      const randomIndex = Math.floor(Math.random() * values.length);
      const randomValue = values[randomIndex];
      cy.get(selector).select(randomValue.toString());
    });
});

Cypress.Commands.add(
  "fillform",
  (firstName, lastName, address, country, state, city, zipcode, phone) => {
    cy.get(".form-group");
    cy.get('[data-qa="first_name"]').type(firstName);
    cy.get('[data-qa="last_name"]').type(lastName);
    cy.get('[data-qa="address"]').type(address);
    cy.get('[data-qa="country"]').select(country);
    cy.get('[data-qa="state"]').type(state);
    cy.get('[data-qa="city"]').type(city);
    cy.get('[data-qa="zipcode"]').type(zipcode);
    cy.get('[data-qa="mobile_number"]').type(phone);
  }
);

Cypress.Commands.add("clickContinue", () => {
  cy.get('[data-qa="continue-button"]').click();
});

Cypress.Commands.add("clickLoginMenu", () => {
  cy.get(".navbar-nav").should("be.visible");
  cy.get('a[href="/login"]').should("contain", "Signup / Login").click();
  cy.url().should("include", "/login");
});

Cypress.Commands.add("createUser", () => {
  cy.get(".signup-form").should("be.visible");
  const timestamp = new Date(Date.now())
    .toLocaleDateString("en-US")
    .replace(/\//g, "");

  let uniqueName = `testUsers_${timestamp}`;
  let emailAdd = `testUsers${timestamp}+16@example.com`;

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
  cy.get('[data-qa="continue-button"]').click();
  cy.get(".navbar-nav").contains("Logged in as " + uniqueName);
});

Cypress.Commands.add("validLoginUser", () => {
  cy.get('[data-qa="login-email"]').type("testUsers2272025+8@example.com");
  cy.get('[data-qa="login-password"]').type("Password123");
  cy.get('[data-qa="login-button"]').click();
  cy.get(".navbar-nav")
    .contains("Logged in as testUsers_2272025")
    .should("be.visible");
});

Cypress.Commands.add("deleteUser", () => {
  cy.contains("Delete Account").click();
  cy.contains("Account Deleted!").should("be.visible");
  cy.clickContinue();
});

Cypress.Commands.add("logoutUser", () => {
  cy.contains("Logout").click();
  cy.url().should("eq", "https://automationexercise.com/login");
});

Cypress.Commands.add("submitButton", () => {
  cy.get('[data-qa="submit-button"]').click();
  cy.get(".status").should(
    "have.text",
    "Success! Your details have been submitted successfully."
  );
  cy.contains("Home").click();
  cy.url().should("eq", "https://automationexercise.com/");
});

Cypress.Commands.add("dismissCartModal", () => {
  cy.get(".modal-content").should("be.visible");
  cy.get('[data-dismiss="modal"]')
    .should("contain.text", "Continue Shopping")
    .click();
});

Cypress.Commands.add("addToCart", () => {
  cy.get(".single-products").first().trigger("mouseover");
  cy.get("a.btn.btn-default.add-to-cart").should("be.visible").first().click();
});
