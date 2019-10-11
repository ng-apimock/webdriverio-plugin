import * as WebdriverIOAsync from 'webdriverio';

declare var browser: WebdriverIOAsync.BrowserObject;

export class PagePO {
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

    static get buttons() {
        return new PageButtons();
    }

    static async open(): Promise<any> {
        await browser.url('/index.html');
        await browser.waitUntil(async () => {
            const header = await (await browser.$('h1')).getText();
            return header.indexOf('ng-apimock test example app') > -1;
        }, 20000, 'page not loaded after 20s');
    }
}

export class PageButtons {
    get get() {
        return browser.$('button*=get');
    }

    get binary() {
        return browser.$('button*=binary');
    }

    get getAsJsonp() {
        return browser.$('button*=get as jsonp');
    }

    get post() {
        return browser.$('button*=post');
    }
}
