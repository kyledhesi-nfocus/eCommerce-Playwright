import { BasePOM } from "./base-page";
import { Checkout } from './checkout-page';

export class Cart extends BasePOM {
    readonly cartTable = this.page.locator('.woocommerce-cart-form .shop_table');
    readonly cartItems = this.cartTable.locator('tbody > tr');
    readonly cartProductNames = this.cartItems.locator('.product-name');
    readonly couponCode = this.page.getByPlaceholder('Coupon code');
    readonly submitCoupon = this.page.getByRole('button', { name: 'Apply coupon' });
    readonly removeItem = this.page.getByLabel('Remove this item');
    readonly removeCoupon = this.page.getByRole('link', { name: '[Remove]' });
    readonly subtotalPrice = this.page.locator('.cart-subtotal > td');
    readonly reducedAmount = this.page.locator('.cart-discount .woocommerce-Price-amount');
    readonly shippingPrice = this.page.locator('#shipping_method > li');
    readonly totalPrice = this.page.locator('.order-total > td');
    readonly checkout = this.page.getByRole('link', { name: 'Proceed to checkout ' });
    readonly emptyCart = this.page.getByText('Your cart is currently empty.');

    /* apply coupon to the cart */
    async applyCoupon(couponCode: string) {
        try {
            await this.couponCode.fill(couponCode);
            await this.submitCoupon.click();
        } catch (error) {
            console.error('Failed to apply coupon:', error);
        }
    }
    
    /* calculate the percentage reduced from subtotal price  */ 
    public async calculateDiscountPercentage() {
        const subtotal = await this.convertSubtotalToFloat();       // call 'convertSubotalToFloat' and assign to subtotal
        const discount = await this.convertReducedAmountToFloat();  // call 'convertReducedAmountToFloat' and assign to discount
    
        if (subtotal === null || discount === null) {
            return null; // return null if either value couldn't be retrieved
        }
        const percentageDiscount = (discount / subtotal) * 100;
        return percentageDiscount; // return the discount percentage
    }


    public async calculateExpectedTotal() {
        const subtotal = await this.convertSubtotalToFloat();
        const discount = await this.convertReducedAmountToFloat();
        const shipping = await this.convertShippingToFloat();
        if (subtotal === null || discount === null || shipping === null) {
            return 'Failed to calculate expected total'; // return null if either value couldn't be retrieved or is not applicable
        }
        const expectedTotal = subtotal - discount + shipping;
        return (expectedTotal.toFixed(2));
    }

    /* remove coupon and item from cart */
    async clearCart() {
        if (await this.removeCoupon.isVisible()) {
            await this.removeCoupon.click();
        }
        if (await this.removeItem.isVisible()) {
           await this.removeItem.click(); 
        }
    }
    
    async gotoCheckout(): Promise<Checkout> {
        await this.checkout.click();
        return new Checkout(this.page);
    }

    /* helper function - return subtotal price */
    public async convertSubtotalToFloat() {
        var subtotalPrice = await this.subtotalPrice.textContent();     // retrieve text context from subtotalPrice element
        if (subtotalPrice == null) {
            return null;
        }
        subtotalPrice = subtotalPrice.replace('£', '');
        return parseFloat(subtotalPrice);       // converts subtotalPrice to float
    }

    /* helper function - return reduced amount */
    public async convertReducedAmountToFloat() {
        var reducedAmount = await this.reducedAmount.textContent();     // retrieve text content from reducedAmount element
        if (reducedAmount == null) {
            return null;
        }
        reducedAmount = reducedAmount.replace('£', '');
        return parseFloat(reducedAmount);   // converts reducedAmount to float
    }

    /* helper function - return shipping price */
    public async convertShippingToFloat() {
        var shippingPrice = await this.shippingPrice.textContent();
        if (shippingPrice == null) {
            return null;
        }
        shippingPrice = shippingPrice.replace(/Flat rate: £/g, '').replace(/£/g, '').trim();

        return parseFloat(shippingPrice);   // converts shippingPrice to float
    }

}