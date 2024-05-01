import { test, expect } from '../fixtures/hooks-fixture';
import { MyAccount } from '../utilities/pages/my-account';
import { MyAccountOrders } from '../utilities/pages/my-account-orders-page';
import { OrderRecieved } from '../utilities/pages/order-recieved-page';
import BillingDetails from '../test-data/billing-details-data.json';

test.describe('checkout tests', () => {
  test('checkout', async ({ page, gotoCompleteCheckout }, testInfo) => {
    await gotoCompleteCheckout.fillBillingDetails(BillingDetails);    // enter billing details from 'billing-details-data'
    await gotoCompleteCheckout.completeCheckout();    // place the order
    const orderRecievedPage = new OrderRecieved(page);
    await expect(orderRecievedPage.orderNumber, 'Order number is not displayed').toBeVisible();   // check if order number is displayed
    const orderNumber = await orderRecievedPage.getOrderNumber();
    await page.screenshot({ path: 'screenshots/OrderRecieved.png', fullPage: true });
    await testInfo.attach('OrderRecieved.png', {
      path: 'screenshots/OrderRecieved.png'
    });
    await orderRecievedPage.gotoMyAccount();    // navigate to 'My account' page
    const myAccountPage = new MyAccount(page);
    await myAccountPage.gotoOrders();   // navigate to 'Orders' page
    const myAccountOrdersPage = new MyAccountOrders(page);    
    await expect.soft(myAccountOrdersPage.latestOrderNumber, 'Incorrect order number is displayed').toContainText(orderNumber);    // check if latest order contains order number
    await page.screenshot({ path: 'screenshots/AllOrders.png', fullPage: true });
    await testInfo.attach('AllOrders.png', {
      path: 'screenshots/AllOrders.png'
    });
    await myAccountOrdersPage.gotoCart();   // navigate to 'Cart' page
  });

  test.afterEach(async ({ emptyCartPage }) => { 
    await expect(emptyCartPage.emptyCart, 'Cart is not empty!').toBeVisible(); 
  });

});
