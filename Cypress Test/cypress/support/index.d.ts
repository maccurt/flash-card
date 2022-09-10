declare namespace Cypress {
    interface Chainable {

        getTestId(id: string): Chainable<JQuery<HTMLElementTagNameMap>>;
        conjugationCard(dataTestId: string, conjugation: string[]);
    }
}
