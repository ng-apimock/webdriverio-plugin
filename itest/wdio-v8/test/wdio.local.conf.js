const { config } = require('./wdio.conf');

config.runner = 'local';
process.env.wdioEnvironment = 'LOCAL';
process.env.wdioDefaultDirectory = '/tmp';

config.hostname = 'localhost';
config.port = 4444;
config.path = '/wd/hub';
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
