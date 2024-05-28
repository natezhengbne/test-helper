


describe("exist user", () => {
    context("login successfully", () => {
        it("can finish login process", () => {

        });
    })

    context("typo an nonexisting email", () => {
        it("can redirect to login page when the email is correct", () => {
            cy.visit("/my-account");

            cy.get("input#loginRegisterEmail_email").type("existing_email@email.com");
            cy.get("[data-id=loginRegisterEmail_submit]").click();

        });
    })
})