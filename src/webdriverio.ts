import { BaseClient } from '@ng-apimock/base-client';

declare const browser: any;

/** Webdriver.io client for apimock. */
export class WebdriverIOClient extends BaseClient {
    /** Constructor. */
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    /** {@inheritDoc}. */
    async openUrl(url: string): Promise<any> {
        return await browser.url(url);
    }

    /** {@inheritDoc}. */
    async setCookie(name: string, value: string): Promise<any> {
        return await browser.setCookies({ name, value });
    }
}
