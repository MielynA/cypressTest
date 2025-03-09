export const validateFooter = () => {
  cy.scrollTo("bottom");
  cy.get(".single-widget").should("be.visible");
};
