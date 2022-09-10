  
  Cypress.Commands.add('conjugationCard' as any, (dataTestId:string, conjugation:string[]) => {
  
    cy.getTestId(dataTestId).as('conjugation-card');
    cy.get('@conjugation-card').getTestId('first-person-singular').should('contain.text', conjugation[0]);
    cy.get('@conjugation-card').getTestId('second-person-singular').should('contain.text', conjugation[1]);
    cy.get('@conjugation-card').getTestId('third-person-singular').should('contain.text', conjugation[2]);
  
    cy.get('@conjugation-card').getTestId('first-person-plural').should('contain.text', conjugation[3]);
    cy.get('@conjugation-card').getTestId('second-person-plural').should('contain.text', conjugation[4]);
    cy.get('@conjugation-card').getTestId('third-person-plural').should('contain.text', conjugation[5]);
  
  })