describe('verb-group-override-test', () => {

    before(() => {
        cy.visit('verb-group/3');
    });

    describe('click on caber', () => {
        before(() => {
            cy.getTestId('verb-list').getTestId('caber').click();
            
        })

        it('present tense is correct', () => {
            
            cy.conjugationCard('present-tense', ['quepo', 'cabes', 'cabe', 'cabemos', 'cabéis', 'caben']);
        });
    });


    describe('click on saber', () => {
        before(() => {
            cy.getTestId('verb-list').getTestId('saber').click();
        })

        it('present tense is correct', () => {            
            cy.conjugationCard('present-tense', ['sé', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben']);
        });
    });   

});