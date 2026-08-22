import { Page } from "@playwright/test";

export const getAccountModal = (page: Page) => {
	const accountContainer = page.locator("#account-account");
	const locators = {
		myAccount: accountContainer.locator("#content", { hasText: "My Account" }),
	};
	return {
		...locators,
	};
};

export type AccountModal = ReturnType<typeof getAccountModal>;
