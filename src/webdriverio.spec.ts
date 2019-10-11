import {assert, SinonStub, stub} from 'sinon';

import {WebdriverIOClient} from './webdriverio';

describe('WebdriverIOClient', () => {
    const BASE_URL = 'http://localhost:9000';
    let browserGetProcessedConfigThenFn: any;
    let browserSetCookiesFn: SinonStub;
    let browserUrlFn: SinonStub;
    let client: WebdriverIOClient;
    let deferredPromise: any;
    let rejectFn: SinonStub;
    let resolveFn: SinonStub;

    beforeAll(() => {
        browserGetProcessedConfigThenFn = stub();
        browserSetCookiesFn = stub();
        browserUrlFn = stub();
        deferredPromise = {};

        (global as any)['browser'] = {
            options: {
                baseUrl: BASE_URL
            },
            url: browserUrlFn,
            setCookies: browserSetCookiesFn
        };

        resolveFn = stub();
        rejectFn = stub();

        client = new WebdriverIOClient(BASE_URL);
    });

    describe('constructor', () =>
        it('sets the baseUrl', () =>
            expect(client.baseUrl).toBe(BASE_URL + '/ngapimock')));

    describe('openUrl', () =>
        it('opens the url', async () => {
            await client.openUrl('url');
            assert.calledWith(browserUrlFn, 'url');
        }));

    describe('setCookie', () =>
        it('sets the cookie', async () => {
            await client.setCookie('name', 'value');
            assert.calledWith(browserSetCookiesFn, { name: 'name', value: 'value' });
        }));
});
