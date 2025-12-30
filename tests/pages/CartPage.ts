import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartHeader: Locator;
    readonly subtotalPrice: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartHeader = page.getByText('Your Cart');
        this.subtotalPrice = page.getByTestId('subtotal-price');
        this.checkoutButton = page.getByTestId('checkout-button');
    }

    async visitCartPage() {
        await expect(this.cartHeader).toBeVisible();
    }

    async getSubtotalPrice(): Promise<string | null> {
        await this.page.waitForTimeout(1000);
        return await this.subtotalPrice.textContent();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}