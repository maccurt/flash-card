// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//const cypress = require("cypress")

// Cypress.Commands.add('getBySel', (selector, ...args) => {
//   return cy.get(`[data-test-id=${selector}]`, {prevSubject:true})
//   //return cy.get(`[data-test-id=${selector}]`, ...args)
// });

Cypress.Commands.add(
  'getTestId',
  { prevSubject: 'optional' },
  (subject, id) => {
    if (subject) {
      return cy.wrap(subject).find(`[data-test-id="${id}"]`)
    }
    return cy.get(`[data-test-id="${id}"]`)
  },
)

Cypress.Commands.add('conjugationCard',(dataTestId,conjugation)=>{

  cy.getTestId(dataTestId).as('conjugation-card');
  cy.get('@conjugation-card').getTestId('first-person-singular').should('contain.text', conjugation[0]);
  cy.get('@conjugation-card').getTestId('second-person-singular').should('contain.text', conjugation[1]);
  cy.get('@conjugation-card').getTestId('third-person-singular').should('contain.text', conjugation[2]);

  cy.get('@conjugation-card').getTestId('first-person-plural').should('contain.text', conjugation[3]);
  cy.get('@conjugation-card').getTestId('second-person-plural').should('contain.text', conjugation[4]);
  cy.get('@conjugation-card').getTestId('third-person-plural').should('contain.text', conjugation[5]);

})