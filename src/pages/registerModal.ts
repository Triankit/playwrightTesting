import { Page } from "@playwright/test";
export const getRegisterModal = (page: Page) => {
	const locators = {
		firstName: page.getByRole("textbox", { name: "First Name" }),
		lastName: page.getByRole("textbox", { name: "Last Name" }),
		email: page.getByRole("textbox", { name: "E-Mail" }),
		password: page.getByRole("textbox", { name: "Password" }),
		newsletterRadio: page.locator("#input-newsletter"),
		agreePolicy: page.locator('input[name="agree"]'),
		continueButton: page.getByRole("button", { name: "Continue" }),
		registerBreadcrum: page.locator(".breadcrumb", { hasText: "Register" }),
		getBreadCurmPage: (item: string) =>
			page.locator(".breadcrumb", { hasText: item }),
		pageContent: page.locator("#content"),
	};

	const fillPersonalDetail = async (
		firstName: string,
		lastName: string,
		email: string,
		password: string,
	) => {
		await locators.firstName.fill(firstName);
		await locators.lastName.fill(lastName);
		await locators.email.fill(email);
		await locators.password.fill(password);
	};

	async function clickOnContinue() {
		await locators.continueButton.click();
	}

	async function subscribeToNewsletter() {
		await locators.newsletterRadio.click();
	}

	async function agreeToPolicy() {
		await locators.agreePolicy.click();
	}

	async function fillEmail(email: string) {
		await locators.email.fill(email);
	}

	async function fillPassword(password: string) {
		await locators.password.fill(password);
	}
	return {
		...locators,
		fillPersonalDetail,
		clickOnContinue,
		subscribeToNewsletter,
		agreeToPolicy,
		fillEmail,
		fillPassword,
	};
};

export type RegisterModal = ReturnType<typeof getRegisterModal>;
