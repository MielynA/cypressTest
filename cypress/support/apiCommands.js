Cypress.Commands.add("apiRequest", (method, url, options = {}) => {
  return cy
    .request({ method, url, failOnStatusCode: false, ...options })
    .then((response) => {
      const parseBody = JSON.parse(response.body);
      return { ...response, parseBody };
    });
});
