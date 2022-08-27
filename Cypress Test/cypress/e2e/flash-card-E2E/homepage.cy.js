/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  })

  it('should behave...', () => {

    cy.url().should('include', 'home');
  });

})
