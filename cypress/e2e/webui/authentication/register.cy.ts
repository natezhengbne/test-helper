
const LOGIN_PAGE = "/my-account";

const generateRandomEmail = () => `${Math.trunc(Math.random() * 100000)}@new.com`;
const VALID_PASSWORD = "A123456789_B";

describe("new user", () => {
	context("signup successfully", () => {
		it("can finish the signup process", () => {
			cy.visit(LOGIN_PAGE);

			cy.get("input#loginRegisterEmail_email").type(generateRandomEmail());
			cy.get("[data-id=loginRegisterEmail_submit]").click();

			cy.get("input#signup_form_password").type(VALID_PASSWORD);
			cy.get("input#signup_form_firstname").type("First");
			cy.get("input#signup_form_lastname").type("Last");

			cy.get("[data-id=htmlControlContainer_wrapper_signup_form_dob]")
				.click()
				.get("select#day").select("01")
				.get("select#month").select("01")
				.get("select#year").select("2005");

			cy.get("input#autocomplete").type("1 Queen Street, VIC")
				.get("[data-id=addressAutoComplete_suggestion]")
				.first()
				.click();

			cy.get("input#signup_form_phone").type("0400000000");

			cy.get("label#checkboxField_signup_form_agree").click();

			cy.get("[data-id=signup_form_submitButton]").click();

			cy.get("[data-id=myAccountPage_pageHeader]").should("be.visible");
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
