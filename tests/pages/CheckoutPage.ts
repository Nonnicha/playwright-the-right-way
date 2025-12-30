import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly checkoutHeader: Locator;
    readonly firstnameField: Locator;
    readonly lastnameField: Locator;
    readonly emailField: Locator;
    readonly postalcodeField: Locator;
    readonly confirmPaymentButton: Locator;
    readonly totalPrice: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.checkoutHeader = page.getByText('check out');
        this.firstnameField = page.getByTestId('firstname-field');
        this.lastnameField = page.getByTestId('lastname-field');
        this.emailField = page.getByTestId('email-field');
        this.postalcodeField = page.getByTestId('zipcode-field');
        this.totalPrice = page.getByTestId('total-price');
        this.confirmPaymentButton = page.getByTestId('confirm-payment-button');
    }

    async visitCheckoutPage() {
        await expect(this.checkoutHeader).toBeVisible();
    }

    async fillCheckoutFormWith(firstname: string, lastname: string, email: string, zipcode: string) {
        await this.firstnameField.click();
        await this.firstnameField.fill(firstname);
        await this.lastnameField.click();
        await this.lastnameField.fill(lastname);
        await this.emailField.click();
        await this.emailField.fill(email);
        await this.postalcodeField.click();
        await this.postalcodeField.fill(zipcode);
    }

    async submitCheckout() {
        await this.confirmPaymentButton.click();
    }

    async getTotalPrice(): Promise<string | null> {
        await this.page.waitForTimeout(1000);
        return await this.totalPrice.textContent();
    }
}