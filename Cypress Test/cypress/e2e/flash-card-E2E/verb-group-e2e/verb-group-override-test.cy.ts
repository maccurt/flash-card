describe('irregular verb', () => {

    before(() => {
        cy.visit('verb-group/2');
    });

    beforeEach(() => {
        cy.getTestId('present-tense').as('present-tense');
      
    })

    describe('defender congjugation card', () => {                
        

        it('present tense is correct', () => {
            cy.conjugationCard('present-tense', ['defiendo', 'defiendes', 'defiende', 'defendemos', 'defendéis', 'defienden'])
        });

        it('preterite tense  is correct', () => {
            cy.conjugationCard('preterite', ['defendí', 'defendiste', 'defendió', 'defendimos', 'defendisteis', 'defendieron'])
        });        
    });
});