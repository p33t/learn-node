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

    test('resolve value', () => {
        mod1.helloAsync.mockResolvedValue('mock response')
            .mockName('shallow mock resolve test');
        expect.assertions(2);
        return mod1.helloAsync('bruce').then(resp => {
            expect(resp).toBe('mock response');
            expect(mod1.hello).toHaveBeenCalledWith('bruce');
        });
    });

    test('constant value', () => {
        mod1.CONST_VALUE = 'random';
        expect(mod1.CONST_VALUE).toBe('random');
    });
});

describe('Deep mock', () => {
    test('return value', () => {
        mod1.hello.mockReturnValueOnce('mock response')
            .mockName('deep mock return test');
        expect(mod2.konnichiwa('bruce')).toBe('mock response');
        expect(mod1.hello).toHaveBeenCalledWith('brucesan');
    });

    test('resolve value', () => {
        mod1.helloAsync.mockResolvedValue('mock response')
            .mockName('deep mock resolve test');
        expect.assertions(2);
        return mod2.konnichiwaAsync('bruce').then(resp => {
            expect(resp).toBe('mock response');
            expect(mod1.hello).toHaveBeenCalledWith('brucesan');
        });
    });

    test('constant value', () => {
        mod1.CONST_VALUE = 'randomX';
        expect(mod2.constValue()).toBe('randomX');
    });
});
