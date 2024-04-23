import { BasePOM } from "./base-page";

export class Login extends BasePOM {
    readonly username = this.page.getByRole('textbox', {name: 'username'});
    readonly password = this.page.locator('#password');
    readonly submit = this.page.getByRole('button', {name: 'Log in'});
    
    async login() {
        if (!process.env.USER_NAME || !process.env.PASSWORD) {
            throw new Error('Environment variables USERNAME and PASSWORD must be set');
        }
        await this.username.fill(process.env.USER_NAME);
        await this.password.fill(process.env.PASSWORD);
        await this.submit.click();
    }
    
}