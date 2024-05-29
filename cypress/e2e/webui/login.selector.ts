import { DEFAULT_VALID_PASSWORD } from "./constants";
import { UserForm } from "./types";

export const generateRandomEmail = () =>
	`${Math.trunc(Math.random() * 1000000)}@new.com`;

type CreateUserProps = {
	user?: UserForm;
	options?: {
		logoutAfterSignup?: boolean;
	};
};

export const createUser = ({ user, options }: CreateUserProps = {}) => {
    cy.intercept("POST", "check-email").as("check-email");

	const email = user?.email ?? generateRandomEmail();
	cy.get("input#loginRegisterEmail_email").type(email);
	cy.contains("button", "Continue").click();
    cy.wait("@check-email").its("response.statusCode").should("eq", 200);

	cy.get("body").then(($body) => {
		const shouldSignup =
			$body.find("[data-id=htmlInput_signup_form_email]").length > 0;
		if (shouldSignup) {
			cy.get("input#signup_form_password").type(DEFAULT_VALID_PASSWORD);
			cy.get("input#signup_form_firstname").type(user?.firstName ?? "Rocky");
			cy.get("input#signup_form_lastname").type(user?.lastName ?? "Balboa");

			cy.get("[data-id=htmlControlContainer_wrapper_signup_form_dob]")
				.click()
				.get("select#day")
				.select(user?.birthday?.day ?? "01")
				.get("select#month")
				.select(user?.birthday?.month ?? "01")
				.get("select#year")
				.select(user?.birthday?.year ?? "2005");

			cy.get("input#autocomplete")
				.type(user?.addressAutocomplete ?? "1 Queen Street, VIC")
				.get("[data-id=addressAutoComplete_suggestion]")
				.first()
				.click();

			cy.get("input#signup_form_phone").type("0400000000");

			// click it if present
			cy.get("label#checkboxField_signup_form_agree")
				.should((_) => {})
				.then(($checkbox) => {
					if ($checkbox.length) {
						cy.wrap($checkbox).click();
					}
				});

			cy.contains("button", "Create Account").click();

			if (options?.logoutAfterSignup) {
				return cy.contains("a", "Logout").click();
			} else {
				return cy
					.get("[data-id=myAccountPage_pageHeader]")
					.should("be.visible");
			}
		}

		return cy.log(`${email} already exists`);
	});

	return cy.log(`${email} able to login now`);
};
