import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.getByTestId('login-field');
        this.passwordField = page.getByTestId('password-field');
        this.submitButton = page.getByTestId('submit-button');
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
}
