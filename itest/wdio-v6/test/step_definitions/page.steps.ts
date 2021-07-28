import * as path from 'path';

import {
    Before, Given, Then, When
} from 'cucumber';
import * as fs from 'fs-extra';
import * as WebdriverIOAsync from 'webdriverio';

import { PagePO, Repository } from '../pos/page.po';

const expect = require('jest-matchers');

declare const browser: WebdriverIOAsync.BrowserObject;

const mocksDirectory = path.join(require.resolve('@ng-apimock/test-application'), '..', 'mocks');
let responses: any;

Before(async () => {
    // perform some shared setup
    responses = {
        getRepos: fs.readJsonSync(path.join(mocksDirectory, 'get-repos.mock.json')).responses,
        createRepo: fs.readJsonSync(path.join(mocksDirectory, 'create-repo.mock.json')).responses,
        readme: fs.readJsonSync(path.join(mocksDirectory, 'readme.mock.json')).responses
    };

    responses.getRepos['passThrough'] = { status: 200, data: ['passThrough'] };
    responses.createRepo['passThrough'] = { status: 200, data: ['passThrough'] };
    responses.readme['passThrough'] = { status: 200, data: ['passThrough'] };
});

Given(/^I open the page/, async () => {
    await PagePO.navigate();
});

Given(/^I refresh/, async () => {
    await browser.keys('Escape');
    await browser.pause(500);
    await PagePO.refresh();
});

Given(/^I try to create a repository/, async () => {
    await PagePO.navigate('/#/repos;action=new');
    await (await PagePO.repositoryName).setValue('some-awesome-plugin');
    await (await PagePO.repositoryDescription).setValue('Some awesome plugin');
    await (await PagePO.createRepository).click();
});

When(/^I download the readme for the repository (.*)$/, async (repository: string) => {
    await PagePO.downloadReadmeForRepository(repository);
});

Then(/^the following repositories are shown:$/, async (dataTable: { rows: Function }) => {
    PagePO.waitForRepositoriesPresent();

    const repositories = await PagePO.repositoryData;
    dataTable.rows()
        .forEach((row: any) => {
            expect(repositories
                .filter((repository: Repository) => repository.name === row[0]).length === 1)
                .toBeTruthy();
            if (row[1]) {
                expect(repositories
                    .filter((repository: Repository) => repository.description === row[1]).length === 1)
                    .toBeTruthy();
            }
        });
});

Then(/^the repository is added$/, async () => {
    const addedRepositoryName = 'some-awesome-plugin';
    const repositories = await PagePO.repositoryData;
    expect(repositories
        .filter((repository: Repository) => repository.name === addedRepositoryName).length === 1)
        .toBeTruthy();
});

When(/^An error with message (.*) has occured$/, async (message: string) => {
    await (await PagePO.error()).waitForExist({ timeout: 5000 });
    expect(await (await PagePO.error()).getText()).toEqual(message);
});

Then(/^the repositories are fetched$/, async () => {
    expect(await (await PagePO.repositories).isDisplayed()).toBeTruthy();
});

Then(/^the repositories are not yet fetched$/, async () => {
    expect(await (await PagePO.repositories).isDisplayed()).toBeFalsy();
});

Then(/^the README is downloaded$/, async () => {
    await browser.waitUntil(async () => {
        const { params } = (browser as any).config;
        if (fs.existsSync(`${params.default_directory}/README.md`)) {
            const actual = fs.readFileSync(`${params.default_directory}/README.md`);
            const expected = fs.readFileSync(path.join(mocksDirectory, responses.readme.ok.file));
            return actual.equals(expected);
        }
        return params.environment === 'CI';
    }, { timeout: 5000, timeoutMsg: 'expected download to be completed' });
});
