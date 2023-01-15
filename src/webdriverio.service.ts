import {WebdriverIOClient} from './webdriverio';

declare const browser: any;

export default class NgApimockService {
    baseUrl: string;
    basePath: string;
    globalName: string;

    constructor(options: any) {
        this.globalName = (options && options.globalName)
            ? options.globalName
            : 'ngApimock';
        this.baseUrl = (options && options.baseUrl)
            ? options.baseUrl
            // Patch for wdio-v8
            : (browser.config && browser.config.baseUrl)
                ? browser.config.baseUrl
                : browser.options.baseUrl;
        this.basePath = (options && options.basePath)
            ? options.basePath
            : undefined;
    }

    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    async before(capabilities: any): Promise<any> {
        const plugin = new WebdriverIOClient({
            baseUrl: this.baseUrl,
            basePath: this.basePath
        });
        (global as any)[this.globalName] = plugin;
        await plugin.setNgApimockCookie();
    }
}
