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

// See class-deserialize for turning a vanilla object into a class instance.
// class ClassWithMethods {
//     constructor(f1) {
//         this.f1 = f1;
//         this.reverseF1();
//     }
//
//     reverseF1() {
//         this.f1 = [...this.f1].reverse().join('');
//     }
// }
//
// describe('constructor', () => {
//     test('can invoke constructor from variable', () => {
//         const ctor = SubClass.constructor;
//         const sub = ctor('a', 'b');
//         //NOPE: expect(sub.f2).toBe('b');
//     });
// });
