import { test, expect } from '../fixtures/hooks-fixture';
import { CouponData } from '../modules/coupon-data'

const coupons: CouponData[] = [
    { code: 'edgewords', percentage: 15 },
    { code: 'nfocus', percentage: 25 }
]

test.describe('cart tests' , () => {
    for (const coupon of coupons) {
        test(`Coupon Application with '${coupon.code}' @functional`, async ({ populatedCartPage, product }) => {
            await expect(populatedCartPage.cartProductNames, `${product} has not been added to the cart`).toHaveText(product); // check if the item added is in the cart
            await populatedCartPage.applyCoupon(coupon.code);       // apply the coupon code 
            await expect(populatedCartPage.reducedAmount, `Coupon: ${coupon.code} has not been applied`).toBeVisible();   // check if the coupon has been applied to the cart
            expect.soft(await populatedCartPage.calculateDiscountPercentage(), 'Incorrect discount has been applied').toEqual(coupon.percentage);   // check if the discount matches discount from 'cart-test-data'
            await expect.soft(populatedCartPage.totalPrice, 'Incorrect cart total is displayed - Attaching screenshot to report...').toContainText(await populatedCartPage.calculateExpectedTotal());
            console.log(`Correct discount and total is displayed - Attaching screenshot to report...`);
            await populatedCartPage.page.screenshot({ path: 'screenshots/CartTotals.png', fullPage: true });
            console.log('Starting teardown...');
        });
    }

    test.afterEach(async ({ emptyCartPage }) => {
        await expect(emptyCartPage.emptyCart).toBeVisible(); // Clear the cart after each test
        console.log('Cart is empty');
    });
});
