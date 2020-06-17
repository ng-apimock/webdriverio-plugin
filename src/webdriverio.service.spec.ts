import * as uuid from 'uuid';

import NgApimockService from './webdriverio.service';

jest.mock('uuid');

describe('NgApimockService', () => {
    let browserSetCookiesFn: jest.Mock;
    let browserUrlFn: jest.Mock;
    let uuidV4Fn: jest.Mock;

    beforeEach(() => {
        browserSetCookiesFn = jest.fn();
        browserUrlFn = jest.fn();
        uuidV4Fn = uuid.v4 as jest.Mock;

        (global as any)['browser'] = {
            config: {
                baseUrl: 'http://localhost:9001'
            },
            url: browserUrlFn,
            setCookies: browserSetCookiesFn
        };
    });

    describe('constructor', () => {
        it('it uses the provided options', () => {
            const service = new NgApimockService({
                baseUrl: 'http://localhost:9000',
                globalName: 'client'
            });

            expect(service.globalName).toBe('client');
            expect(service.baseUrl).toBe('http://localhost:9000');
        });

        it('it uses the defaults', () => {
            const service = new NgApimockService({});

            expect(service.globalName).toBe('ngApimock');
            expect(service.baseUrl).toBe('http://localhost:9001');
        });
    });

    describe('before', () => {
        beforeEach(async () => {
            uuidV4Fn.mockReturnValue('generated-uuid');

            const service = new NgApimockService({});
            await service.before({});
        });

        it('it makes the plugin globally available', async () => {
            expect((global as any).ngApimock).toBeDefined();
        });

        it('initializes ng-apimock', () => {
            expect(browserUrlFn).toHaveBeenCalledWith('http://localhost:9001/ngapimock/init');
            expect(browserSetCookiesFn).toHaveBeenCalledWith({ name: 'apimockid', value: 'generated-uuid' });
        });
    });
});
