const path = require('path');

let server;

const config = {
    default_directory: '/tmp',
    specs: [
        path.join(__dirname, 'features', '**', '*.feature'),
    ],
    sync: false,
    baseUrl: 'http://127.0.0.1:9999/',
    framework: 'cucumber',
    logLevel: 'error',
    waitforTimeout: 15000,
    cucumberOpts: {
        timeout: 20000,
        require: [
            path.join(__dirname, 'step_definitions', '*.steps.ts'),
            path.join(__dirname, 'cucumber.helper.ts')
        ]
    },
    onPrepare: () => {
        const childProcess = require('child_process');
        server = childProcess.spawn('node',
            [path.join(__dirname, 'server.js')],
            {
                cwd: __dirname,
                stdio: 'inherit'
            });
        process.on('exit', () => server.kill());
    },
    onComplete: () => {
        server.kill();
    },
    services: [['ng-apimock', { globalName: 'client' }]],

    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: 'tsconfig.json'
        },
        tsConfigPathsOpts: {
            baseUrl: './'
        }
    },
};

exports.config = config;
