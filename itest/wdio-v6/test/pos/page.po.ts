import * as WebdriverIOAsync from 'webdriverio';

import { PageButtons } from './page-buttons.po';

declare let browser: WebdriverIOAsync.BrowserObject;

export class PagePO {
    static get buttons() {
        return new PageButtons();
    }

    static async getData() {
        return await (await browser.$('.data')).getText();
    }

    static async getStatus() {
        return await (await browser.$('.status')).getText();
    }

    static async getDone() {
        return await (await browser.$('.done')).getText();
    }

    static async input(data: string) {
        await (await browser.$('#item')).setValue(data);
    }

    static async open(): Promise<any> {
        await browser.url('/index.html');
        await browser.waitUntil(async () => {
            const header = await (await browser.$('h1')).getText();
            return header.indexOf('ng-apimock test example app') > -1;
        }, { timeout: 20000, timeoutMsg: 'page not loaded after 20s' });
    }
}
