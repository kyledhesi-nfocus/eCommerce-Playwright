import { test, expect } from '../fixtures/hooks-fixture';
import { MyAccount } from '../utilities/pages/my-account';
import { MyAccountOrders } from '../utilities/pages/my-account-orders-page';
import { OrderRecieved } from '../utilities/pages/order-recieved-page';
import BillingDetails from '../test-data/billing-details-data.json';

test.describe('checkout tests', () => {
  test('checkout', async ({ page, gotoCompleteCheckout }) => {
    await gotoCompleteCheckout.fillBillingDetails(BillingDetails);
    await gotoCompleteCheckout.completeCheckout();
    const orderRecievedPage = new OrderRecieved(page);
    await expect(orderRecievedPage.orderNumber, 'Order number is not displayed').toBeVisible();
    const orderNumber = await orderRecievedPage.getOrderNumber();
    await page.screenshot({ path: 'screenshots/OrderRecieved.png', fullPage: true });
    await orderRecievedPage.gotoMyAccount();
    const myAccountPage = new MyAccount(page);
    await myAccountPage.gotoOrders();
    const myAccountOrdersPage = new MyAccountOrders(page);    
    await expect(myAccountOrdersPage.latestOrderNumber, 'Incorrect order number is displayed').toContainText(orderNumber);
    console.log(`Correct order number is displayed - Attaching screenshot to report...`);
    await page.screenshot({ path: 'screenshots/AllOrders.png', fullPage: true });
    console.log('Starting teardown...');
    await myAccountOrdersPage.gotoCart();
  });

  test.afterEach(async ({emptyCartPage}) => { 
    await expect(emptyCartPage.emptyCart).toBeVisible(); 
    console.log('Cart is empty');
  });

});
