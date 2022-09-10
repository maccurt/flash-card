Cypress.Commands.add(
    'getTestId' as any,
    { prevSubject: 'optional' },
    (subject, id) => {
      if (subject) {
        return cy.wrap(subject).find(`[data-test-id="${id}"]`)
      }
      return cy.get(`[data-test-id="${id}"]`)
    },
  )
