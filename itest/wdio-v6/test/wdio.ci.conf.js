const { config } = require('./wdio.conf');

const buildIdentifier = process.env.GITHUB_RUN_ID || `Local build-${new Date().getTime()}`;
const defaultBrowserSauceOptions = {
    build: buildIdentifier,
    screenResolution: '1600x1200',
    seleniumVersion: '3.141.59',
};
config.params = {
    environment: 'CI',
    default_directory: '/tmp'
};
config.maxInstances = 5;

config.user = process.env.SAUCE_USERNAME;
config.key = process.env.SAUCE_ACCESS_KEY;

config.services.push(['sauce', {
    sauceConnect: true,
    sauceConnectOpts: {
    }
}]);

const chromeOptions = {
    'goog:chromeOptions': {
        w3c: true,
        args: ['--no-sandbox', '--test-type=browser'],
        prefs: {
            download: {
                prompt_for_download: false,
                directory_upgrade: true,
                default_directory: '/tmp'
            }
        }
    },
};

config.capabilities = [
    {
        browserName: 'googlechrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        'sauce:options': {
            logName: 'chrome-latest',
            ...defaultBrowserSauceOptions,
        },
        ...chromeOptions,
    }];

exports.config = config;
