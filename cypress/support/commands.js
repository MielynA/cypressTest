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
