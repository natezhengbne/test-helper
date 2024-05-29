import { createUser, loginDataId, registerDataId } from "../login.selector";
import { LOGIN_PAGE } from "../constants";

describe("new user", () => {
	context("signup successfully", () => {
		it("can finish the signup process", () => {
			cy.visit(LOGIN_PAGE);
			createUser();
		});
	});

	context("email suggestion", () => {
		it("can display and select the suggestion", () => {
			cy.visit(LOGIN_PAGE);
			cy.getByDataId(loginDataId.email).type("xxxx@gnail.com");
			cy.getByDataId(loginDataId.continueButton).click();

			cy.getByDataId(loginDataId.typoSuggestion)
				.contains("xxxx@gmail.com")
				.click();
			cy.getByDataId(registerDataId.email).should(
				"have.value",
				"xxxx@gmail.com"
			);
		});

		it("can ignore the suggestion", () => {
			cy.visit(LOGIN_PAGE);
			cy.getDataId(loginDataId.email).type("xxxx@gnail.com");
			cy.getByDataId(loginDataId.continueButton).click();

			cy.getByDataId(loginDataId.typoSuggestion).contains("xxxx@gmail.com");
			cy.getByDataId(loginDataId.continueButton).click();

			cy.getByDataId(registerDataId.email).should(
				"have.value",
				"xxxx@gnail.com"
			);
		});
	});
});
