import { Page, Locator, expect } from '@playwright/test';

export class MailpitPage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly searchButton: Locator;
    readonly messageView: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchButton = page.locator('form').getByRole('button');
        this.messageView = page.locator('#message-view');
    }

    async visitMailPitPage() {
        await this.page.goto('https://mailpit.odds.team/');
    }

    async searchEmailWith(email: string) {
        await this.searchBox.click();
        await this.searchBox.fill(email);
        await this.searchButton.click();
    }

    async openFirstEmailByRecipientWith(email: string) {
        await this.page.getByRole('link', { name: email }).first().click();
    }

    async verifyEmailContentWith(firstname: string, lastname: string, email: string, subtotal: string | null, total: string | null) {
        await expect(this.messageView).toContainText(`${firstname} ${lastname} <${email}>`);
        await expect(this.messageView).toContainText(`Subtotal ${subtotal} THB`);
        await expect(this.messageView).toContainText(`Total ${total} THB`);
    }
}
