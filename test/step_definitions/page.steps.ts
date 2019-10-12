import * as fs from 'fs-extra';
import * as path from 'path';
import * as WebdriverIOAsync from 'webdriverio';

import {expect} from 'chai';
import {Before, Given, Then, When} from 'cucumber';
import {PagePO} from '../pos/page.po';

declare var browser: WebdriverIOAsync.BrowserObject;

const mocksDirectory = path.join(require.resolve('@ng-apimock/test-application'), '..', 'mocks');
let responses: any;

Before(async () => {
    // perform some shared setup
    responses = {
        getItems: fs.readJsonSync(path.join(mocksDirectory, 'get-items.mock.json')).responses,
        postItem: fs.readJsonSync(path.join(mocksDirectory, 'post-item.mock.json')).responses
    };

    responses.getItems['passThrough'] = {status: 200, data: ['passThrough']};
    responses.postItem['passThrough'] = {status: 200, data: ['passThrough']};
});

Given(/^I open the test page$/, openTestPage);

When(/^I download the binary file$/, downloadTheBinaryFile);
When(/^I enter (.*) and post the item$/, enterAndPostItem);
When(/^I get the items$/, getTheItems);
When(/^I get the items as jsonp$/, getTheItemsAsJsonp);

Then(/^the items are fetched$/, checkItemsAreFetched);
Then(/^the items are not yet fetched$/, checkItemsAreNotYetFetched);
Then(/^the response is interpolated with variable (.*)$/, checkResponseIsInterpolatedWithVariable);
Then(/^the (.*) response is returned for get items$/, checkReturnedResponseForGetItems);
Then(/^the (.*) response is returned for post item$/, checkReturnedResponseForPostItem);
Then(/^the (.*) response is downloaded$/, checkResponseIsDownloaded);

async function checkItemsAreFetched(): Promise<any> {
    expect(await PagePO.getDone()).to.equal('true');
}

async function checkItemsAreNotYetFetched(): Promise<any> {
    expect(await PagePO.getDone()).to.equal('false');
}

async function checkResponseIsDownloaded(scenario: string): Promise<any> {
    await waitForDone();
    await browser.waitUntil(async () => {
        const params = (browser as any).config.params;
        if (fs.existsSync(params.default_directory + '/test.pdf')) {
            const actual = fs.readFileSync(params.default_directory + '/test.pdf');
            const expected = fs.readFileSync(path.join(mocksDirectory, responses.getItems[scenario].file));
            return actual.equals(expected);
        } else {
            return params.environment === 'CI'
        }
    }, 5000, 'expected download to be completed');
}

async function checkResponseIsInterpolatedWithVariable(variable: string): Promise<any> {
    await waitForDone();
    expect(await PagePO.getData()).to.contain(variable);
}

async function checkReturnedResponseForGetItems(scenario: string): Promise<any> {
    await waitForDone();
    if (responses.getItems[scenario].data !== undefined) {
        const data = await PagePO.getData();
        expect(JSON.parse(data)).to.deep.equal(responses.getItems[scenario].data);
    }
    const status = await PagePO.getStatus();
    expect(parseInt(status)).to.equal(responses.getItems[scenario].status);
}

async function checkReturnedResponseForPostItem(scenario: string): Promise<any> {
    await waitForDone();
    if (responses.postItem[scenario].data !== undefined) {
        const data = await PagePO.getData();
        expect(JSON.parse(data)).to.deep.equal(responses.postItem[scenario].data)
    }
    const status = await PagePO.getStatus();
    expect(parseInt(status)).to.equal(responses.postItem[scenario].status);
}

async function downloadTheBinaryFile(): Promise<any> {
    (await PagePO.buttons.binary).click();
}

async function enterAndPostItem(data: string): Promise<any> {
    await PagePO.input(data);
}

async function getTheItems(): Promise<any> {
    await (await PagePO.buttons.get).click();
    await browser.pause(500);
}

async function getTheItemsAsJsonp(): Promise<any> {
    await (await PagePO.buttons.getAsJsonp).click();
    await browser.pause(500);
}

async function openTestPage(): Promise<any> {
    await PagePO.open();
}

async function waitForDone(): Promise<any> {
    await browser.waitUntil(async () => {
        return (await PagePO.getDone()) === 'true';
    }, 5000, 'expected status to be shown');
}
