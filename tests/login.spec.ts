import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';

test.describe('Login', () => {
    test('User can login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitLoginPage();
        await loginPage.loginWith('customer1', 'password');

        await expect(page).toHaveURL('https://merchandise-dev.odds.team/store.html');
    });

    test('User cannot login with invalid username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitLoginPage();
        await loginPage.loginWith('invaliduser', 'password');

        await expect(page).toHaveURL('https://merchandise-dev.odds.team/index.html');
        await loginPage.verifyErrorMessage();
    });

    test('User cannot login with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitLoginPage();
        await loginPage.loginWith('customer1', 'wrongpassword');

        await expect(page).toHaveURL('https://merchandise-dev.odds.team/index.html');
        await loginPage.verifyErrorMessage();
    });

    test('User cannot login with empty credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitLoginPage();
        await loginPage.loginWith('', '');

        await expect(page).toHaveURL('https://merchandise-dev.odds.team/index.html');
        await loginPage.verifyErrorMessage();
    });
});
