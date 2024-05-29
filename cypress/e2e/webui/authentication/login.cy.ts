import { createUser } from "../login.selector";
import {
	DEFAULT_VALID_PASSWORD,
	EXISTING_EMAIL,
	LOGIN_PAGE,
} from "../constants";

describe("exist user", () => {
	context("login successfully", () => {
		it.only("can finish login process", () => {
			cy.visit(LOGIN_PAGE);
			createUser({
				user: {
					email: EXISTING_EMAIL,
				},
				options: {
					logoutAfterSignup: true,
				},
			});

            cy.url().then(url => {
                if (!url.includes(LOGIN_PAGE)) {
                    cy.visit(LOGIN_PAGE);
                } else {
                    cy.reload();
                }

            });

			cy.get("input#loginRegisterEmail_email").type(EXISTING_EMAIL);

			cy.get("[data-id=loginRegisterEmail_submit]").click();

			cy.get("input#LoginRegister_Login_password").type(DEFAULT_VALID_PASSWORD);

			cy.get("[data-id=LoginRegister_Login_submitButton]").click();

			cy.get("[data-id=myAccountPage_pageHeader]").should("be.visible");
		});
	});

	context("but typo email", () => {
		it("can redirect to login page when correct the email", () => {
			cy.visit(LOGIN_PAGE);

			cy.get("input#loginRegisterEmail_email").type(EXISTING_EMAIL);
			cy.get("[data-id=loginRegisterEmail_submit]").click();
		});
	});
});
