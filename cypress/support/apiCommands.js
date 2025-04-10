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
