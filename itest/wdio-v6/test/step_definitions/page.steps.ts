import * as path from 'path';

import {
    Before, Given, Then, When
} from 'cucumber';
import * as fs from 'fs-extra';
import * as WebdriverIOAsync from 'webdriverio';

import { PagePO } from '../pos/page.po';

declare const browser: WebdriverIOAsync.BrowserObject;

const mocksDirectory = path.join(require.resolve('@ng-apimock/test-application'), '..', 'mocks');
let responses: any;

const waitForDone = async (): Promise<any> => {
    await browser.waitUntil(async () => (await PagePO.getDone()) === 'true', {
        timeout: 5000,
        timeoutMsg: 'expected status to be shown'
    });
};

Before(async () => {
    // perform some shared setup
    responses = {
        getItems: fs.readJsonSync(path.join(mocksDirectory, 'get-items.mock.json')).responses,
        postItem: fs.readJsonSync(path.join(mocksDirectory, 'post-item.mock.json')).responses
    };

    responses.getItems['passThrough'] = { status: 200, data: ['passThrough'] };
    responses.postItem['passThrough'] = { status: 200, data: ['passThrough'] };
});

Given(/^I open the test page$/, async () => {
    await PagePO.open();
});

When(/^I download the binary file$/, async () => {
    (await PagePO.buttons.binary).click();
});
When(/^I enter (.*) and post the item$/, async (data: string) => {
    await PagePO.input(data);
});
When(/^I get the items$/, async () => {
    await (await PagePO.buttons.get).click();
    await browser.pause(500);
});
When(/^I get the items as jsonp$/, async () => {
    await (await PagePO.buttons.getAsJsonp).click();
    await browser.pause(500);
});

Then(/^the items are fetched$/, async () => {
    expect(await PagePO.getDone()).toEqual('true');
});
Then(/^the items are not yet fetched$/, async () => {
    expect(await PagePO.getDone()).toEqual('false');
});
Then(/^the response is interpolated with variable (.*)$/, async (variable: string) => {
    await waitForDone();
    expect(await PagePO.getData()).toContain(variable);
});
Then(/^the (.*) response is returned for get items$/, async (scenario: string) => {
    await waitForDone();
    if (responses.getItems[scenario].data !== undefined) {
        const data = await PagePO.getData();
        expect(JSON.parse(data)).toEqual(responses.getItems[scenario].data);
    }
    const status = await PagePO.getStatus();
    expect(parseInt(status)).toEqual(responses.getItems[scenario].status);
});
Then(/^the (.*) response is returned for post item$/, async (scenario: string) => {
    await waitForDone();
    if (responses.postItem[scenario].data !== undefined) {
        const data = await PagePO.getData();
        expect(JSON.parse(data)).toEqual(responses.postItem[scenario].data);
    }
    const status = await PagePO.getStatus();
    expect(parseInt(status)).toEqual(responses.postItem[scenario].status);
});
Then(/^the (.*) response is downloaded$/, async (scenario: string) => {
    await waitForDone();
    await browser.waitUntil(async () => {
        const { params } = (browser as any).config;
        if (fs.existsSync(`${params.default_directory}/test.pdf`)) {
            const actual = fs.readFileSync(`${params.default_directory}/test.pdf`);
            const expected = fs.readFileSync(path.join(mocksDirectory, responses.getItems[scenario].file));
            return actual.equals(expected);
        }
        return params.environment === 'CI';
    }, { timeout: 5000, timeoutMsg: 'expected download to be completed' });
});
