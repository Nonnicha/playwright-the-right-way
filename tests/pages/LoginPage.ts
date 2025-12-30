import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator
    readonly submitButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.getByTestId('login-field');
        this.passwordField = page.getByTestId('password-field');
        this.submitButton = page.getByTestId('submit-button');
        this.errorMessage = page.getByTestId('error-message-label');
    }

    async loginWith(username: string, password: string) {
        await this.usernameField.click();
        await this.usernameField.fill(username);
        await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.submitButton.click();
    }

    async visitLoginPage() {
        await this.page.goto('https://merchandise-dev.odds.team/index.html');
    }

    async verifyErrorMessage() {
        await expect(this.errorMessage).toBeVisible();
    }
}
