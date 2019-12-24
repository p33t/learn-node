const sum = require('./sum');

describe("My first description", () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});

describe("example tests", () => {
    test('partial match', () => {
        expect({one: 1, two: 2, three: 3})
            .toEqual(expect.objectContaining({
                one: 1,
                three: 3,
            }));
    });

    test('throw error', () => {
        expect(() => sum("this should", "throw"))
            .toThrowError(/ not allowed$/);
    });

    // NOTE: String args still need ${'xxx'}.
    test.each`
    a | b | exp
    ${1} | ${1} | ${2}
    `("$a + $b = $exp", ({a, b, exp}) => {
        expect(sum(a, b)).toBe(exp);
    });
});
