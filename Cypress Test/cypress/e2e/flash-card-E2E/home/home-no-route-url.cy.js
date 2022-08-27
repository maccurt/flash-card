/// <reference types="cypress" />

describe('home-no-route-url', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  })

  it('url should include home', () => {
    cy.url().should('include', 'home');
  });

})