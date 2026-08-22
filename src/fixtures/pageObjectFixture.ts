import { test as base, expect } from "@playwright/test";
import { getRegisterModal, RegisterModal } from "../pages/registerModal";
import {
	getNavigationModalPage,
	NavigationModalPage,
} from "../pages/navigationModal";
import { getAlertModalPage, AlertModalPage } from "../pages/alertModal";
import { HomePageModal, getHomePageModal } from "../pages/homePageModal";
import { LoginPage, getLoginPage } from "../pages/loginModal";
import { AccountModal, getAccountModal } from "../pages/accountModal";

interface PageObjectFixture {
	registerModal: RegisterModal;
	navigationModal: NavigationModalPage;
	alertModal: AlertModalPage;
	homePageModal: HomePageModal;
	loginModal: LoginPage;
	accountModal: AccountModal;
}

export const test = base.extend<PageObjectFixture>({
	registerModal: async ({ page }, use) => await use(getRegisterModal(page)),
	navigationModal: async ({ page }, use) =>
		await use(getNavigationModalPage(page)),
	alertModal: async ({ page }, use) => await use(getAlertModalPage(page)),
	homePageModal: async ({ page }, use) => await use(getHomePageModal(page)),
	loginModal: async ({ page }, use) => await use(getLoginPage(page)),
	accountModal: async ({ page }, use) => await use(getAccountModal(page)),
});

export { expect };
