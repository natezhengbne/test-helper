import { DEFAULT_VALID_PASSWORD } from "./constants";
import { RegisterUserForm } from "./types";

export const generateRandomEmail = () =>
	`${Math.trunc(Math.random() * 1000000)}@random-email.com`;

/**
 * behaviour:
 *  - type the email
 *  - hit the Continue button
 * @param email type email to see if it is a new one or existing one
 */
export const checkEmail = (email: string) => {
	cy.getByDataId(loginDataId.email).type(email);
	cy.getByDataId(loginDataId.continueButton).click();
}

type CreateUserProps = {
	user?: RegisterUserForm;
	options?: {
		logoutAfterSignup?: boolean;
	};
};

export const createUser = ({ user, options }: CreateUserProps = {}) => {
	cy.intercept("POST", "check-email").as("check-email");

	const email = user?.email ?? generateRandomEmail();
	checkEmail(email);
	cy.wait("@check-email").its("response.statusCode").should("eq", 200);

	cy.get("body").then(($body) => {
		const shouldSignup =
			$body.find(`[data-id=${registerDataId.email}]`).length > 0;
		if (shouldSignup) {
			cy.getByDataId(registerDataId.password).type(DEFAULT_VALID_PASSWORD);
			cy.getByDataId(registerDataId.firstName).type(user?.firstName ?? "Rocky");
			cy.getByDataId(registerDataId.lastName).type(user?.lastName ?? "Rocket");

			cy.getByDataId(registerDataId.dob)
				.click()
				.get("select#day")
				.select(user?.birthday?.day ?? "01")
				.get("select#month")
				.select(user?.birthday?.month ?? "01")
				.get("select#year")
				.select(user?.birthday?.year ?? "2005");

			cy.getByDataId(registerDataId.addressAutocomplete)
				.type(user?.addressAutocomplete ?? "1 Queen Street, VIC")
				.getByDataId(registerDataId.addressSuggestion)
				.first()
				.click();

			cy.getByDataId(registerDataId.phone).type("0400000000");

			// click it if present
			cy.get("label#checkboxField_signup_form_agree")
				.should((_) => {})
				.then(($checkbox) => {
					if ($checkbox.length) {
						cy.wrap($checkbox).click();
					}
				});

			cy.getByDataId(registerDataId.submitButton).click();

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

export const loginDataId = {
	email: "htmlInput_loginRegisterEmail_email",
	password: "htmlInput_LoginRegister_Login_password",
	typoSuggestion: "emailTypoSuggestion_emailCorrectionSuggestionLink",
	continueButton: "loginRegisterEmail_submit",
	loginButton: "LoginRegister_Login_submitButton",
}

export const registerDataId = {
	email: "htmlInput_signup_form_email",
	password: "htmlInput_signup_form_password",
	firstName: "htmlInput_signup_form_firstname",
	lastName: "htmlInput_signup_form_lastname",
	dob: "htmlControlContainer_wrapper_signup_form_dob",
	addressAutocomplete: "htmlInput_autocomplete",
	addressSuggestion: "addressAutoComplete_suggestion",
	phone: "htmlInput_signup_form_phone",
	submitButton: "signup_form_submitButton",
};
