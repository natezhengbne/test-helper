/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            getByDataId(dataId: string): Chainable<JQuery<Element>>;
        }
    }
}

Cypress.Commands.overwrite("visit", (originalFn: any, url: any, options?: Cypress.VisitOptions) => {
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
});

Cypress.Commands.add("getByDataId", (dataId: string) => {
    return cy.get(`[data-id=${dataId}]`);
});

export {};
