import { createUser } from "../login.selector";
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
			cy.get("input#loginRegisterEmail_email").type("xxxx@gnail.com");
			cy.get("[data-id=loginRegisterEmail_submit]").click();
			cy.get("[data-id=emailTypoSuggestion]").contains("xxxx@gmail.com").click();

			cy.get("input#signup_form_email").should("have.value", "xxxx@gmail.com");
		});

		it("can ignore the suggestion", () => {
			cy.visit(LOGIN_PAGE);
			cy.get("input#loginRegisterEmail_email").type("xxxx@gnail.com");
			cy.get("[data-id=loginRegisterEmail_submit]").click();
			cy.get("[data-id=emailTypoSuggestion]").contains("xxxx@gmail.com");
			cy.get("[data-id=loginRegisterEmail_submit]").click();

			cy.get("input#signup_form_email").should("have.value", "xxxx@gnail.com");
		});
	})
});
