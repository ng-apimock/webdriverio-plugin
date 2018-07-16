const config = require('./wdio.conf').config;

config.params = {
    environment: 'CI',
    default_directory: '/tmp'
};

config.services = ['sauce'];
console.log("PROCESS", process.env.HELLO)
config.user = process.env.SAUCE_USERNAME;
config.key = process.env.SAUCE_ACCESS_KEY;

config.capabilities = [{
    browserName: 'chrome',
    name: 'ngApimock - webdriverio',
    'tunnel-identifier': process.env.CIRCLE_BUILD_URL,
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
