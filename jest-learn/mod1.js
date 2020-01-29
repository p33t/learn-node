'use strict';

function hello(name) {
    return `Hello ${name}`;
}

async function helloAsync(name) {
    return hello(name);
}

module.exports = {
    hello,
    helloAsync,
};
