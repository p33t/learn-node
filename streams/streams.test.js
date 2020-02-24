'use strict';
const path = require('path');
const fs = require('fs');
const readline = require('readline');
// const writeline = require('writeline');
// const {Writable} = require('streams');
const someFile = path.resolve(__dirname, 'some-file.txt');

describe('reading', () => {
    test('pre-conditions', () => {
        const content = fs.readFileSync(someFile, {encoding: 'utf-8'});
        expect(content).toBe(`this is a file\r
with some text\r
`);
    });

    function rl() {
        return readline.createInterface({
            input: fs.createReadStream(someFile),
            // NOTE: Don't need to close because stream auto-closes at end
            terminal: false,
            crlfDelay: Infinity, // handles CRLF as a single line break
        });
    }

    async function readAll(asyncIterable) {
        const lines = [];
        for await (const line of asyncIterable) {
            lines.push(line);
        }
        return lines;
    }


    test('async stream read', () => {
        expect.assertions(1);
        return expect(readAll(rl()))
            .resolves.toEqual(['this is a file', 'with some text']);

    });

    test('async generator transform', () => {
        async function* boxed() {
            for await (let line of rl()) {
                yield `[${line}]`
            }
        }
        expect.assertions(1);
        return expect(readAll(boxed()))
            .resolves.toEqual(['[this is a file]', '[with some text]']);

    });
});

describe('writing', () =>{
    test('basics', async () => {
        const file = path.resolve(__dirname, 'output.txt');
        if (fs.existsSync(file)) fs.unlinkSync(file);
        const out = fs.createWriteStream(file, {encoding: 'utf-8'});
        out.write('line 1\n');
        out.write('line 2\n');
        out.write('line 3\n');
        const outEnded = new Promise(function(resolve) {
            out.end(() => {
                resolve();
            });
        });
        await outEnded;
        const actual = fs.readFileSync(file, {encoding: 'utf-8'});
        expect(actual).toBe('line 1\nline 2\nline 3\n');
        fs.unlinkSync(file);
    });
});
