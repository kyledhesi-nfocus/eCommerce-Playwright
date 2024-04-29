import { test as base } from '@playwright/test';
import { Home } from '../utilities/pages/home-page';
import { Shop } from '../utilities/pages/shop-page';
import { Cart } from '../utilities/pages/cart-page';
import { Checkout } from '../utilities/pages/checkout-page';
import { ProductOptions } from '../modules/product-options';

type MyFixtures = {
  homePage: Home;
  shopWithOneProduct: Shop;
  emptyCartPage: Cart;
  populatedCartPage: Cart;
  gotoCompleteCheckout: Checkout;
};

export const test = base.extend<MyFixtures & ProductOptions>({

  product: ['belt', {option: true}],  // overriden with playwright.config
    
  page: async ({ page }, use) => {
    await page.goto('');  // goto baseUrl from playwright.config
    await use(page);
  },

  homePage: async ({ page }, use) => {
    const home = new Home(page);
    await use(home);
  },

  shopWithOneProduct: async ({ homePage, product }, use) => {
    const shop = await homePage.gotoShop();
    await shop.addItemToCart(product);    // add product to cart
    await use(shop);
  },

  populatedCartPage: async ({ shopWithOneProduct }, use) => {
    await use(await shopWithOneProduct.gotoCart());   // navigate to 'Cart' page
  },

  gotoCompleteCheckout: async({ populatedCartPage }, use) => {
    await use(await populatedCartPage.gotoCheckout());    // navigate to 'Checkout' page
  },

  emptyCartPage: async ({ page }, use) => {
    const cartPage = new Cart(page);
    await cartPage.clearCart();   // empty the cart
    await use(cartPage);
  },
  
});

export { expect } from '@playwright/test';