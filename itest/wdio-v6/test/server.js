const path = require('path');

const apimock = require('@ng-apimock/core');
const testApplication = require('@ng-apimock/test-application');
const express = require('express');

const testApplicationMocks = path.join(require.resolve('@ng-apimock/test-application'), '..',
    'mocks');
const app = express();

app.set('port', 9999);

// Process the test application mocks
apimock.processor.process({ src: testApplicationMocks });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Use the ng-apimock middelware
app.use(apimock.middleware);

// Serve the test application
app.use('/', express.static(testApplication));

// Passthrough api handling
app.use('/items', (request, response, next) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    if (request.method === 'GET') {
        response.end('["passThrough"]');
    } else if (request.method === 'POST') {
        response.end('["passThrough"]');
    } else {
        next();
    }
});

app.listen(app.get('port'), () => {
    console.log('@ng-apimock/core running on port', app.get('port'));
    console.log('@ng-apimock/test-application is available under /');
});
