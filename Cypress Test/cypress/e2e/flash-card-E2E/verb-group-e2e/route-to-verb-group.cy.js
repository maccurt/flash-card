/// <reference types="cypress" />

describe('route to verb-group', () => {
    before(() => {
      cy.visit('/verb-group/1');      
    })
  
    it('the url should contain the correct route', () => {
      cy.url().should('include', 'verb-group/1');
    });
  
    // it('should be more than one .verb-group', () => {
    //   cy.get('.verb-group').its('length').should("be.greaterThan", 1);
    //   //cy.get('.verb-group').its('length').should("eq",5);
    // });
  })