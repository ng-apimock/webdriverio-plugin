import WebdriverIOClient from './webdriverio';

module.exports = (async () => {
    const client = new WebdriverIOClient();
    return await client.setNgApimockCookie();
})();