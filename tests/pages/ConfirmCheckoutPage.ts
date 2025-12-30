import { Locator, Page, expect } from '@playwright/test';

export class ConfirmCheckoutPage {
    readonly thankYouMessage: Locator;
    readonly confirmShippedMessage: Locator;
    readonly confirmationMailMessage: Locator;

    constructor(page: Page) {
        this.thankYouMessage = page.getByText('Thank you for your order.');
        this.confirmShippedMessage = page.getByText('Your order will be shipped within today.');
        this.confirmationMailMessage = page.getByText('Your order confirmation has been sent to your mailbox.');
    }

    async verifyOrderConfirmation() {
        await expect(this.thankYouMessage).toBeVisible();
        await expect(this.confirmShippedMessage).toBeVisible();
        await expect(this.confirmationMailMessage).toBeVisible();
    }
}   