'use strict';
const BaseClass = require('./BaseClass');
const SubClass = require('./SubClass');

describe('Confirm basic', () => {
    test('Fields as expected', () => {
        expect(new BaseClass('base').f1).toBe('base');
        let sub = new SubClass('base', 'sub');
        expect(sub.f1).toBe('base');
        expect(sub.f2).toBe('sub');
    });
});