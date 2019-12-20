#!/usr/bin/env node
// ^ Required for installation to Windows/MacOS too
'use strict';

const minimist = require('minimist');

// example CLI config from https://devhints.io/minimist
// appears to be many options for arg parsing.  Lightweight generally don't help with 'help' or 'version' automatically.
// minimist options config isn't to my liking.  They should be arranged by option name first, which only need be written once.

// Simple
// const args = minimist(process.argv.slice(2), {
//     string: 'lang',           // --lang xml
//     boolean: ['version'],     // --version
//     alias: { v: 'version' }
// });

// complex
const args = minimist(process.argv.slice(2), {
    string: [ 'lang' ],
    boolean: [ 'pager' ],
    alias: { h: 'help', v: 'version' },
    default: { lang: 'en' },
    '--': true,
    //stopEarly: true, /* populate _ with first non-option */
    //unknown: function () { ... } /* invoked on unknown param */
});

console.log(args);

