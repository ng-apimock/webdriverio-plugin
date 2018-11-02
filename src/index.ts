import WebdriverIOClient from './webdriverio';

let plugin: WebdriverIOClient;

/**
 * Initialize.
 * @param {object} webdriverInstance The webdriver instance.
 * @param {{globalName?: string}} options The options.
 */
async function init(webdriverInstance: any, options: any) {
    const globalName =  (options && options.globalName)
        ? options.globalName
        : 'ngApimock';

    plugin = new WebdriverIOClient();
    (global as any)[globalName] = plugin;

    webdriverInstance.on('init', async () => {
        await plugin.setNgApimockCookie();
    });
}

exports.init = init;