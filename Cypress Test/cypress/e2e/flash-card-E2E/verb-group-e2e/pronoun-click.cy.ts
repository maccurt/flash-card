describe('Name of the group', () => {

    before(() => {
        cy.visit('/verb-group/1');        
    })

    describe('clicking each pronoun should contain the verb acertar conjugated correctly', () => {

        //1st
        it('first person singular', () => {
            cy.getDataTestId('present-tense').getDataTestId('fps-radio').click();
            cy.getDataTestId('sentence-0').should('contain','acierto')            
        
        });
        it('first person plurual', () => {
            cy.getDataTestId('present-tense').getDataTestId('fpp-radio').click();
            cy.getDataTestId('sentence-0').should('contain','acertamos')            
        });

        //2nd
        it('2nd person singular', () => {
            cy.getDataTestId('present-tense').getDataTestId('sps-radio').click();
            cy.getDataTestId('sentence-0').should('contain','aciertas')            
        });
        it('2nd person plural', () => {
            cy.getDataTestId('present-tense').getDataTestId('spp-radio').click();
            cy.getDataTestId('sentence-0').should('contain','acertáis')            
        });

        //3rd
        it('third person plural', () => {
            cy.getDataTestId('present-tense').getDataTestId('tps-radio').click();
            cy.getDataTestId('sentence-0').should('contain','acierta')            
        });

        it('third person singular', () => {
            cy.getDataTestId('present-tense').getDataTestId('tpp-radio').click();
            cy.getDataTestId('sentence-0').should('contain','aciertan')            
        });        
    });
});