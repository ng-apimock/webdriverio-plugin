[![npm](https://img.shields.io/npm/v/wdio-ng-apimock-service?color=brightgreen)](https://www.npmjs.com/package/wdio-ng-apimock-service) [![Build Status](https://github.com/ng-apimock/webdriverio-plugin/workflows/CI/badge.svg)](https://github.com/ng-apimock/webdriverio-plugin/actions?workflow=CI) 

This plugin connects to [@ng-apimock/core](https://github.com/ng-apimock/core) middelware and makes the all its features available in the tests.

## Requirements

see Ng-apimock [requirements](/docs/#requirements)

## Installing using npm / yarn
```bash
npm install wdio-ng-apimock-service --save-dev
```
or 

```bash
yarn add wdio-ng-apimock-service --dev
```

## Usage
Once the plugin has been installed, you can add it as a plugin to your `protractor.conf.js`

```js
exports.config = {
    services: [['ng-apimock']]
};
```

### Plugin configuration
You can override the global name in the configuration. The plugin will now be available on a global scope under that name.

```js
exports.config = {
    services: [['ng-apimock',  {
        globalName: 'client' // optional option (defaults to ngApimock)  
    }]]
};
```
   
## Using in tests
Import the base client which contains the interface

```typescript
import { Client } from '@ng-apimock/base-client';

declare const client: Client; // the name of the constant should match the global name: 
``` 

Now you can use it.

```typescript
describe('Some test', () => {
    it('does something', async () => 
        await client.selectScenario('my-mock-name', 'some-scenario'));
});
``` 

## API 
See [API](/docs/api/select-scenario)
