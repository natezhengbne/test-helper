import { checkEmail, userSignup, generateRandomEmail, loginDataId, registerDataId } from "../login.selector";
import { LOGIN_PAGE } from "../constants";

describe("new user", () => {
    context("signup successfully", () => {
        it("can finish with address autocomplete", () => {
            const email = generateRandomEmail();
            cy.visit(LOGIN_PAGE);
            checkEmail(email);
            userSignup();
        });
    });

    context("email suggestion", () => {
        const incorrectEmail = "xxx@gnail.com";
        const suggestedEmail = "xxx@gmail.com";

        beforeEach(() => {
            cy.visit(LOGIN_PAGE);
            checkEmail(incorrectEmail);
        });

        it("can display and select the suggestion", () => {
            cy.getByDataId(loginDataId.typoSuggestion).contains(suggestedEmail).click();
            cy.getByDataId(registerDataId.email).should("have.value", suggestedEmail);
        });

        it("can ignore the suggestion", () => {
            cy.getByDataId(loginDataId.typoSuggestion).contains(suggestedEmail);
            cy.getByDataId(loginDataId.continueButton).click();

            cy.getByDataId(registerDataId.email).should("have.value", incorrectEmail);
        });
    });
});
