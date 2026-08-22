import { Page } from "@playwright/test";

export const getAlertModalPage = (page: Page) => {
	const locator = {
		errorFirstName: page.locator("#error-firstname"),
		errorLastName: page.locator("#error-lastname"),
		errorEmail: page.locator("#error-email"),
		errorPassword: page.locator("#error-password"),
	};

	return {
		...locator,
	};
};

export type AlertModalPage = ReturnType<typeof getAlertModalPage>;
