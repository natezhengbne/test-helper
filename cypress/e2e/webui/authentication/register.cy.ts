import { checkEmail, userSignup, generateRandomEmail, loginDataId, registerDataId } from "../login.selector";
import { LOGIN_PAGE } from "../constants";

describe("new user", () => {
    context("signup successfully", () => {
        it("can finish the signup process", () => {
            const email = generateRandomEmail();
            cy.visit(LOGIN_PAGE);
            checkEmail(email);
            userSignup();
        });
    });

    context("email suggestion", () => {
        beforeEach(() => {
            cy.visit(LOGIN_PAGE);
            checkEmail("xxxx@gnail.com");
        });

        it("can display and select the suggestion", () => {
            cy.getByDataId(loginDataId.typoSuggestion).contains("xxxx@gmail.com").click();
            cy.getByDataId(registerDataId.email).should("have.value", "xxxx@gmail.com");
        });

        it("can ignore the suggestion", () => {
            cy.getByDataId(loginDataId.typoSuggestion).contains("xxxx@gmail.com");
            cy.getByDataId(loginDataId.continueButton).click();

            cy.getByDataId(registerDataId.email).should("have.value", "xxxx@gnail.com");
        });
    });
});
