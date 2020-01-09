'use strict';

const subject = require('.');

describe('promise basics', () => {
    test('manualPromise async', async () => {
        expect(await subject.manualPromise("hello")).toBe('hello');
    });

    test('manualPromise', () => {
        expect.assertions(1);
        return expect(subject.manualPromise("hello")).resolves.toBe('hello');
    });
});

// This didn't really work out.  Just be aware of 'queueMicroTask()'
describe('execution ordering', () => {
    test('promise', () => {
        const log = [];
        expect.assertions(1);
        return expect(Promise.all([
            Promise.resolve(log).then(subject.promiseLoggingPromise('one')),
            Promise.resolve(log).then(subject.promiseLoggingPromise('two')),
        ]).then(logs => Promise.resolve([...logs[0], ...logs[1]])))
            .resolves.toEqual(expect.arrayContaining(['one', 'two']));
    });

    // queueMicroTask() is too new (node 11+ ish)
    // test('microtask', () => {
    //     const log = [];
    //     expect.assertions(1);
    //     return expect(Promise.all([
    //         Promise.resolve(log).then(subject.microtaskLoggingPromise('one')),
    //         Promise.resolve(log).then(subject.microtaskLoggingPromise('two')),
    //     ]).then(logs => Promise.resolve([...logs[0], ...logs[1]])))
    //         .resolves.toEqual(expect.arrayContaining(['one', 'two']));
    // });
});

describe('asynchronous recursion', () => {
    const obj = {
        f1: {
            f11: "f11",
            f12: {
                f121: "f121",
            },
        },
        f2: "f2",
    };

    test('async 1 level', () =>{
        expect.assertions(1);
        return expect(subject.pathsAsync(obj.f1.f12))
            .resolves.toEqual(expect.arrayContaining([['f121']]));
    });

    test('async 2 level', () =>{
        expect.assertions(1);
        return expect(subject.pathsAsync(obj.f1))
            .resolves.toEqual(expect.arrayContaining([['f11'], ['f12', 'f121']]));
    });

    test('async 3 level', () =>{
        expect.assertions(1);
        return expect(subject.pathsAsync(obj))
            .resolves.toEqual(expect.arrayContaining([['f1', 'f11'], ['f1', 'f12', 'f121'], ['f2']]));
    });

    test('promise 3 level', () =>{
        expect.assertions(1);
        return expect(subject.pathsPromise(obj))
            .resolves.toEqual(expect.arrayContaining([['f1', 'f11'], ['f1', 'f12', 'f121'], ['f2']]));
    });

});
