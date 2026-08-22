import { test, expect } from "../src/fixtures/pageObjectFixture";

test.describe("Validate the working of Login functionality", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost/opencart/upload/");
		await page.waitForLoadState("domcontentloaded");
	});

	test("Validate login into the Application using valid credentials", async ({
		page,
		navigationModal,
		loginModal,
		accountModal,
	}) => {
		await test.step("Go to Login Page", async () => {
			await navigationModal.clickOnMyAccount();
			await navigationModal.clickOnRegisterLogin("Login");
			await expect(page, "Should have title Account Login").toHaveTitle(
				"Account Login",
			);
		});
		await test.step("validate login is successful", async () => {
			await loginModal.loginToAccount("at@gmail.com", "123456");
			await expect(accountModal.myAccount).toBeVisible();
		});
	});

	test("Validate logging into the Application using Keyboard keys (Tab and Enter)", async ({
		page,
		navigationModal,
		loginModal,
		accountModal,
		registerModal,
	}) => {
		await test.step("Go to Login Page", async () => {
			await navigationModal.clickOnMyAccount();
			await navigationModal.clickOnRegisterLogin("Login");
			await expect(page, "Should have title Account Login").toHaveTitle(
				"Account Login",
			);
		});
		await test.step("validate login is successful using keyboard", async () => {
			await registerModal.fillEmail("at@gmail.com");
			await registerModal.fillPassword("123456");
			await page.keyboard.press("Tab");
			await page.keyboard.press("Tab");
			await page.keyboard.press("Enter");
			await expect(accountModal.myAccount).toBeVisible();
		});
	});
});
