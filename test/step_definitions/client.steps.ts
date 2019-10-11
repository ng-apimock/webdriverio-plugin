import * as WebdriverIOAsync from 'webdriverio';

import {expect} from 'chai';
import {After, Given, When} from 'cucumber';
import {Client} from '@ng-apimock/base-client';

declare var browser: WebdriverIOAsync.BrowserObject;
declare const client: Client;

Given(/^the following mocks state:$/, checkMockState);
Given(/^the following variables state:$/, checkVariablesState);
When(/^I add variable (.*) with value (.*)/, addVariable);
When(/^I delete variable (.*)/, deleteVariable);
When(/^I reset the mocks to default$/, resetMocksToDefault);
When(/^I select scenario (.*) for mock (.*)$/, selectScenario);
When(/^I set delay to (\d+) for mock (.*)$/, delayResponse);
When(/^I set the mocks to passThroughs$/, setMocksToPassThrough);
When(/^I update variable (.*) with value (.*)/, updateVariable);
When(/^I wait a (\d+) milliseconds$/, waitSeconds);
When(/^I select the preset (.*)/, selectPreset);

After(async () => await client.resetMocksToDefault());

async function addVariable(key: string, value: string): Promise<void> {
    await client.setVariable(key, value);
}

async function checkMockState(dataTable: { rows: Function }): Promise<void> {
    const mocks: any = await client.getMocks();
    dataTable.rows()
        .forEach((row: any) => expect(mocks.state[row[0]].scenario).to.equal(row[1]));
}

async function checkVariablesState(dataTable: { rows: Function }): Promise<void> {
    const variables = await client.getVariables();
    dataTable.rows()
        .forEach((row: any) => expect(variables.state[row[0]]).to.equal(row[1]));
}

async function delayResponse(delay: string, name: string): Promise<void> {
    await client.delayResponse(name, parseInt(delay));
}

async function deleteVariable(key: string): Promise<void> {
    await client.deleteVariable(key);
}

async function resetMocksToDefault(): Promise<void> {
    await client.resetMocksToDefault();
}

async function selectScenario(scenario: string, name: string): Promise<void> {
    await client.selectScenario(name, scenario);
}

async function selectPreset(name: string): Promise<void> {
    await client.selectPreset(name);
}

async function setMocksToPassThrough(): Promise<void> {
    await client.setMocksToPassThrough();
}

async function updateVariable(key: string, value: string): Promise<void> {
    await client.setVariable(key, value);
}

async function waitSeconds(wait: number): Promise<void> {
    await browser.pause(wait);
}
