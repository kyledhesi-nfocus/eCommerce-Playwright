import { test, expect } from './fixtures/hooks-fixture';
import { Home } from './utilities/pages/home-page';
import { MyAccount } from './utilities/pages/my-account';

test('logout', async ({ page }) => {
    const homePage = new Home(page);
    await homePage.gotoMyAccount();
    const myAccountPage = new MyAccount(page);
    if (await myAccountPage.logout.isVisible()) {
        await myAccountPage.logout.click();
        await expect(myAccountPage.logout).not.toBeVisible();
        console.log('Successfully logged out');
    } else {
        console.log('Already logged out');
    }
    
});