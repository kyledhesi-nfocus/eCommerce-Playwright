import { test, expect } from './fixtures/hooks-fixture';
import { Home } from './utilities/pages/home-page';
import { MyAccount } from './utilities/pages/my-account';

test('logout', async ({ page }) => {
    const homePage = new Home(page);
    await homePage.gotoMyAccount();     // navigate to 'My Account' page
    const myAccountPage = new MyAccount(page);
    if (await myAccountPage.logout.isVisible()) {
        await myAccountPage.logout.click();     // logout of account
        await expect(myAccountPage.logout).not.toBeVisible();       // check if logout is not displayed
        console.log('Successfully logged out');
    } else {
        console.log('Already logged out');
    }
    await page.close();
});