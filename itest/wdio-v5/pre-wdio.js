const path = require('path');

const fs = require('fs-extra');

const outputDirectory = path.join(process.cwd(), 'node_modules', 'wdio-ng-apimock-service');

fs.ensureDirSync(outputDirectory);
fs.writeJsonSync(path.join(outputDirectory, 'package.json'), {
    name: 'wdio-ng-apimock-service',
    main: '../../../../dist/index.js'
});
