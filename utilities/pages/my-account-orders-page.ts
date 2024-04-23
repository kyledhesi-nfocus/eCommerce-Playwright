import { Cart } from "./cart-page";
import { BasePOM } from "./base-page";

export class MyAccountOrders extends BasePOM {
    readonly cartLink = this.page.locator('#menu-item-44').getByRole('link', { name: 'Cart' });
    readonly ordersTable = this.page.locator('.woocommerce-orders-table');
    readonly latestOrder = this.ordersTable.locator('tbody > tr').first();
    readonly latestOrderNumber = this.latestOrder.locator('.woocommerce-orders-table__cell-order-number');
    
    async gotoCart(): Promise<Cart> {
        await this.cartLink.click();
        return new Cart(this.page);
    }

}