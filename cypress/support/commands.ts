/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
export {};
declare global {
	namespace Cypress {
		interface Chainable {
			getByDataId(dataId: string): Chainable<JQuery<Element>>;
		}
	}
}

Cypress.Commands.overwrite(
	"visit",
	(originalFn: any, url: any, options?: Cypress.VisitOptions) => {
		if (Cypress.config().baseUrl?.includes("staging")) {
			return originalFn(url, {
				...options,
				auth: {
					username: "lotto",
					password: "qweiop",
				},
			});
		}
		return originalFn(url, options);
	}
);

Cypress.Commands.add("getByDataId", (dataId: string) => {
	return cy.get(`[data-id=${dataId}]`);
});
