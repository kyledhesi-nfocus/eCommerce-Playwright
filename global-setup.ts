import { test as setup, expect } from '@playwright/test';
import { Home } from './utilities/pages/home-page';
import { Login } from './utilities/pages/login-page';
import { MyAccount } from './utilities/pages/my-account';

setup('login', async ({ page, baseURL, storageState }) => {
  if (!baseURL) {
    throw new Error("Base URL is not set. Configure your .env file or configuration.");
  } else {
    await page.goto(baseURL!);
  }
  const homePage = new Home(page);
  await page.addLocatorHandler(page.getByText('Dismiss'), async () => {
    await homePage.dismiss.click();
  });
  await homePage.gotoMyAccount();     // enter 'My Account' page
  const loginPage = new Login(page);
  await loginPage.login();    // login to account
  const myAccountPage = new MyAccount(page);
  await expect(myAccountPage.logout, 'Unsuccessfully logged in. Configure your .env file with valid login credentials').toBeVisible();
  console.log('Successfully logged in');
  await page.context().storageState({path: storageState as string});
});