const config = require('./wdio.conf').config;

config.params = {
    environment: 'CI',
    default_directory: '/tmp'
};

config.services = ['sauce'];
config.user = process.env.SAUCE_USERNAME;
config.key = process.env.SAUCE_ACCESS_KEY;
config.sauceConnect = true;
config.sauceConnectOpts = {
    verbose: true,
    tunnelIdentifier: process.env.CIRCLE_BUILD_NUM,
    connectRetries: 3,
    connectRetryTimeout: 10000
};

config.capabilities = [{
    browserName: 'chrome',
    name: 'ngApimock - webdriverio',
    build: process.env.CIRCLE_BUILD_NUM,
    chromeOptions: {
        args: ['--no-sandbox', '--test-type=browser'],
        prefs: {
            'download': {
                'prompt_for_download': false,
                'directory_upgrade': true,
                'default_directory': '/tmp'
            }
        }
    }
}];

exports.config = config;
