#!/usr/bin/env node

/* tslint:disable:no-var-requires only-arrow-functions */
/* eslint-disable global-require, prefer-arrow-callback */

// Check node version before requiring additional packages
require('../dist/versions').checkNodeVersion();

// Collect module loading analytics if enabled
const modules = require('@salesforce/require-analytics')
    .start(process.env.SFDX_REQUIRE_ANALYTICS === 'true');

// Enable the v8 compile cache by default if not already overridden
if (process.env.SFDX_COMPILE_CACHE !== 'false') {
    require('v8-compile-cache');
}

// Enable lazy requires by default if not already overridden
if (process.env.SFDX_LAZY_LOAD_MODULES !== 'false') {
    process.env.SFDX_LAZY_LOAD_MODULES = 'true';
}

// Pre-process/prune flags before creating or running the actual CLI
require('../dist/flags').preprocessCliFlags(process);

const cli = require('../dist/cli');
const pjson = require('../package.json');

// OVERRIDES gets replaced with particular values for binary builds,
// but simply use defaults for npm and local invocations
const overrides = { version:'7.28.7-7bceba6f24', channel:'stable' };
const version = overrides.version || pjson.version;
const channel = overrides.channel || 'stable';

cli.create(version, channel)
    .run()
    .then(function(result) {
        modules.dump();
        require('@oclif/command/flush')(result);
    })
    .catch(function(err) {
        modules.dump();
        require('@oclif/errors/handle')(err);
    });
