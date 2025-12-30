import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmCheckoutPage } from './pages/ConfirmCheckoutPage';

test.describe('Checkout Flow', () => {
    const firstname: string = 'Chanon';
    const lastname: string = 'Wiriyathanachit';
    const email: string = 'non@mailinator.com';
    const zipcode: string = '49000';

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitLoginPage();
        await loginPage.loginWith('customer1', 'password');

        const productsPage = new ProductsPage(page);
        await productsPage.visitProductsPage();
        await productsPage.addFirstProductToCart();
        await productsPage.goToCart();

        const cartPage = new CartPage(page);
        await cartPage.visitCartPage();
        await cartPage.proceedToCheckout();
    });

    test('User can submit checkout with valid information', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.visitCheckoutPage();
        await checkoutPage.fillCheckoutFormWith(firstname, lastname, email, zipcode);
        await checkoutPage.submitCheckout();

        const confirmCheckoutPage = new ConfirmCheckoutPage(page);
        await confirmCheckoutPage.verifyOrderConfirmation();
    });

    test('User cannot submit checkout with missing firstname', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.visitCheckoutPage();
        await checkoutPage.fillCheckoutFormWith('', lastname, email, zipcode);
        await checkoutPage.submitCheckout();

        await expect(page).toHaveURL("https://merchandise-dev.odds.team/check-out.html");
        await checkoutPage.verifyErrorMessage('First name is required.');
    });

    test('User cannot submit checkout with missing lastname', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.visitCheckoutPage();
        await checkoutPage.fillCheckoutFormWith(firstname, '', email, zipcode);
        await checkoutPage.submitCheckout();

        await expect(page).toHaveURL("https://merchandise-dev.odds.team/check-out.html");
        await checkoutPage.verifyErrorMessage('Last name is required.');
    });

    test('User cannot submit checkout with invalid email', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.visitCheckoutPage();
        await checkoutPage.fillCheckoutFormWith(firstname, lastname, 'invalidemail', zipcode);
        await checkoutPage.submitCheckout();

        await expect(page).toHaveURL("https://merchandise-dev.odds.team/check-out.html");
        await checkoutPage.verifyErrorMessage('Invalid email address.');
    });

    test('User cannot submit checkout with missing zipcode', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.visitCheckoutPage();
        await checkoutPage.fillCheckoutFormWith(firstname, lastname, email, '');
        await checkoutPage.submitCheckout();

        await expect(page).toHaveURL("https://merchandise-dev.odds.team/check-out.html");
        await checkoutPage.verifyErrorMessage('Zip code is required.');
    });

    test('User can view total price before checkout', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.visitCheckoutPage();
        const totalPrice = await checkoutPage.getTotalPrice();

        expect(totalPrice).toBeTruthy();
        expect(totalPrice).not.toBe('0');
    });
});
