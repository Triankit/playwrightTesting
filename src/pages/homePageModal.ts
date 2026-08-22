import { Page } from "@playwright/test";

export const getHomePageModal = (page: Page) => {
	const locators = {
		cartLogo: page.getByRole("img", { name: "Your Store" }),
	};

	async function clickOnCartLogo() {
		await locators.cartLogo.click();
	}

	return {
		...locators,
		clickOnCartLogo,
	};
};

export type HomePageModal = ReturnType<typeof getHomePageModal>;
