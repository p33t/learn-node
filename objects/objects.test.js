const {create} = require('.');
const Base = require('./Base');
const Sub = require('./Sub');

describe("My Dynamic", () => {
    const subject = create();

    test('f1() works', () => {
        expect(subject.f1()).toBe("Hello from f1");
    });
    test('f2() works', () => {
        expect(subject.f2()).toBe("Created at " + subject.createdAt);
    });
    test('f3() works', () => {
        expect(subject.f3()).toBe("Hello from f3");
    });
    test('f4() works', () => {
        expect(subject.f4()).toBe("Created at " + subject.createdAt);
    });
});

describe("Polymorphism", () => {
    test('someMethod()', () => {
        const objs = [new Base(), new Sub()];

        const results = objs.map(o => o.someMethod());
        expect(results).toEqual(['Base', 'Sub']);
    });
});
