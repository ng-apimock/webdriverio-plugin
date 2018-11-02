# webdriverio-plugin
webdriver plugin for @ng-apimock/core

### Usage
This plugin connects to ng-apimock and makes the plugin functions available within the tests.

Enable this plugin in your config file:

```js
exports.config = {
    plugins: {
       '@ng-apimock/protractor-plugin': {
           globalName: 'ngApimockWebdriverioPlugin' // optional option (defaults to ngApimock)  
       } 
    }
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

##### setVariable(key: string, value: string): Promise<any>;
Adds or updates the global variable.
    
##### setVariables(variables: {[key: string]: string;}): Promise<any>;
Adds or updates the global variables  ie. {'some':'value', 'another': 'value'}.
    
##### deleteVariable(key: string): Promise<any>;
Deletes the global variable.

##### resetMocksToDefault(): Promise<any>;
Resets all the mocks to the default state.

##### setMocksToPassThrough(): Promise<any>;
Sets all the mocks to pass through.

##### setPreset(name: string): Promise<any>;
Sets the mocks and variables in the selected state.
