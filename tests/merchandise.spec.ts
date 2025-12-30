import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmCheckoutPage } from './pages/ConfirmCheckoutPage';
import { MailpitPage } from './pages/MailpitPage';

test.describe('Merchandise Purchase', () => {
    let subtotalPrice: string | null;
    let totalPrice: string | null;
    const firstname: string = 'Chanon';
    const lastname: string = 'Wiriyathanachit';
    const email: string = 'non@mailinator.com';
    const zipcode: string = '49000';

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitLoginPage();
        await loginPage.loginWith('customer1', 'password');
    });

    test('User can login and add product to cart', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.visitProductsPage();
        await productsPage.addFirstProductToCart();
        await productsPage.goToCart();

        const cartPage = new CartPage(page);
        await cartPage.visitCartPage();
        subtotalPrice = await cartPage.getSubtotalPrice();
        
        expect(subtotalPrice).toBeTruthy();
    });

    test('User can proceed to checkout from cart', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.visitProductsPage();
        await productsPage.addFirstProductToCart();
        await productsPage.goToCart();

        const cartPage = new CartPage(page);
        await cartPage.visitCartPage();
        subtotalPrice = await cartPage.getSubtotalPrice();
        await cartPage.proceedToCheckout();

        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.visitCheckoutPage();
    });

    test('User can submit checkout form', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.visitProductsPage();
        await productsPage.addFirstProductToCart();
        await productsPage.goToCart();

        const cartPage = new CartPage(page);
        await cartPage.visitCartPage();
        subtotalPrice = await cartPage.getSubtotalPrice();
        await cartPage.proceedToCheckout();

        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.visitCheckoutPage();
        totalPrice = await checkoutPage.getTotalPrice();
        await checkoutPage.fillCheckoutFormWith(firstname, lastname, email, zipcode);
        await checkoutPage.submitCheckout();

        const confirmCheckoutPage = new ConfirmCheckoutPage(page);
        await confirmCheckoutPage.verifyOrderConfirmation();
    });

    test('User receives confirmation email in Mailpit', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.visitProductsPage();
        await productsPage.addFirstProductToCart();
        await productsPage.goToCart();

        const cartPage = new CartPage(page);
        await cartPage.visitCartPage();
        subtotalPrice = await cartPage.getSubtotalPrice();
        await cartPage.proceedToCheckout();

        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.visitCheckoutPage();
        totalPrice = await checkoutPage.getTotalPrice();
        await checkoutPage.fillCheckoutFormWith(firstname, lastname, email, zipcode);
        await checkoutPage.submitCheckout();

        const confirmCheckoutPage = new ConfirmCheckoutPage(page);
        await confirmCheckoutPage.verifyOrderConfirmation();

        const mailpitPage = new MailpitPage(page);
        await mailpitPage.visitMailPitPage();
        await mailpitPage.searchEmailWith(email);
        await mailpitPage.openFirstEmailByRecipientWith(email);
        await mailpitPage.verifyEmailContentWith(firstname, lastname, email, subtotalPrice, totalPrice);
    });
});
