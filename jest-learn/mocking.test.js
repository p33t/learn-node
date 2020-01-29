'use strict';
const mod1 = require('./mod1');
const mod2 = require('./mod2');

jest.mock('./mod1');

describe('Shallow mock', () => {
    test('return value', () => {
        mod1.hello.mockReturnValueOnce('mock response')
            .mockName('shallow mock return test');
        expect(mod1.hello('bruce')).toBe('mock response');
        expect(mod1.hello).toHaveBeenCalledWith('bruce');
    });

    // test('resolve value', () => {
    //     mod1.helloAsync.mockResolvedValue('mock response')
    //         .mockName('shallow mock resolve test');
    //     expect(() => mod1.helloAsync('bruce')).toResolveTo
    //     expect(mod1.hello).toHaveBeenCalledWith('bruce');
    // });
});

describe('Deep mock', () => {
    test('return value', () => {
        mod1.hello.mockReturnValueOnce('mock response')
            .mockName('deep mock test');
        expect(mod2.konnichiwa('bruce')).toBe('mock response');
        expect(mod1.hello).toHaveBeenCalledWith('brucesan');
    });
});
