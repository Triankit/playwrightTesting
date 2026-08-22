import { Page } from "@playwright/test";

export const getLoginPage = (page: Page) => {
	const locators = {
		email: page.getByRole("textbox", { name: "E-Mail Address" }),
		password: page.getByRole("textbox", { name: "Password" }),
		loginButton: page.getByRole("button", { name: "Login" }),
		continueButton: page.getByRole("link", { name: "Continue" }),
	};

	const loginToAccount = async (email: string, password: string) => {
		await locators.email.fill(email);
		await locators.password.fill(password);
		await locators.loginButton.click();
	};

	async function clickOnContinue() {
		await locators.continueButton.click();
	}

	return {
		...locators,
		loginToAccount,
		clickOnContinue,
	};
};

export type LoginPage = ReturnType<typeof getLoginPage>;
