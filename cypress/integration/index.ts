describe('My First Test', () => {
  it('Visits the Cypress.io page and checks the title', () => {
    cy.visit('https://www.cypress.io')
    cy.title().should('include', 'Cypress')
  })
})
