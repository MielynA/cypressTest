Cypress.Commands.add("apiRequest", (method, url, options = {}) => {
  return cy
    .request({ method, url, failOnStatusCode: false, ...options })
    .then((response) => {
      const parseBody =
        typeof response.body === "string"
          ? JSON.parse(response.body)
          : response.body;
      return { ...response, parseBody };
    });
});

Cypress.Commands.add("createUserAccountAPI", (email) => {
  return cy.apiRequest(
    "POST",
    "https://automationexercise.com/api/createAccount",
    {
      body: {
        name: "MieApi",
        email,
        password: "PasswordAPI",
        title: "Miss",
        birth_date: "10",
        birth_month: "Jan",
        birth_year: "1990",
        firstname: "Mie",
        lastname: "Acosta",
        company: "test",
        address1: "test",
        address2: "test",
        country: "Unites States",
        zipcode: "11123",
        state: "Texas",
        city: "Houston",
        mobile_number: "123-456-5567",
      },
      form: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
});
