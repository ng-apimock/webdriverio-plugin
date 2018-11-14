export class PagePO {
    static get data() {
        return browser.element('.data');
    }

    static get status() {
        return browser.element('.status');
    }

    static get done() {
        return browser.element('.done');
    }

    static get input() {
        return browser.element('#item');
    }

    static get buttons() {
        return new PageButtons();
    }

    static async open(): Promise<any> {
        await browser.url('/index.html');
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
