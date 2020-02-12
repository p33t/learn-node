'use strict';

describe('Perform N async ops in parallel', () => {
    async function* descending(from) {
        for (let i = from; i > 0; i--) {
            yield i;
        }
    }

    test('generator working', async () => {
        const generator = descending(2);
        expect(await generator.next()).toEqual({done: false, value: 2});
        expect(await generator.next()).toEqual({done: false, value: 1});
        expect(await generator.next()).toEqual({done: true});
    });

    test('parallel delays', async () => {
        // Workers will alway resolve with their array index
        const workers = [
            Promise.resolve(0),
            Promise.resolve(1),
            Promise.resolve(2),
        ];
        const startAt = Date.now();
        const results = new Array(6);
        for await (const i of descending(6)) {
            const ix = await Promise.race(workers);
            workers[ix] = new Promise(resolve => {
                setTimeout(() => {
                    results[i - 1] = Date.now() - startAt;
                    resolve(ix);
                }, 2000);
            });
        }
        await Promise.all(workers);
        console.log(results);
    }, 4100); // max two serial rounds of waiting
});
