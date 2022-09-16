describe('conjugation pronoun', () => {

    before(() => {
        cy.visit('/verb-group/1');
    });

    describe('all the options should exist', () => {

        it('first person singular option should exist and have value of 1', () => {
            cy.getDataTestId('present-tense').getDataTestId('fps-radio')
                .should('exist')
                .should('have.attr', 'value', '1');
        });

        it('first person plural option should exist and have value of 2 ', () => {
            cy.getDataTestId('present-tense').getDataTestId('fpp-radio')
                .should('exist')
                .should('have.attr', 'value', '2');
        });

        it('second person singular option should exist and value of 3', () => {
            cy.getDataTestId('present-tense').getDataTestId('sps-radio')
                .should('exist')
                .should('have.attr', 'value', '3');
        });

        it('second person plural option should exist', () => {
            cy.getDataTestId('present-tense').getDataTestId('spp-radio')
                .should('exist')
                .should('have.attr', 'value', '4');
        });

        it('third person singular option should exist and value of 5 ', () => {
            cy.getDataTestId('present-tense').getDataTestId('tps-radio')
                .should('exist')
                .should('have.attr', 'value', '5');
        });

        it('third person plural option should exist and value of 6', () => {
            cy.getDataTestId('present-tense').getDataTestId('tpp-radio')
                .should('exist')
                .should('have.attr', 'value', '6');
        });
    });
});


