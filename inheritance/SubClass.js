'use strict';
const BaseClass = require('./BaseClass');

class SubClass extends BaseClass {
    constructor(f1, f2) {
        super(f1);
        this.f2 = f2;
    }
}

module.exports = SubClass;