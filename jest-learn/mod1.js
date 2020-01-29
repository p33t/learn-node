'use strict';

function hello(name) {
    return `Hello ${name}`;
}

async function helloAsync(name) {
    return hello(name);
}

const CONST_VALUE = 'KNOWN';

module.exports = {
    hello,
    helloAsync,
    CONST_VALUE,
};
