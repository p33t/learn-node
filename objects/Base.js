'use strict';

class Base {
    someMethod() {
        return 'Base';
    }

    baseMethod() {
        return this.someMethod();
    }
}

module.exports = Base;