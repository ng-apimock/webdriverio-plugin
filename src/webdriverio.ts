import {BaseClient} from '@ng-apimock/base-client';

/** Webdriver.io client for apimock. */
export class WebdriverIOClient extends BaseClient {
    /** Constructor.*/
    constructor() {
        super(browser.options.baseUrl);
    }

    /** {@inheritDoc}. */
    async openUrl(url: string): Promise<any> {
        return await browser.url(url);
    }

    /** {@inheritDoc}. */
    async setCookie(name: string, value: string): Promise<any> {
        return await browser.setCookie({ name: name, value: value });
    }
}

declare const browser: any;