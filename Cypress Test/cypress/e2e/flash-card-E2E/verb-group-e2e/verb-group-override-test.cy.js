/// <reference types="cypress" />

describe('verb-group-override-test', () => {

    before(() => {
        cy.visit('verb-group/2');
    });

    beforeEach(() => {
        cy.getTestId('present-tense').as('present-tense');
    })

    describe('check defender to defend present-tense', () => {

        it('present tense should exist', () => {

            cy.get('@present-tense').should('have.length', 1);
            cy.get('@present-tense').getTestId('first-person-singular').should('have.length', 1);
            
            cy.get('@present-tense').getTestId('first-person-singular').should('have.text', 'defiendo');
            cy.get('@present-tense').getTestId('second-person-singular').should('have.text', 'defendemos');

            // cy.get('@present-tense').getTestId('first-person-singular').should('have.text', 'defiendes');
            // cy.get('@present-tense').getTestId('first-person-singular').should('have.text', 'defiende');


        });

    });

});