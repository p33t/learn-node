'use strict';

const mod1 = require('./mod1');

function konnichiwa(name) {
    // Japanese greeting
    return mod1.hello(name + "san");
}

async function konnichiwaAsync(name) {
    return konnichiwa(name);
}

module.exports = {
    konnichiwa,
    konnichiwaAsync,
};
