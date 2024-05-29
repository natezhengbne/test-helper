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
	const email = user?.email ?? generateRandomEmail();
	cy.get("input#loginRegisterEmail_email").type(email);
	cy.get("[data-id=loginRegisterEmail_submit]").click();

	cy.get("body").then(($body) => {
		if ($body.find("input#LoginRegister_Login_password").length > 0) {
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

			cy.get("label#checkboxField_signup_form_agree").click();

			cy.get("[data-id=signup_form_submitButton]").click();

			cy.get("[data-id=myAccountPage_pageHeader]").should("be.visible");

			if (options?.logoutAfterSignup) {
				cy.get("li#summarySubNavigation_logout").children().first().click();
			}
		}
	});
};
