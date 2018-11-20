export class PagePO {
    static get data() {
        return browser.getText('.data');
    }

    static get status() {
        return browser.getText('.status');
    }

    static get done() {
        return browser.getText('.done');
    }

    static async input(data: string) {
        await browser.setValue("#item", data);
    }

    static get buttons() {
        return new PageButtons();
    }

    static async open(): Promise<any> {
        await browser.url('/index.html');
        await browser.url('/index.html'); // make sure navigation worked
        await browser.waitUntil(async () => {
            const header = await browser.getText('h1');
            return header.indexOf('ng-apimock test example app') > -1;
        }, 20000, 'page not loaded after 20s');
    }
}

export class PageButtons {
    get get() {
        return browser.element('button*=get');
    }

    get binary() {
        return browser.element('button*=binary');
    }

    get getAsJsonp() {
        return browser.element('button*=get as jsonp');
    }

    get post() {
        return browser.element('button*=post');
    }
}
