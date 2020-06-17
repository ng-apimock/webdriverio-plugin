const { config } = require('./wdio.conf');

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

config.capabilities = [{
    browserName: 'chrome',
    'goog:chromeOptions': {
        args: ['--no-sandbox', '--test-type=browser'],
        prefs: {
            download: {
                prompt_for_download: false,
                directory_upgrade: true,
                default_directory: '/tmp'
            }
        }
    }
}];

exports.config = config;
