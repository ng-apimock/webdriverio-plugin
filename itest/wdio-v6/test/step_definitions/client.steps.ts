import { Client } from '@ng-apimock/base-client';
import { After, Given, When } from 'cucumber';
import * as WebdriverIOAsync from 'webdriverio';

const path = require('path');

const fs = require('fs-extra');
const expect = require('jest-matchers');

declare const browser: WebdriverIOAsync.BrowserObject;
declare const client: Client;

const mocksDirectory = path.join(require.resolve('@ng-apimock/test-application'), '..', 'mocks');

Given(/^the following mocks state:$/, async (dataTable: { rows: Function }) => {
    const mocks: any = await client.getMocks();
    dataTable.rows()
        .forEach((row: any) => expect(mocks.state[row[0]].scenario).toEqual(row[1]));
});
Given(/^the following presets are present:$/, async (dataTable: { rows: Function }) => {
    const presets: any = await client.getPresets();
    dataTable.rows()
        .forEach((row: any) => {
            const match = presets.presets.find((p: any) => p.name === row[0]);
            expect(match !== undefined).toBeTruthy();
            expect(Object.keys(match.mocks).length).toEqual(Number(row[1]));
            expect(Object.keys(match.variables).length).toEqual(Number(row[2]));
        });
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

When(/^I create a preset (.*) with mocks and variables/, async (name: string) => {
    await client.createPreset(name, true, true);
});

When(/^I create a preset (.*) with mocks and without variables/, async (name: string) => {
    await client.createPreset(name, true, false);
});

When(/^I create a preset (.*) without mocks and with variables/, async (name: string) => {
    await client.createPreset(name, false, true);
});

After(async () => {
    await client.resetMocksToDefault();

    [
        'unhappy.preset.json',
        'unhappy_without_mocks_with_variables.preset.json',
        'unhappy_with_mocks_without_variables.preset.json'
    ]
        .map((preset: any) => path.join(mocksDirectory, preset))
        .forEach((preset: any) => {
            if (fs.existsSync(preset)) {
                fs.removeSync(preset);
            }
        });
});
