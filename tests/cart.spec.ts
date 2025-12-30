import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';

test.describe('Cart', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitLoginPage();
        await loginPage.loginWith('customer1', 'password');
    });

    test('User can add product to cart', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.visitProductsPage();
        await productsPage.addFirstProductToCart();
        await productsPage.goToCart();

        const cartPage = new CartPage(page);
        await cartPage.visitCartPage();
        const subtotalPrice = await cartPage.getSubtotalPrice();
        
        expect(subtotalPrice).toBeTruthy();
        expect(subtotalPrice).not.toBe('0');
    });

    test('User can view empty cart', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.visitProductsPage();
        await productsPage.goToCart();

        const cartPage = new CartPage(page);
        await cartPage.visitCartPage();
    });

    test('User can proceed to checkout from cart', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.visitProductsPage();
        await productsPage.addFirstProductToCart();
        await productsPage.goToCart();

        const cartPage = new CartPage(page);
        await cartPage.visitCartPage();
        await cartPage.proceedToCheckout();

        await expect(page).toHaveURL("https://merchandise-dev.odds.team/check-out.html");
    });
});
