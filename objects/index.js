'use strict';

class MyDynamic {
    constructor() {
        this.createdAt = new Date();
    }
}

MyDynamic.prototype['f1'] = function () {
    return "Hello from f1";
};

MyDynamic.prototype['f2'] = function () {
    return "Created at " + this.createdAt;
};

const addFunction = (name, body) => {
    // NOTE: It must
    //   be 'function()' all the way down (not arrow functions: () => )
    //   use ".call(this)"
    MyDynamic.prototype[name] = function() {
        return body.call(this);
    };
};

addFunction('f3', () => 'Hello from f3');
addFunction('f4', function () {
    return 'Created at ' + this.createdAt;
});

module.exports.create = () => new MyDynamic();
