import {
	createUser,
	generateRandomEmail,
	loginDataId,
	registerDataId,
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
			cy.getByDataId(loginDataId.email).type(EXISTING_EMAIL);
			cy.getByDataId(loginDataId.continueButton).click();

			cy.get(loginDataId.password).type(DEFAULT_VALID_PASSWORD);
			cy.getByDataId(loginDataId.loginButton).click();

			cy.get("[data-id=myAccountPage_pageHeader]").should("be.visible");
			cy.contains("a", "Logout").click();
		});
	});

	context("but typo email", () => {
		it("can redirect to login page when correct the email", () => {
			cy.getByDataId(loginDataId.email).type(generateRandomEmail());
			cy.getByDataId(loginDataId.continueButton).click();

			cy.getByDataId(registerDataId.email)
				.should("be.visible")
				.clear()
				.type(EXISTING_EMAIL)
				.blur();

			cy.get(loginDataId.password)
				.should("be.visible")
				.type(DEFAULT_VALID_PASSWORD);

			cy.getByDataId(loginDataId.loginButton).click();

			cy.get("[data-id=myAccountPage_pageHeader]").should("be.visible");
		});
	});
});
