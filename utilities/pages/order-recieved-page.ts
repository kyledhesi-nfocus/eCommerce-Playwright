import { MyAccount } from '../pages/my-account';
import { BasePOM } from "./base-page";

export class OrderRecieved extends BasePOM {
    readonly orderNumber = this.page.locator('.woocommerce-order-overview__order > strong');
    readonly myAccount = this.page.locator('#menu-item-46');

    async getOrderNumber() {
        var orderNumber =  await this.orderNumber.innerText();
        orderNumber = orderNumber.replace(/\D/g, '');
        return orderNumber;
    }
    
    async gotoMyAccount(): Promise<MyAccount> {
        await this.myAccount.click();
        return new MyAccount(this.page);
    }

}