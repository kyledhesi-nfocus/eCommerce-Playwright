import { MyAccountOrders } from "./my-account-orders-page";
import { Shop } from "./shop-page";
import { BasePOM } from "./base-page";

export class MyAccount extends BasePOM {
    readonly shop = this.page.locator('.menu-item-43');    
    readonly logout = this.page.getByRole('link', { name: ' Logout' });
    readonly orders = this.page.getByRole('link', { name: ' Orders' });

    async gotoShop(): Promise<Shop>{
        await this.shop.click();
        return new Shop(this.page);
    }

    async gotoOrders(): Promise<MyAccountOrders> {
        await this.orders.click();
        return new MyAccountOrders(this.page);
    }
    
}