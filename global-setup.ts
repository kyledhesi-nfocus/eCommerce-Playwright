import { expect, chromium, firefox, type FullConfig } from '@playwright/test';
import { Home } from './utilities/pages/home-page';
import { Login } from './utilities/pages/login-page';
import { MyAccount } from './utilities/pages/my-account';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try { 
    await page.goto(baseURL!);

    const homePage = new Home(page);
    await homePage.dismiss.click();     // dismiss the banner
    await homePage.gotoMyAccount();     // enter 'My Account' page
    
    const loginPage = new Login(page);
    await loginPage.login();    // login to account

    const myAccountPage = new MyAccount(page);
    await expect(myAccountPage.logout).toBeVisible();
    
    console.log('Successfully logged in');
    
    await page.context().storageState({path: storageState as string});
    await browser.close();
  } catch (error) {
      console.log('Unsuccessfully logged in');
      await browser.close();
      throw error;
  }
  
}

export default globalSetup;
