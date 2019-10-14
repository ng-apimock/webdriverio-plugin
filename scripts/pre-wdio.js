const fs = require('fs-extra');
const path = require('path');

const nodeModulesServiceDirectory = 'node_modules/wdio-ng-apimock-service';

fs.ensureDirSync(nodeModulesServiceDirectory);
fs.writeJsonSync(path.join(nodeModulesServiceDirectory, 'package.json'), {
    name: 'wdio-ng-apimock-service',
    main: '../../dist/index.js'
});
