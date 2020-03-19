'use strict';
const {spawn} = require('child_process');
const path = require('path');

function createChildProc(loopCount = 3, exitCode = 0) {
    return spawn('node', [path.resolve(__dirname, 'app.js'), loopCount.toString(), exitCode.toString()]);
}

describe('async console invocation', () => {
    test('simple run', async () => {
        const result = new Promise(resolve => {
            const child = createChildProc(1);
            child.on('exit', code => {
                resolve(code);
            });
        });
        const code = await result;
        expect(code).toBe(0);
    });

    test('failed run', async () => {
        const result = new Promise(resolve => {
            const child = createChildProc(1, 99);
            child.on('exit', code => {
                resolve(code);
            });
        });
        const code = await result;
        expect(code).toBe(99);
    });

    test('stdout check', async () => {
        const output = [];
        const result = new Promise(resolve => {
            const child = createChildProc(1);
            child.on('exit', code => {
                resolve(code);
            });
            child.stdout.setEncoding('utf-8');
            child.stdout.on('data', data => {
                output.push(data);
            });
        });
        await result;
        expect(output).toEqual(['#1.', "finished"]);
    });
});
