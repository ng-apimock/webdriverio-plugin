const { config } = require('./wdio.conf');

config.params = {
    environment: 'LOCAL',
    default_directory: '/tmp'
};

config.seleniumAddress = 'http://localhost:4444/wd/hub';
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
