import { Cart } from "./cart-page";
import { BasePOM } from "./base-page";

export class Shop extends BasePOM {
    readonly viewCart = this.page.getByTitle('View cart');
    
    async addItemToCart(product: string) {
        try {
            const item = this.page.getByLabel(`Add “${product}” to your cart`);
            await item.click(); 
        } catch (error) {
            console.log('Failed to add item to the cart' + error);
        }
    }

    async gotoCart(): Promise<Cart> {
        await this.viewCart.click();
        return new Cart(this.page);
    }
     
}