import { Client } from '@ng-apimock/base-client';
import { After, Given, When } from 'cucumber';
import * as WebdriverIOAsync from 'webdriverio';

const expect = require('jest-matchers');

declare const browser: WebdriverIOAsync.BrowserObject;
declare const client: Client;

Given(/^the following mocks state:$/, async (dataTable: { rows: Function }) => {
    const mocks: any = await client.getMocks();
    dataTable.rows()
        .forEach((row: any) => expect(mocks.state[row[0]].scenario).toEqual(row[1]));
});
Given(/^the following variables state:$/, async (dataTable: { rows: Function }) => {
    const variables = await client.getVariables();
    dataTable.rows()
        .forEach((row: any) => expect(variables.state[row[0]]).toEqual(row[1]));
});

When(/^I add variable (.*) with value (.*)/, async (key: string, value: string) => {
    await client.setVariable(key, value);
});
When(/^I delete variable (.*)/, async (key: string) => {
    await client.deleteVariable(key);
});
When(/^I reset the mocks to default$/, async () => {
    await client.resetMocksToDefault();
});
When(/^I select scenario (.*) for mock (.*)$/, async (scenario: string, name: string) => {
    await client.selectScenario(name, scenario);
});
When(/^I set delay to (\d+) for mock (.*)$/, async (delay: string, name: string) => {
    await client.delayResponse(name, parseInt(delay));
});
When(/^I set the mocks to passThroughs$/, async () => {
    await client.setMocksToPassThrough();
});
When(/^I update variable (.*) with value (.*)/, async (key: string, value: string) => {
    await client.setVariable(key, value);
});
When(/^I wait a (\d+) milliseconds$/, async (wait: number) => {
    await browser.pause(wait);
});
When(/^I select the preset (.*)/, async (name: string) => {
    await client.selectPreset(name);
});

After(async () => {
    await client.resetMocksToDefault();
});
