const path = require('path');

const plugin = require.resolve(path.join(process.cwd(), 'dist', 'index.js'));

const config = {
    default_directory: '/tmp',
    specs: [
        path.join(__dirname, 'features', '**', '*.feature')
    ],
    sync: false,
    baseUrl: 'http://127.0.0.1:9999/',
    framework: 'cucumber',
    cucumberOpts: {
        compiler: ["ts:ts-node/register"],
        require: [
            path.join(__dirname, 'step_definitions', '*.steps.ts'),
            path.join(__dirname, 'cucumber.helper.ts')
        ]
    },
    onPrepare: () => {
        const child_process = require('child_process');
        const path = require('path');
        server = child_process.spawn('node',
            [path.join(__dirname, 'server.js')],
            {cwd: __dirname, stdio: 'inherit'});
        process.on('exit', () => server.kill());
    },
    before: async () => {
        const chai = require('chai');
        global.chai = chai;
        global.expect = chai.expect;
    },
    onComplete: () => {
        server.kill();
    },
    plugins: {}
};

config.plugins[plugin] = {
    globalName: 'client'
};

exports.config = config;
