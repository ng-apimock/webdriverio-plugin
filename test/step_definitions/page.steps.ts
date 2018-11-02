import {Before, Given, Then, When} from 'cucumber';
import {expect} from 'chai';

import * as fs from 'fs-extra';
import * as path from 'path';

import {PagePO} from '../pos/page.po';

const mocksDirectory = path.join(require.resolve('@ng-apimock/test-application'), '..', '..', 'mocks');
let responses: any;

Before(async () => {
    // perform some shared setup
    responses = {
        getItems: fs.readJsonSync(path.join(mocksDirectory, 'get-items.mock.json')).responses,
        postItem: fs.readJsonSync(path.join(mocksDirectory, 'post-item.mock.json')).responses
    };

    responses.getItems['passThrough'] = { status: 200, data: ['passThrough'] };
    responses.postItem['passThrough'] = { status: 200, data: ['passThrough'] };
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
    expect(await PagePO.done.getText()).to.equal('true');
}

async function checkItemsAreNotYetFetched(): Promise<any> {
    expect(await PagePO.done.getText()).to.equal('false');
}

async function checkResponseIsDownloaded(scenario: string): Promise<any> {
    await browser.waitUntil(async () => {
        if (fs.existsSync((browser.options as any).default_directory + '/test.pdf')) {
            const actual = fs.readFileSync((browser.options as any).default_directory + '/test.pdf');
            const expected = fs.readFileSync(path.join(mocksDirectory, responses.getItems[scenario].file));
            return actual.equals(expected);
        } else {
            return (browser.options as any).params.environment === 'CI'
        }
    }, 5000, 'expected download to be completed');
}

async function checkResponseIsInterpolatedWithVariable(variable: string): Promise<any> {
    expect(await PagePO.data.getText()).to.contain(variable);
}

async function checkReturnedResponseForGetItems(scenario: string): Promise<any> {
    if (responses.getItems[scenario].data !== undefined) {
        const data = await PagePO.data.getText();
        expect(await JSON.parse(data)).to.deep.equal(responses.getItems[scenario].data);
    }
    const status = await PagePO.status.getText();
    expect(parseInt(status)).to.equal(responses.getItems[scenario].status);
}

async function checkReturnedResponseForPostItem(scenario: string): Promise<any> {
    if (responses.postItem[scenario].data !== undefined) {
        const data = await PagePO.data.getText();
        expect(JSON.parse(data)).to.deep.equal(responses.postItem[scenario].data)
    }
    const status = await PagePO.status.getText();
    expect(parseInt(status)).to.equal(responses.postItem[scenario].status);
}

async function downloadTheBinaryFile(): Promise<any> {
    await PagePO.buttons.binary.click();
}

async function enterAndPostItem(data: string): Promise<any> {
    await PagePO.input.clearElement();
    await PagePO.input.setValue(data);
    await PagePO.buttons.post.click();
}

async function getTheItems(): Promise<any> {
    await PagePO.buttons.get.click();
}

async function getTheItemsAsJsonp(): Promise<any> {
    await PagePO.buttons.getAsJsonp.click();
}

async function openTestPage(): Promise<any> {
    await PagePO.open();
}
