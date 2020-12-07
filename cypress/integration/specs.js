const { createYield } = require("typescript");

describe('dog-manager', () => {
    it('loads', () => {
        cy.visit('/');
        cy.get('h3').contains('Choose a breed');
    });
});