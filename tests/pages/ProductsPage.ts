import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
    readonly productsHeader: Locator;
    readonly firstAddToCartButton: Locator;
    readonly gotoCartButton: Locator;

    constructor(page: Page) {
        this.productsHeader = page.getByText('products');
        this.firstAddToCartButton = page.getByTestId('add-to-cart-button').first();
        this.gotoCartButton = page.getByTestId('cart');
    }

    async visitProductsPage() {
        await expect(this.productsHeader).toBeVisible();
    }

    async addFirstProductToCart() {
        await this.firstAddToCartButton.click();
    }

    async goToCart() {
        await this.gotoCartButton.click();
    }
}
