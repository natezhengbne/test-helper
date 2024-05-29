import {
	createUser,
	generateRandomEmail,
	loginPageEmailField,
	loginPagePasswordField,
} from "../login.selector";
import {
	DEFAULT_VALID_PASSWORD,
	EXISTING_EMAIL,
	LOGIN_PAGE,
} from "../constants";

describe("exist user", () => {
	beforeEach(() => {
		// create user for testing
		cy.visit(LOGIN_PAGE);
		createUser({
			user: {
				email: EXISTING_EMAIL,
			},
			options: {
				logoutAfterSignup: true,
			},
		});

		cy.url().then((url) => {
			if (!url.includes(LOGIN_PAGE)) {
				cy.visit(LOGIN_PAGE);
			} else {
				cy.reload();
			}
		});
	});

	context("login success", () => {
		it("can finish login process", () => {
			cy.get(loginPageEmailField).type(EXISTING_EMAIL);
			cy.contains("button", "Continue").click();

			cy.get(loginPagePasswordField).type(DEFAULT_VALID_PASSWORD);
			cy.contains("button", "Login").click();

			cy.get("[data-id=myAccountPage_pageHeader]").should("be.visible");
			cy.contains("a", "Logout").click();
		});
	});

	context("but typo email", () => {
		it("can redirect to login page when correct the email", () => {
			cy.get("input#loginRegisterEmail_email").type(generateRandomEmail());
			cy.get("[data-id=loginRegisterEmail_submit]").click();

			cy.get("input#signup_form_email")
				.should("be.visible")
				.clear()
				.type(EXISTING_EMAIL)
				.blur();

			cy.get("input#LoginRegister_Login_password")
				.should("be.visible")
				.type(DEFAULT_VALID_PASSWORD);

			cy.get("[data-id=LoginRegister_Login_submitButton]").click();

			cy.get("[data-id=myAccountPage_pageHeader]").should("be.visible");
		});
	});
});
