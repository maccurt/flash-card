/// <reference types="cypress" />

describe('route to verb-group-list from menu click', () => {
  before(() => {
    cy.visit('/')
    cy.get('#verb-group-list-route').click();
  })

  it('the route verb-group-list is included in url', () => {
    cy.url().should('include', 'verb-group-list');
  });

  it('should be more than one .verb-group', () => {
    cy.get('.verb-group').its('length').should("be.greaterThan", 1);
    //cy.get('.verb-group').its('length').should("eq",5);
  });
})