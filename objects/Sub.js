'use strict';

const Base = require('./Base');

class Sub extends Base {
    someMethod() {
        return 'Sub';
    }
}

module.exports = Sub;