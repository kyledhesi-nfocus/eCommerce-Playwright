import { BillingData } from '../../modules/billing-data';
import { BasePOM } from './base-page';
import { OrderRecieved } from "./order-recieved-page";

export class Checkout extends BasePOM {
    readonly firstName = this.page.locator('#billing_first_name');
    readonly lastName = this.page.locator('#billing_last_name');
    readonly address = this.page.locator('#billing_address_1')
    readonly city = this.page.locator('#billing_city');
    readonly postcode = this.page.locator('#billing_postcode');
    readonly phoneNumber = this.page.locator('#billing_phone');
    readonly email = this.page.locator('#billing_email');
    readonly checkPayments = this.page.getByText('Check payments');
    readonly cashOnDelivery = this.page.getByText('Cash on delivery');
    readonly placeOrder = this.page.getByRole('button', { name: 'Place order' });

    async fillBillingDetails(data: BillingData) {
        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.address.fill(data.address);
        await this.city.fill(data.city);
        await this.postcode.fill(data.postcode);
        await this.phoneNumber.fill(data.phoneNumber);
        await this.email.fill(data.email);
        if (data.paymentMethod === 'Check payments') {
            await this.checkPayments.click();
        } else {
            await this.cashOnDelivery.click();
        }
    }
    
    async completeCheckout(): Promise<OrderRecieved> {
        await this.placeOrder.click();
        return new OrderRecieved(this.page);
    }
    
}