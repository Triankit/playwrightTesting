import { test, expect } from "../src/fixtures/pageObjectFixture";

test.describe("Validate the working of Register Account functionality", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost/opencart/upload/");
		await page.waitForLoadState("domcontentloaded");
	});

	test("Validate Registering an Account by providing only the Mandatory fields", async ({
		registerModal,
		navigationModal,
	}) => {
		await test.step("open register page", async () => {
			await navigationModal.clickOnMyAccount();
			await navigationModal.clickOnRegisterLogin("Register");
			await expect(registerModal.registerBreadcrum).toBeVisible();
		});
		await test.step("fill mandatory filled for register account", async () => {
			await registerModal.fillPersonalDetail(
				"ank",
				"tri",
				"at@gamil.com",
				"123456",
			);
			await registerModal.subscribeToNewsletter();
			await registerModal.agreeToPolicy();
			await registerModal.clickOnContinue();
		});
		await test.step("Verify account successfully created", async () => {
			await expect(
				registerModal.getBreadCurmPage("Your Account Has Been Created!"),
			).toBeVisible();
			await expect(registerModal.pageContent).toContainText(
				"Your Account Has Been Created!",
			);
		});
	});

	test("Validate proper notification messages are displayed for the mandatory fields, when you don't provide any fields in the 'Register Account' page and submit", async ({
		registerModal,
		navigationModal,
		alertModal,
	}) => {
		await test.step("Navigate to Register page", async () => {
			await navigationModal.clickOnMyAccount();
			await navigationModal.clickOnRegisterLogin("Register");
			await expect(registerModal.registerBreadcrum).toBeVisible();
		});

		await test.step("Verify proper notification messages are displayed for the mandatory fields", async () => {
			await registerModal.clickOnContinue();
			await expect(
				alertModal.errorFirstName,
				"first name should contain 'First Name must be between 1 and 32 characters!",
			).toHaveText("First Name must be between 1 and 32 characters!");
			await expect(
				alertModal.errorLastName,
				"last name should contain 'Last Name must be between 1 and 32 characters!",
			).toHaveText("Last Name must be between 1 and 32 characters!");
			await expect(
				alertModal.errorEmail,
				"email should contain 'E-Mail Address does not appear to be valid!",
			).toHaveText("E-Mail Address does not appear to be valid!");
			await expect(
				alertModal.errorPassword,
				"password should contain 'Password must be between 6 and 40 characters!",
			).toHaveText("Password must be between 6 and 40 characters!");
		});
	});

	test('Validate different ways of navigating to "Register Account" page', async ({
		navigationModal,
		registerModal,
		homePageModal,
		loginModal,
	}) => {
		await test.step("Navigate to Register page", async () => {
			await navigationModal.clickOnMyAccount();
			await navigationModal.clickOnRegisterLogin("Register");
			await expect(registerModal.registerBreadcrum).toBeVisible();
		});

		await test.step('Validate the navigation to "Register Account" page', async () => {
			await expect(registerModal.registerBreadcrum).toBeVisible();
		});

		await test.step("Navigate to homePage", async () => {
			await homePageModal.clickOnCartLogo();
			await navigationModal.clickOnMyAccount();
			await navigationModal.clickOnRegisterLogin("Login");
			await loginModal.clickOnContinue();
		});
		await test.step('Validate the navigation to "Register Account" page', async () => {
			await expect(registerModal.registerBreadcrum).toBeVisible();
		});
	});
});
