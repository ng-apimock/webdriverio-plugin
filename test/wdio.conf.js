const path = require('path');

exports.config = {
    default_directory: '/tmp',
    specs: [
        path.join(__dirname, 'features', '*.feature')
    ],
    sync: false,
    baseUrl: 'http://localhost:9900/',
    framework: 'cucumber',
    cucumberOpts: {
        require: [path.join(__dirname, 'step_definitions/*.steps.js')]
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
        global.ngApimock = await require(path.join(process.cwd(), 'dist', 'index.js'));
    },
    onComplete: () => {
        server.kill();
    }
};
