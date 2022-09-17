describe('Name of the group', () => {

    before(() => {
        cy.visit('/verb-group/1');
    })

    describe('Name of the group', () => {

        it('first person singular option should exist and have value of 1', () => {
            cy.getDataTestId('present-tense').getDataTestId('fpp-radio').click();
                
        });

    });

});