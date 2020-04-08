'use strict';

// Runs only 1 time at beginning
beforeAll(() => {
    console.log('Before all - outer');
});
// runs before each 'test' (before the local 'beforeEach')
beforeEach(() => {
    console.log('    Before each - outer');
});
// runs after each 'test' (after the local 'afterEach')
afterEach(() => {
    console.log('    After each - outer');
});
// runs only 1 time at end
afterAll(() => {
    console.log('After all - outer');
});

describe('Describe 1', () => {
    beforeAll(() => {
        console.log('  Before all - d1');
    });
    beforeEach(() => {
        console.log('      Before each - d1');
    });
    afterAll(() => {
        console.log('  After all - d1');
    });
    afterEach(() => {
        console.log('      After each - d1');
    });

    test('t11', () => {
       console.log('        Test 11')
    });

    test('t12', () => {
       console.log('        Test 12')
    });
});

describe('Describe 2', () => {
    beforeAll(() => {
        console.log('  Before all - d2');
    });
    beforeEach(() => {
        console.log('      Before each - d2');
    });
    afterAll(() => {
        console.log('  After all - d2');
    });
    afterEach(() => {
        console.log('      After each - d2');
    });

    test('t11', () => {
        console.log('        Test 21')
    });

    test('t12', () => {
        console.log('        Test 22')
    });
});