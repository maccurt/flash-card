/// <reference types="cypress" />

describe('verb-group-route-happy-path', () => {

    beforeEach(() => {

        cy.getBySel('verb-group-1').as('verbGroup')

    })

    before(() => {
        cy.visit('/verb-group/1')

    });

    it('verb group with an id of 1 should exist in the dom', () => {
        cy.getBySel('verb-group-1').should('exist');
    });

    it('the name should have the correct text', () => {

        cy.get('@verbGroup').getBySel('name').should(($div) => {
            expect($div.text().trim()).equal("Present Tense Stem Change -ar verbs");
        });
        
    });

    it('the description should have the correct text', () => {

        cy.get('@verbGroup').getBySel('description').should(($div) => {
            expect($div.text().trim()).equal("-ar stem-changing verbs vowel. e changes to ie.");
        });
    });
});