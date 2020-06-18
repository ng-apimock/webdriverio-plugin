const { config } = require('./wdio.conf');

const buildIdentifier = process.env.GITHUB_RUN_ID || `Local build-${new Date().getTime()}`;
const defaultBrowserSauceOptions = {
    build: buildIdentifier,
    screenResolution: '1600x1200',
    seleniumVersion: '3.141.59',
};
config.maxInstances = 5;
config.params = {
    environment: 'CI',
    default_directory: '/tmp'
};

config.user = process.env.SAUCE_USERNAME;
config.key = process.env.SAUCE_ACCESS_KEY;
config.sauceConnect = true;
config.sauceConnectOpts = {
    verbose: true,
    connectRetries: 3,
    connectRetryTimeout: 10000
};

config.services.push('sauce');

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
