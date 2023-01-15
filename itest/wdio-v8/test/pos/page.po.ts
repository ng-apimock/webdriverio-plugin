import * as WebdriverIOAsync from 'webdriverio';

declare let browser: WebdriverIOAsync.BrowserObject;

export interface Repository {
    name: string;
    url: string;
    description: string;
    license: string;
}

export class PagePO {
    static get repositories(): Promise<WebdriverIOAsync.Element> {
        return browser.$('.repositories');
    }

    static get repositoryData() {
        return PagePO.repositories
            .then((value: Element) => value.$$('<mat-row />')
                .then(async (value1: WebdriverIOAsync.ElementArray) => await Promise.all(value1.map(async (row: WebdriverIOAsync.Element) => ({
                    name: await (await row.$('.mat-column-name')).getText(),
                    url: await (await row.$('.mat-column-html_url')).getText(),
                    description: await (await row.$('.mat-column-description')).getText(),
                    license: await (await row.$('.mat-column-license')).getText(),
                })))));
    }

    static get repositoryName() {
        return browser.$('input[formcontrolname=\'name\']');
    }

    static get repositoryDescription() {
        return browser.$('input[formcontrolname=\'description\']');
    }

    static get createRepository() {
        return browser.$('button*=Submit');
    }

    static async downloadReadmeForRepository(name: string): Promise<any> {
        const repository = await PagePO.repositories
            .then((value: WebdriverIOAsync.Element) => value.$$('<mat-row />'))
            .then(async (value1: WebdriverIOAsync.ElementArray) => {
                const elements = await Promise.all(value1);
                return elements.find(async (el: WebdriverIOAsync.Element) => {
                    const text = await (await el.$('.mat-column-name')).getText();
                    return text === name;
                });
            });

        return await (await repository.$('button*=Download readme')).click();
    }

    static async waitForRepositoriesPresent(): Promise<any> {
        await (await browser.$('.repositories')).isDisplayed();
    }

    static async navigate(destination = '/index.html'): Promise<any> {
        await browser.url(destination);
    }

    static async refresh(): Promise<any> {
        return await (await browser.$('button*=Refresh')).click();
    }

    static error() {
        return browser.$('.mdc-dialog__title');
    }
}
