class PagePO {
    get data()  { return browser.element('.data'); }
    get status() { return browser.element('.status'); }
    get done() { return browser.element('.done'); }
    get input() { return browser.element('#item'); }

    constructor() {
        this.buttons = new PageButtons();
    }

    async open() {
        const url = '/index.html';
        await browser.url(url);
        await browser.waitUntil(async () => {
            const header = await browser.getText('h1');
            return header.indexOf('ng-apimock test example app') > -1;
        }, 5000);
    }
}

class PageButtons {
    get get() { return browser.element('button*=get'); }
    get binary() { return browser.element('button*=binary'); }
    get getAsJsonp() { return  browser.element('button*=get as jsonp'); }
    get post() { return browser.element('button*=post'); }
}

module.exports = PagePO;