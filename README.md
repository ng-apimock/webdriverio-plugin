# webdriverio-plugin [![CircleCI](https://circleci.com/gh/ng-apimock/webdriverio-plugin.svg?style=svg)](https://circleci.com/gh/ng-apimock/webdriverio-plugin)  [![dependency Status](https://img.shields.io/david/ng-apimock/webdriverio-plugin.svg)](https://david-dm.org/ng-apimock/webdriverio-plugin) [![devDependency Status](https://img.shields.io/david/dev/ng-apimock/webdriverio-plugin.svg)](https://david-dm.org/ng-apimock/webdriverio-plugin#info=devDependencies)
webdriver plugin for @ng-apimock/core

### Usage
This plugin connects to ng-apimock and makes the plugin functions available within the tests.

Enable this plugin in your config file:

```js
exports.config = {
    services: [['wdio-ng-apimock-service'],  {
           globalName: 'ngApimockWebdriverioPlugin' // optional option (defaults to ngApimock)  
       }
    ]
};
```

After registering the plugin, you can use it in your tests by calling it like this:

```js
describe('Some test', () => {
    it('does something', async () => 
        await ngApimock.selectScenario('my-mock-name', 'some-scenario'));
});
```

### Available plugin functions
The following functions are available. Each plugin function returns a promise.

##### selectScenario(name: string, scenario: string): Promise<any>;
Selects the given scenario (when calling this function without a scenario or with 'passThrough' as scenario name, the call will be passed through to the actual backend).

##### delayResponse(mockName: string, delay: number): Promise<any>;
Sets the delay time in milliseconds for the mock. This makes sure the response is delayed. The delay set here overrides the delay defined in the response mock.

##### echoRequest(name: string, echo: boolean): Promise<any>; 
Sets the indicator which enables / disables the request logging.

##### setVariable(key: string, value: any): Promise<any>;
Adds or updates the global variable.
    
##### setVariables(variables: {[key: string]: any;}): Promise<any>;
Adds or updates the global variables  ie. {'some':'value', 'another': 'value'}.
    
##### deleteVariable(key: string): Promise<any>;
Deletes the global variable.

##### resetMocksToDefault(): Promise<any>;
Resets all the mocks to the default state.

##### setMocksToPassThrough(): Promise<any>;
Sets all the mocks to pass through.

##### setPreset(name: string): Promise<any>;
Sets the mocks and variables in the selected state.
