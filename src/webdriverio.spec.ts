import { WebdriverIOClient } from './webdriverio';

describe('WebdriverIOClient', () => {
    let browserGetProcessedConfigThenFn: any;
    let browserSetCookiesFn: jest.Mock;
    let browserUrlFn: jest.Mock;
    let client: WebdriverIOClient;
    let deferredPromise: any;
    let rejectFn: jest.Mock;
    let resolveFn: jest.Mock;

    beforeAll(() => {
        browserGetProcessedConfigThenFn = jest.fn();
        browserSetCookiesFn = jest.fn();
        browserUrlFn = jest.fn();
        deferredPromise = {};

        (global as any)['browser'] = {
            options: {
                baseUrl: 'http://localhost:9000'
            },
            url: browserUrlFn,
            setCookies: browserSetCookiesFn
        };

        resolveFn = jest.fn();
        rejectFn = jest.fn();

        client = new WebdriverIOClient({ baseUrl: 'http://localhost:9000' });
    });

    describe('constructor', () => {
        it('sets the baseUrl', () => {
            expect(client.baseUrl).toBe('http://localhost:9000/ngapimock');
        });
    });

    describe('constructor custom path', () => {
        it('sets the baseUrl', () => {
            client = new WebdriverIOClient({ baseUrl: 'http://localhost:9000', basePath: 'myapimock' });
            expect(client.baseUrl).toBe('http://localhost:9000/myapimock');
        });
    });

    describe('openUrl', () => {
        it('opens the url', async () => {
            await client.openUrl('url');
            expect(browserUrlFn).toHaveBeenCalledWith('url');
        });
    });

    describe('setCookie', () => {
        it('sets the cookie', async () => {
            await client.setCookie('name', 'value');
            expect(browserSetCookiesFn).toHaveBeenCalledWith({ name: 'name', value: 'value' });
        });
    });
});
