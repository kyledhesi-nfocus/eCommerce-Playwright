import { Shop } from "./shop-page";
import { BasePOM } from "./base-page";
import { MyAccount } from "./my-account";

export class Home extends BasePOM {
    readonly myAccount = this.page.locator('#menu-item-46');
    readonly dismiss = this.page.getByRole('link', {name: 'Dismiss'});
    readonly shop = this.page.locator('#menu-item-43');
    
    
    async gotoMyAccount(): Promise<MyAccount> {
        await this.myAccount.click();
        return new MyAccount(this.page);
    }

    async gotoShop(): Promise<Shop> {
        await this.shop.click();
        return new Shop(this.page);
    }
    
}