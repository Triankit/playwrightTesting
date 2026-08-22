import { Page } from "@playwright/test";

export const getNavigationModalPage = (page: Page) => {
	const locators = {
		myAccount: page.locator(".dropdown", { hasText: "My Account" }),
		registerLoginOption: (action: string) =>
			page.getByRole("link", { name: action }),
	};

	const clickOnMyAccount = async () => {
		await locators.myAccount.click();
	};

	const clickOnRegisterLogin = async (action: string) => {
		await locators.registerLoginOption(action).click();
	};

	return {
		...locators,
		clickOnMyAccount,
		clickOnRegisterLogin,
	};
};

export type NavigationModalPage = ReturnType<typeof getNavigationModalPage>;
