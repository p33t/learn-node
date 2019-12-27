'use strict';
const {restoreCwd} = require('.');

describe('restoreCwd: finally restores cwd', () => {
    test('normal operation', () => {
        const hello = () => {
            process.chdir('..');
            return 'world';
        };

        const exp = process.cwd();
        expect(restoreCwd(hello)).toBe('world');
        expect(process.cwd()).toBe(exp);
    });

    test('error operation', () => {
        const badFn = () => {
            process.chdir('..');
            process.chdir('does-not-exist-i-hope');
        };
        const exp = process.cwd();
        expect(() => restoreCwd(badFn)).toThrowError("ENOENT: no such file or directory, chdir 'does-not-exist-i-hope'");
        expect(process.cwd()).toBe(exp);
    });
});
