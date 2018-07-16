import WebdriverIOClient from './webdriverio';

module.exports = (async () => {
    const client = new WebdriverIOClient();
    return client.setNgApimockCookie();
})();