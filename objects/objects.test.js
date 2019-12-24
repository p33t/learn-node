const {create} = require('.');

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